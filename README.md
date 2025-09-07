# Good Deed App 🌟

A full-stack web application that encourages daily acts of kindness through gamification and anonymous global leaderboards.

## ✨ Features

### 🎯 **Daily Challenges**

- Random kindness challenges each day
- Points system (5-25 points per challenge)
- Streak tracking for consecutive days
- Completion tracking to prevent duplicates

### 🏆 **Gamification**

- **Points System** - Earn points for each good deed
- **Streaks** - Build consecutive day streaks
- **Leaderboards** - Anonymous global rankings
- **Achievements** - Unlock badges and milestones

### 👥 **Community**

- **Anonymous Leaderboards** - Compete without revealing personal info
- **Global Rankings** - See how you rank worldwide
- **Weekly/Monthly Stats** - Track community progress
- **Recent Activity** - See what others are doing

### 🎨 **Modern UI/UX**

- Beautiful, responsive design
- Real-time updates and notifications
- Mobile-friendly interface
- Smooth animations and transitions

## 🚀 Tech Stack


### **Frontend**

- **Vue.js 3** with Composition API
- **Pinia** for state management
- **Vue Router** with authentication guards
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Vue Toastification** for notifications

## 📦 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd good-deed-app
```

2. **Install dependencies**

```bash
npm run install-all
```

3. **Start development servers**

```bash
npm run dev
```

This will start:

- Backend server on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

## 🗄️ Database Schema

The app uses SQLite with the following tables:

### **Users**

- Authentication and profile data
- Points and streak tracking
- Account creation date

### **Deeds**

- Completed challenges and points earned
- User activity history
- Challenge descriptions

### **Daily Challenges**

- Available kindness challenges
- Point values and categories
- Challenge descriptions

### **User Completions**

- Track daily challenge completions
- Prevent duplicate submissions
- Date-based tracking

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for password security
- **Rate Limiting** - Prevent abuse
- **CORS Protection** - Secure cross-origin requests
- **Input Validation** - Server-side validation
- **Helmet Security** - Additional security headers

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only

# Production
npm run build        # Build frontend for production
npm start           # Start production server

# Installation
npm run install-all # Install all dependencies
```

## 🌟 Getting Started

1. **Register an account** at `http://localhost:5173/register`
2. **Complete your first challenge** on the dashboard
3. **Build your streak** by completing daily challenges
4. **Check the leaderboard** to see your ranking
5. **Explore all challenges** in the challenges section

## 🎯 Daily Challenges Examples

- **Hold the Door** - Hold the door open for someone (5 points)
- **Compliment Someone** - Give a genuine compliment (10 points)
- **Help with Groceries** - Help someone carry bags (15 points)
- **Donate Something** - Donate clothes, books, or food (20 points)
- **Random Act of Kindness** - Do something kind unexpectedly (25 points)

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
JWT_SECRET=your-secret-key-here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Deeds & Challenges

- `GET /api/deeds/daily-challenge` - Get today's challenge
- `POST /api/deeds/complete-challenge` - Complete a challenge
- `GET /api/deeds/history` - Get user's deed history
- `GET /api/deeds/stats` - Get user statistics
- `GET /api/deeds/challenges` - Get all challenges

### Leaderboard

- `GET /api/leaderboard/global` - Global rankings
- `GET /api/leaderboard/weekly` - Weekly rankings
- `GET /api/leaderboard/streaks` - Streak rankings
- `GET /api/leaderboard/stats` - Community statistics
- `GET /api/leaderboard/recent-activity` - Recent activity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with ❤️ to encourage kindness and positive actions
- Inspired by the idea that small acts of kindness can make a big difference
- Designed to gamify positive behavior and build community

---

**Make the world a better place, one act of kindness at a time! 🌍✨**
