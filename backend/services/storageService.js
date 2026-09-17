const seedPosts = [
  {
    id: 1,
    author: "Alex Johnson",
    authorRoll: "2025A7R001",
    authorInitial: "A",
    avatarColor: "linear-gradient(135deg, #4361ee, #3a0ca3)",
    text: "Hey everyone! The coding workshop this Friday has been moved to Room 302. Bring your laptops! 🚀",
    tag: "📚 Study",
    time: "10:30 AM",
    date: "Today",
    likes: 24,
    liked: false,
    comments: 3,
    isAnon: false,
  },
  {
    id: 2,
    author: "Anonymous Student",
    authorRoll: "",
    authorInitial: "A",
    avatarColor: "#64748b",
    text: "Has anyone found a blue water bottle in the library? I think I left it near the computers yesterday. Please DM me if found!",
    tag: "❓ Question",
    time: "Yesterday",
    date: "Mar 15",
    likes: 8,
    liked: true,
    comments: 5,
    isAnon: true,
  },
];

const seedComments = {
  1: [
    {
      id: 101,
      author: "Maria Chen",
      authorInitial: "M",
      avatarColor: "linear-gradient(135deg, #7209b7, #ef476f)",
      text: "Thanks for the update! Will the workshop cover web development or mobile apps?",
      time: "10:45 AM",
      likes: 5,
      liked: false,
      replies: [
        {
          id: 111,
          author: "Alex Johnson",
          authorInitial: "A",
          avatarColor: "linear-gradient(135deg, #4361ee, #3a0ca3)",
          text: "Both! We'll have separate tracks for web (React) and mobile (React Native).",
          time: "11:00 AM",
          likes: 3,
          liked: true,
          replies: [],
          isReply: true,
          showReplies: false,
        },
      ],
      isReply: false,
      showReplies: true,
    },
  ],
};

const seedCommunities = [
  "Coding Hub",
  "Sports Club",
  "Exams 2024",
  "Photography",
  "Music Lovers",
  "Book Club",
  "Startup Ideas",
  "Gaming Zone",
  "Movie Buffs",
  "Foodies Club",
  "Fitness Group",
  "Art Society",
  "Debate Club",
  "Volunteer Corps",
  "Tech Innovators",
];

const seedGroupChats = {
  "Coding Hub": [
    { msg: "Welcome to Coding Hub!", time: "10:30 AM", sender: "System" },
  ],
  "Sports Club": [
    { msg: "Welcome to Sports Club!", time: "9:00 AM", sender: "System" },
  ],
};

const seedMenu = [
  { id: 0, n: "Masala Chai", p: 15, category: "drinks", icon: "☕" },
  { id: 1, n: "Cold Coffee", p: 45, category: "drinks", icon: "🥤" },
  { id: 2, n: "Fresh Lime Soda", p: 25, category: "drinks", icon: "🍹" },
  { id: 3, n: "Mango Shake", p: 40, category: "drinks", icon: "🥭" },
  { id: 4, n: "Samosa (2 pcs)", p: 20, category: "snacks", icon: "🥐" },
  { id: 5, n: "Vada Pav", p: 25, category: "snacks", icon: "🥪" },
  { id: 6, n: "French Fries", p: 50, category: "snacks", icon: "🍟" },
  { id: 7, n: "Paneer Tikka Sandwich", p: 60, category: "snacks", icon: "🥪" },
  { id: 8, n: "Cheese Pizza", p: 150, category: "meals", icon: "🍕" },
  { id: 9, n: "Butter Chicken with Naan", p: 180, category: "meals", icon: "🍛" },
  { id: 10, n: "Veg Biryani", p: 120, category: "meals", icon: "🍚" },
  { id: 11, n: "Chicken Burger Combo", p: 130, category: "meals", icon: "🍔" },
  { id: 12, n: "Chocolate Pastry", p: 35, category: "desserts", icon: "🎂" },
  { id: 13, n: "Gulab Jamun (2 pcs)", p: 30, category: "desserts", icon: "🍬" },
  { id: 14, n: "Ice Cream Scoop", p: 25, category: "desserts", icon: "🍨" },
  { id: 15, n: "Student Special Thali", p: 90, category: "combos", icon: "🍱" },
  { id: 16, n: "Snack Combo (Samosa+Tea)", p: 30, category: "combos", icon: "☕" },
  { id: 17, n: "Burger + Coke Combo", p: 100, category: "combos", icon: "🍔" }
];

class StorageService {
  constructor() {
    this.posts = [...seedPosts];
    this.comments = { ...seedComments };
    this.communities = [...seedCommunities];
    this.groupChats = { ...seedGroupChats };
    this.friends = [];
    this.friendRequests = [];
    this.menu = [...seedMenu];
    this.orders = [];
    this.supportTickets = [];
  }

  // Posts
  getPosts(search, tag) {
    let result = [...this.posts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.text.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q)) ||
          p.author.toLowerCase().includes(q)
      );
    }
    if (tag) {
      result = result.filter((p) => p.tag === tag);
    }
    return result;
  }

  createPost(postData) {
    const newPost = {
      id: Date.now(),
      likes: 0,
      liked: false,
      comments: 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      ...postData,
    };
    this.posts.unshift(newPost);
    this.comments[newPost.id] = [];
    return newPost;
  }

  likePost(id) {
    const post = this.posts.find((p) => p.id === Number(id));
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      return post;
    }
    return null;
  }

  // Comments
  getComments(postId) {
    return this.comments[postId] || [];
  }

  addComment(postId, commentData) {
    const post = this.posts.find((p) => p.id === Number(postId));
    if (!post) return null;

    const newComment = {
      id: Date.now(),
      likes: 0,
      liked: false,
      replies: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...commentData,
    };

    if (!this.comments[postId]) {
      this.comments[postId] = [];
    }

    if (commentData.parentCommentId) {
      const insertReply = (list) => {
        for (let c of list) {
          if (c.id === Number(commentData.parentCommentId)) {
            c.replies.push(newComment);
            return true;
          }
          if (c.replies && c.replies.length > 0) {
            if (insertReply(c.replies)) return true;
          }
        }
        return false;
      };
      insertReply(this.comments[postId]);
    } else {
      this.comments[postId].push(newComment);
    }

    post.comments += 1;
    return newComment;
  }

  // Communities
  getCommunities() {
    return this.communities;
  }

  createCommunity(name) {
    if (!this.communities.includes(name)) {
      this.communities.push(name);
      this.groupChats[name] = [{ msg: `Welcome to ${name}!`, time: 'Now', sender: 'System' }];
    }
    return name;
  }

  getCommunityMessages(name) {
    return this.groupChats[name] || [];
  }

  addCommunityMessage(name, messageData) {
    if (!this.groupChats[name]) {
      this.groupChats[name] = [];
    }
    const msg = {
      msg: messageData.msg,
      sender: messageData.sender || 'Anonymous',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    this.groupChats[name].push(msg);
    return msg;
  }

  // Canteen
  getMenu(category) {
    if (category && category !== 'all') {
      return this.menu.filter((m) => m.category === category);
    }
    return this.menu;
  }

  createOrder(orderData) {
    const order = {
      id: 'ORD' + Math.floor(Math.random() * 10000),
      timestamp: new Date().toISOString(),
      ...orderData,
    };
    this.orders.push(order);
    return order;
  }

  // Support
  createSupportTicket(ticketData) {
    const ticket = {
      id: 'TICK-' + Date.now(),
      timestamp: new Date().toISOString(),
      status: 'open',
      ...ticketData,
    };
    this.supportTickets.push(ticket);
    return ticket;
  }
}

export const storageService = new StorageService();
