import { GRADIENTS } from '../utils/helpers';

export const initialPosts = [
  {
    id: 1,
    author: "Alex Johnson",
    authorRoll: "2025A7R001",
    authorInitial: "A",
    avatarColor: GRADIENTS[0],
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
  {
    id: 3,
    author: "Sports Club",
    authorRoll: "2025B3S002",
    authorInitial: "S",
    avatarColor: GRADIENTS[1],
    text: "🏀 Basketball tryouts next week! Open to all skill levels. Practice sessions every evening at the court. See you there!",
    tag: "🏀 Sports",
    time: "2:45 PM",
    date: "Mar 14",
    likes: 42,
    liked: false,
    comments: 7,
    isAnon: false,
  },
  {
    id: 4,
    author: "Sarah Chen",
    authorRoll: "2025C2R012",
    authorInitial: "S",
    avatarColor: GRADIENTS[2],
    text: "Looking for study partners for the Calculus exam next week. Anyone interested in forming a study group?",
    tag: "📚 Study",
    time: "3:30 PM",
    date: "Today",
    likes: 15,
    liked: false,
    comments: 3,
    isAnon: false,
  },
  {
    id: 5,
    author: "Mike Wilson",
    authorRoll: "2025D4S008",
    authorInitial: "M",
    avatarColor: GRADIENTS[3],
    text: "The cafeteria has introduced new vegan options starting today! The vegan burger is amazing 🌱",
    tag: "🍔 Food",
    time: "12:15 PM",
    date: "Today",
    likes: 32,
    liked: false,
    comments: 8,
    isAnon: false,
  },
  {
    id: 6,
    author: "Music Lovers Club",
    authorRoll: "2025E1R003",
    authorInitial: "M",
    avatarColor: GRADIENTS[4],
    text: "🎵 Open mic night this Friday at the student center! Sign up at the cultural desk. All talents welcome!",
    tag: "🎵 Music",
    time: "11:00 AM",
    date: "Today",
    likes: 28,
    liked: false,
    comments: 5,
    isAnon: false,
  },
];

export const initialComments = {
  1: [
    {
      id: 101,
      author: "Maria Chen",
      authorInitial: "M",
      avatarColor: GRADIENTS[1],
      text: "Thanks for the update! Will the workshop cover web development or mobile apps?",
      time: "10:45 AM",
      likes: 5,
      liked: false,
      replies: [
        {
          id: 111,
          author: "Alex Johnson",
          authorInitial: "A",
          avatarColor: GRADIENTS[0],
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
  2: [
    {
      id: 201,
      author: "Jamie Smith",
      authorInitial: "J",
      avatarColor: GRADIENTS[2],
      text: "I saw one at the lost and found desk! You should check there.",
      time: "9:30 AM",
      likes: 1,
      liked: false,
      replies: [],
      isReply: false,
      showReplies: false,
    },
  ],
};

export const initialFriends = [
  {
    id: 1,
    name: "Rahul Sharma",
    rollNumber: "2025A7R010",
    avatarColor: GRADIENTS[0],
    timestamp: new Date().toISOString(),
    dmHistory: [
      { text: "You are now connected with Rahul Sharma!", time: "10:00 AM", sender: "system" },
      { text: "Hi there! How are you?", time: "10:05 AM", sender: "Rahul Sharma" },
      { text: "I'm good, thanks! Working on the CS assignment.", time: "10:10 AM", sender: "Student" }
    ]
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "2025B3S015",
    avatarColor: GRADIENTS[1],
    timestamp: new Date().toISOString(),
    dmHistory: [
      { text: "You are now connected with Priya Patel!", time: "Yesterday", sender: "system" },
      { text: "Hey! Did you understand the physics problem?", time: "2:30 PM", sender: "Priya Patel" },
      { text: "Not really, let's discuss it together.", time: "2:45 PM", sender: "Student" }
    ]
  }
];

export const initialFriendRequests = [
  {
    id: 1,
    from: "2025A7R020",
    fromName: "Amit Kumar",
    to: "2025A7R025",
    status: 'pending',
    timestamp: new Date().toISOString()
  }
];

export const initialDiscoveryPool = [
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
  "Tech Innovators"
];

export const initialJoinedGroups = ["Coding Hub", "Sports Club", "Music Lovers"];
export const initialMyGroups = ["Study Group A"];

export const initialGroupChats = {
  "Coding Hub": [
    { msg: "Welcome to Coding Hub!", time: "10:30 AM", sender: "System" },
    { msg: "Anyone working on the web dev project?", time: "11:45 AM", sender: "Alex Johnson" },
    { msg: "I need help with React hooks", time: "12:15 PM", sender: "David Park" },
  ],
  "Sports Club": [
    { msg: "Welcome to Sports Club!", time: "9:00 AM", sender: "System" },
    { msg: "Basketball practice today at 5 PM", time: "10:30 AM", sender: "Mike Wilson" },
  ],
  "Music Lovers": [
    { msg: "Welcome to Music Lovers!", time: "2:00 PM", sender: "System" },
    { msg: "Any guitar players here?", time: "3:45 PM", sender: "Olivia Taylor" },
  ],
  "Study Group A": [
    { msg: "Welcome to Study Group A!", time: "10:30 AM", sender: "System" },
    { msg: "Anyone free for study session tomorrow?", time: "11:45 AM", sender: "Daniel Kim" },
    { msg: "I can join after 3 PM", time: "12:15 PM", sender: "Ava Thompson" },
  ],
};

export const initialCommunityMembers = {
  "Coding Hub": [
    { name: "Alex Johnson", rollNumber: "2025A7R001", avatarColor: GRADIENTS[0] },
    { name: "Sarah Chen", rollNumber: "2025B3S005", avatarColor: GRADIENTS[1] },
    { name: "David Park", rollNumber: "2025C2R012", avatarColor: GRADIENTS[2] },
    { name: "Maria Garcia", rollNumber: "2025D4S008", avatarColor: GRADIENTS[3] }
  ],
  "Sports Club": [
    { name: "Mike Wilson", rollNumber: "2025E1R003", avatarColor: GRADIENTS[4] },
    { name: "Emma Brown", rollNumber: "2025F6S010", avatarColor: GRADIENTS[5] },
    { name: "James Lee", rollNumber: "2025G3R007", avatarColor: GRADIENTS[0] }
  ],
  "Music Lovers": [
    { name: "Olivia Taylor", rollNumber: "2025H2S015", avatarColor: GRADIENTS[1] },
    { name: "Noah Martinez", rollNumber: "2025I5R009", avatarColor: GRADIENTS[2] },
    { name: "Sophia Anderson", rollNumber: "2025J8S014", avatarColor: GRADIENTS[3] }
  ],
  "Study Group A": [
    { name: "Daniel Kim", rollNumber: "2025K1R020", avatarColor: GRADIENTS[4] },
    { name: "Ava Thompson", rollNumber: "2025L4S022", avatarColor: GRADIENTS[5] }
  ]
};

export const canteenMenu = [
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

export const sampleEvents = [
  {
    id: 1,
    title: "Annual Hackathon 2026",
    date: "Oct 10-12, 2026",
    location: "Main Auditorium & Innovation Lab",
    description: "36-hour hackathon solving real-world campus & sustainability challenges. Cash prizes up to ₹1,00,000!",
    category: "Technical",
    registered: false,
    attendees: 184
  },
  {
    id: 2,
    title: "Inter-College Basketball Championship",
    date: "Oct 18, 2026",
    location: "Sports Complex Court 1",
    description: "Cheer for our campus team as they take on regional champions in the semi-finals!",
    category: "Sports",
    registered: true,
    attendees: 320
  },
  {
    id: 3,
    title: "Acoustic Unplugged Evening",
    date: "Oct 22, 2026",
    location: "Amphitheatre",
    description: "An evening of live vocalists, guitarists, and spoken word poetry under the stars.",
    category: "Cultural",
    registered: false,
    attendees: 95
  }
];

export const sampleAnnouncements = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule Released",
    date: "Sep 16, 2026",
    sender: "Dean of Academic Affairs",
    content: "The examination schedule for Semester I is now published on the student portal. Review clash policies before Oct 1.",
    priority: "High"
  },
  {
    id: 2,
    title: "Campus Library Extended Night Hours",
    date: "Sep 15, 2026",
    sender: "Central Library Committee",
    content: "Starting next Monday, the central library reading hall will remain open until 2:00 AM daily.",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Hostel Wi-Fi Maintenance Window",
    date: "Sep 14, 2026",
    sender: "IT Infrastructure Support",
    content: "Fiber network upgrades are scheduled this Saturday between 1:00 AM and 4:00 AM.",
    priority: "Low"
  }
];
