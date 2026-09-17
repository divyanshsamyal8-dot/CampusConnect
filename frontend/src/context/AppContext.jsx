import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialPosts,
  initialComments,
  initialFriends,
  initialFriendRequests,
  initialDiscoveryPool,
  initialJoinedGroups,
  initialMyGroups,
  initialGroupChats,
  initialCommunityMembers,
  canteenMenu,
  sampleEvents,
  sampleAnnouncements,
} from '../data/demoData';
import {
  getRandomGradient,
  validateRollNumber,
  formatTime,
  formatDate,
  loadFromStorage,
  saveToStorage,
} from '../utils/helpers';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Current User State
  const [currentUser, setCurrentUser] = useState(() =>
    loadFromStorage('campusConnectUser', {
      name: 'Student',
      rollNumber: '',
      avatarColor: getRandomGradient(),
    })
  );

  useEffect(() => {
    saveToStorage('campusConnectUser', currentUser);
  }, [currentUser]);

  const updateUserProfile = (name, rollNumber) => {
    setCurrentUser((prev) => ({
      ...prev,
      name: name || prev.name || 'Student',
      rollNumber: rollNumber !== undefined ? rollNumber.toUpperCase() : prev.rollNumber,
    }));
  };

  // 2. Friends & Requests State
  const [friends, setFriends] = useState(() =>
    loadFromStorage('campusConnectFriends', initialFriends)
  );

  const [friendRequests, setFriendRequests] = useState(() =>
    loadFromStorage('campusConnectFriendRequests', initialFriendRequests)
  );

  useEffect(() => {
    saveToStorage('campusConnectFriends', friends);
  }, [friends]);

  useEffect(() => {
    saveToStorage('campusConnectFriendRequests', friendRequests);
  }, [friendRequests]);

  const getFriendshipStatus = (rollNumber) => {
    if (!rollNumber) return 'none';
    if (friends.some((f) => f.rollNumber === rollNumber)) return 'friends';
    if (
      friendRequests.some(
        (req) =>
          req.from === currentUser.rollNumber &&
          req.to === rollNumber &&
          req.status === 'pending'
      )
    ) {
      return 'pending';
    }
    if (
      friendRequests.some(
        (req) =>
          req.from === rollNumber &&
          req.to === currentUser.rollNumber &&
          req.status === 'pending'
      )
    ) {
      return 'request_received';
    }
    return 'none';
  };

  const sendFriendRequest = (targetRoll, targetName = '') => {
    const roll = targetRoll.trim().toUpperCase();

    if (!validateRollNumber(roll)) {
      alert('Please enter a valid roll number (Format: NNNNANANNN)');
      return false;
    }

    if (roll === currentUser.rollNumber) {
      alert("You can't send a friend request to yourself!");
      return false;
    }

    if (friends.some((f) => f.rollNumber === roll)) {
      alert('This user is already your friend!');
      return false;
    }

    if (
      friendRequests.some(
        (req) =>
          req.from === currentUser.rollNumber &&
          req.to === roll &&
          req.status === 'pending'
      )
    ) {
      alert('Friend request already sent!');
      return false;
    }

    if (
      friendRequests.some(
        (req) =>
          req.from === roll &&
          req.to === currentUser.rollNumber &&
          req.status === 'pending'
      )
    ) {
      alert('This user has already sent you a friend request! Check your pending requests.');
      return false;
    }

    const newRequest = {
      id: Date.now(),
      from: currentUser.rollNumber || '2025A7R025',
      fromName: currentUser.name || 'Student',
      to: roll,
      toName: targetName || roll,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    setFriendRequests((prev) => [newRequest, ...prev]);
    alert(`Friend request sent to ${targetName ? `${targetName} (${roll})` : roll}!`);
    return true;
  };

  const acceptFriendRequest = (requestId) => {
    const request = friendRequests.find((req) => req.id === requestId);
    if (!request) return;

    const newFriend = {
      id: Date.now(),
      name: request.fromName,
      rollNumber: request.from,
      avatarColor: getRandomGradient(),
      timestamp: new Date().toISOString(),
      dmHistory: [
        { text: `You are now connected with ${request.fromName}!`, time: 'Now', sender: 'system' },
        { text: 'Hi there! 👋', time: 'Now', sender: request.fromName },
      ],
    };

    setFriends((prev) => [newFriend, ...prev]);
    setFriendRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: 'accepted' } : req))
    );
    alert(`You are now friends with ${request.fromName} (${request.from})!`);
  };

  const declineFriendRequest = (requestId) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId));
  };

  const removeFriend = (friendRoll) => {
    if (window.confirm('Are you sure you want to remove this friend?')) {
      setFriends((prev) => prev.filter((f) => f.rollNumber !== friendRoll));
      setFriendRequests((prev) =>
        prev.filter((req) => !(req.from === friendRoll || req.to === friendRoll))
      );
    }
  };

  // 3. Posts & Feed
  const [posts, setPosts] = useState(() =>
    loadFromStorage('campusConnectPosts', initialPosts)
  );

  const [comments, setComments] = useState(() =>
    loadFromStorage('campusConnectComments', initialComments)
  );

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveToStorage('campusConnectPosts', posts);
  }, [posts]);

  useEffect(() => {
    saveToStorage('campusConnectComments', comments);
  }, [comments]);

  const addPost = ({ text, tag, isAnon, customName, customRoll }) => {
    if (!text.trim()) {
      alert('Please enter some text for your post!');
      return false;
    }

    const roll = isAnon ? '' : (customRoll || currentUser.rollNumber || '').toUpperCase();
    if (roll && !validateRollNumber(roll)) {
      alert('Please enter a valid roll number (Format: NNNNANANNN)');
      return false;
    }

    const name = isAnon ? 'Anonymous Student' : (customName || currentUser.name || 'Student');
    const postId = Date.now();

    const newPost = {
      id: postId,
      author: name,
      authorRoll: roll,
      authorInitial: isAnon ? 'A' : name.charAt(0).toUpperCase(),
      avatarColor: isAnon ? '#64748b' : currentUser.avatarColor || getRandomGradient(),
      text: text.trim(),
      tag: tag || '',
      time: formatTime(),
      date: formatDate(),
      likes: 0,
      liked: false,
      comments: 0,
      isAnon,
    };

    setPosts((prev) => [newPost, ...prev]);
    setComments((prev) => ({ ...prev, [postId]: [] }));

    if (!isAnon && (customName || customRoll)) {
      updateUserProfile(customName, customRoll);
    }

    return postId;
  };

  const likePost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const liked = !p.liked;
          return {
            ...p,
            liked,
            likes: p.likes + (liked ? 1 : -1),
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId, parentCommentId, text) => {
    if (!text || !text.trim()) {
      alert('Please enter some text for your comment!');
      return false;
    }

    const commentId = Date.now();
    const isReply = parentCommentId !== null && parentCommentId !== undefined;
    const authorName = currentUser.name || 'Student';

    const newComment = {
      id: commentId,
      author: authorName,
      authorInitial: authorName.charAt(0).toUpperCase(),
      avatarColor: currentUser.avatarColor || getRandomGradient(),
      text: text.trim(),
      time: formatTime(),
      likes: 0,
      liked: false,
      replies: [],
      isReply,
      showReplies: false,
    };

    setComments((prev) => {
      const postComments = prev[postId] ? [...prev[postId]] : [];

      if (isReply) {
        const insertReply = (list) => {
          return list.map((c) => {
            if (c.id === parentCommentId) {
              return {
                ...c,
                showReplies: true,
                replies: [...(c.replies || []), newComment],
              };
            }
            if (c.replies && c.replies.length > 0) {
              return { ...c, replies: insertReply(c.replies) };
            }
            return c;
          });
        };
        return { ...prev, [postId]: insertReply(postComments) };
      } else {
        return { ...prev, [postId]: [...postComments, newComment] };
      }
    });

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p))
    );

    return commentId;
  };

  const likeComment = (postId, commentId) => {
    setComments((prev) => {
      const postComments = prev[postId] ? [...prev[postId]] : [];
      const updateLikes = (list) => {
        return list.map((c) => {
          if (c.id === commentId) {
            const liked = !c.liked;
            return {
              ...c,
              liked,
              likes: c.likes + (liked ? 1 : -1),
            };
          }
          if (c.replies && c.replies.length > 0) {
            return { ...c, replies: updateLikes(c.replies) };
          }
          return c;
        });
      };
      return { ...prev, [postId]: updateLikes(postComments) };
    });
  };

  const toggleReplies = (postId, commentId) => {
    setComments((prev) => {
      const postComments = prev[postId] ? [...prev[postId]] : [];
      const toggle = (list) => {
        return list.map((c) => {
          if (c.id === commentId) {
            return { ...c, showReplies: !c.showReplies };
          }
          if (c.replies && c.replies.length > 0) {
            return { ...c, replies: toggle(c.replies) };
          }
          return c;
        });
      };
      return { ...prev, [postId]: toggle(postComments) };
    });
  };

  // 4. Communities State
  const [discoveryPool, setDiscoveryPool] = useState(initialDiscoveryPool);
  const [joinedCommunities, setJoinedCommunities] = useState(initialJoinedGroups);
  const [myCommunities, setMyCommunities] = useState(initialMyGroups);
  const [groupChats, setGroupChats] = useState(initialGroupChats);
  const [communityMembers, setCommunityMembers] = useState(initialCommunityMembers);
  const [currentGroup, setCurrentGroup] = useState('');
  const [commNotificationCount, setCommNotificationCount] = useState(3);

  const createNewGroup = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    if (myCommunities.includes(trimmed) || joinedCommunities.includes(trimmed)) {
      alert('A community with this name already exists in your list!');
      return;
    }

    setMyCommunities((prev) => [trimmed, ...prev]);
    setGroupChats((prev) => ({
      ...prev,
      [trimmed]: [{ msg: `Welcome to ${trimmed}!`, time: 'Now', sender: 'System' }],
    }));
    setCommunityMembers((prev) => ({
      ...prev,
      [trimmed]: [
        {
          name: currentUser.name,
          rollNumber: currentUser.rollNumber || '2025A7R025',
          avatarColor: currentUser.avatarColor,
        },
      ],
    }));
    setCurrentGroup(trimmed);
  };

  const joinGroup = (name) => {
    if (!joinedCommunities.includes(name)) {
      setJoinedCommunities((prev) => [...prev, name]);
      setGroupChats((prev) => ({
        ...prev,
        [name]: prev[name] || [{ msg: `You joined ${name}!`, time: 'Now', sender: 'System' }],
      }));
      setCommunityMembers((prev) => {
        const existing = prev[name] || [];
        if (!existing.some((m) => m.rollNumber === currentUser.rollNumber)) {
          return {
            ...prev,
            [name]: [
              ...existing,
              {
                name: currentUser.name,
                rollNumber: currentUser.rollNumber || '2025A7R025',
                avatarColor: currentUser.avatarColor,
              },
            ],
          };
        }
        return prev;
      });
    }
    setCurrentGroup(name);
    setCommNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const leaveGroup = (name) => {
    setJoinedCommunities((prev) => prev.filter((g) => g !== name));
    setMyCommunities((prev) => prev.filter((g) => g !== name));
    if (currentGroup === name) {
      setCurrentGroup('');
    }
  };

  const deleteGroup = (name) => {
    if (window.confirm(`Delete "${name}" permanently? All group chats will be lost.`)) {
      setMyCommunities((prev) => prev.filter((g) => g !== name));
      if (currentGroup === name) {
        setCurrentGroup('');
      }
    }
  };

  const sendGroupMessage = (groupName, messageText) => {
    if (!messageText.trim() || !groupName) return;

    const time = formatTime();
    setGroupChats((prev) => ({
      ...prev,
      [groupName]: [...(prev[groupName] || []), { msg: messageText.trim(), time, sender: currentUser.name }],
    }));

    // Simulated response
    setTimeout(() => {
      setGroupChats((prev) => ({
        ...prev,
        [groupName]: [
          ...(prev[groupName] || []),
          { msg: 'Thanks for sharing!', time: formatTime(), sender: 'Community Member' },
        ],
      }));
    }, 1200);
  };

  // 5. Private DMs State
  const [activeDMRecipient, setActiveDMRecipient] = useState(null);

  const sendDM = (friendRoll, text) => {
    if (!text.trim() || !friendRoll) return;

    const time = formatTime();
    const sentMsg = { text: text.trim(), time, sender: currentUser.name };

    setFriends((prev) =>
      prev.map((f) => {
        if (f.rollNumber === friendRoll) {
          return {
            ...f,
            dmHistory: [...(f.dmHistory || []), sentMsg],
          };
        }
        return f;
      })
    );

    // Auto-reply simulation
    setTimeout(() => {
      const replies = [
        'Thanks for your message!',
        "That's interesting!",
        "I'll get back to you soon!",
        'Great point!',
        "Let's discuss this more.",
        '👍 Sounds good!',
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyMsg = { text: reply, time: formatTime(), sender: activeDMRecipient?.name || 'Friend' };

      setFriends((prev) =>
        prev.map((f) => {
          if (f.rollNumber === friendRoll) {
            return {
              ...f,
              dmHistory: [...(f.dmHistory || []), replyMsg],
            };
          }
          return f;
        })
      );
    }, 1500);
  };

  // 6. Canteen State
  const [menu] = useState(canteenMenu);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty! Add some items first.');
      return false;
    }
    const total = cart.reduce((sum, item) => sum + item.p, 0);
    const orderId = 'ORD' + Math.floor(Math.random() * 10000);

    setTimeout(() => {
      alert(
        `Order placed successfully!\nOrder ID: ${orderId}\nTotal: ₹${total}\nEstimated delivery: 15 minutes`
      );
      setCart([]);
    }, 800);
    return true;
  };

  // 7. Events State
  const [events, setEvents] = useState(sampleEvents);
  const toggleEventRegistration = (eventId) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const registered = !evt.registered;
          return {
            ...evt,
            registered,
            attendees: evt.attendees + (registered ? 1 : -1),
          };
        }
        return evt;
      })
    );
  };

  // 8. Announcements State
  const [announcements] = useState(sampleAnnouncements);

  const pendingRequestsCount = friendRequests.filter(
    (req) => req.to === currentUser.rollNumber && req.status === 'pending'
  ).length;

  return (
    <AppContext.Provider
      value={{
        // User
        currentUser,
        updateUserProfile,
        // Friends
        friends,
        friendRequests,
        pendingRequestsCount,
        getFriendshipStatus,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        removeFriend,
        // Feed & Posts
        posts,
        comments,
        searchQuery,
        setSearchQuery,
        addPost,
        likePost,
        addComment,
        likeComment,
        toggleReplies,
        // Communities
        discoveryPool,
        joinedCommunities,
        myCommunities,
        currentGroup,
        setCurrentGroup,
        groupChats,
        communityMembers,
        commNotificationCount,
        setCommNotificationCount,
        createNewGroup,
        joinGroup,
        leaveGroup,
        deleteGroup,
        sendGroupMessage,
        // DMs
        activeDMRecipient,
        setActiveDMRecipient,
        sendDM,
        // Canteen
        menu,
        cart,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        checkout,
        // Events & Announcements
        events,
        toggleEventRegistration,
        announcements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
