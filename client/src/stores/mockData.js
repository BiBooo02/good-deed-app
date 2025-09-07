// Mock data for frontend-only version
export const mockUser = {
  id: "user-1",
  username: "KindnessHero",
  email: "hero@example.com",
  points: 245,
  streakDays: 7,
  totalDeeds: 18,
  thisWeekDeeds: 4,
  thisMonthDeeds: 12,
  totalPointsEarned: 245,
  memberSince: "2024-01-15T10:30:00Z",
};

export const mockDailyChallenge = {
  id: "challenge-1",
  title: "Hold the Door",
  description: "Hold the door open for someone today",
  points: 5,
  category: "courtesy",
  completed: false,
};

export const mockChallenges = [
  {
    id: "challenge-1",
    title: "Hold the Door",
    description: "Hold the door open for someone today",
    points: 5,
    category: "courtesy",
  },
  {
    id: "challenge-2",
    title: "Compliment Someone",
    description: "Give a genuine compliment to a stranger or colleague",
    points: 10,
    category: "kindness",
  },
  {
    id: "challenge-3",
    title: "Help with Groceries",
    description: "Help someone carry their groceries or shopping bags",
    points: 15,
    category: "helping",
  },
  {
    id: "challenge-4",
    title: "Donate Something",
    description: "Donate clothes, books, or food to those in need",
    points: 20,
    category: "charity",
  },
  {
    id: "challenge-5",
    title: "Listen Actively",
    description:
      "Give someone your full attention and listen without interrupting",
    points: 8,
    category: "communication",
  },
  {
    id: "challenge-6",
    title: "Clean Up",
    description: "Pick up litter or clean a shared space",
    points: 12,
    category: "environment",
  },
  {
    id: "challenge-7",
    title: "Share Knowledge",
    description: "Help someone learn something new",
    points: 15,
    category: "education",
  },
  {
    id: "challenge-8",
    title: "Express Gratitude",
    description: "Write a thank you note or express gratitude to someone",
    points: 10,
    category: "gratitude",
  },
  {
    id: "challenge-9",
    title: "Random Act of Kindness",
    description:
      "Do something kind for someone without expecting anything in return",
    points: 25,
    category: "random",
  },
  {
    id: "challenge-10",
    title: "Support Local Business",
    description: "Buy from a local business or leave a positive review",
    points: 8,
    category: "community",
  },
];

export const mockDeedHistory = [
  {
    id: "deed-1",
    deed_type: "Hold the Door",
    description: "Held the door for an elderly person at the library",
    points_earned: 5,
    completed_at: "2024-01-20T14:30:00Z",
  },
  {
    id: "deed-2",
    deed_type: "Compliment Someone",
    description: "Told my coworker they did a great job on the presentation",
    points_earned: 10,
    completed_at: "2024-01-19T16:45:00Z",
  },
  {
    id: "deed-3",
    deed_type: "Help with Groceries",
    description: "Helped a mom with her shopping cart",
    points_earned: 15,
    completed_at: "2024-01-18T12:15:00Z",
  },
  {
    id: "deed-4",
    deed_type: "Donate Something",
    description: "Donated old books to the local library",
    points_earned: 20,
    completed_at: "2024-01-17T09:20:00Z",
  },
  {
    id: "deed-5",
    deed_type: "Listen Actively",
    description: "Gave my full attention to a friend who needed to talk",
    points_earned: 8,
    completed_at: "2024-01-16T19:30:00Z",
  },
];

export const mockGlobalLeaderboard = [
  {
    username: "KindnessHero",
    points: 245,
    streak_days: 7,
    total_deeds: 18,
    weekly_deeds: 4,
  },
  {
    username: "GoodSamaritan",
    points: 198,
    streak_days: 5,
    total_deeds: 15,
    weekly_deeds: 3,
  },
  {
    username: "HeartOfGold",
    points: 167,
    streak_days: 12,
    total_deeds: 22,
    weekly_deeds: 5,
  },
  {
    username: "CompassionKing",
    points: 145,
    streak_days: 3,
    total_deeds: 11,
    weekly_deeds: 2,
  },
  {
    username: "LoveSpreader",
    points: 134,
    streak_days: 8,
    total_deeds: 16,
    weekly_deeds: 4,
  },
  {
    username: "KindnessQueen",
    points: 123,
    streak_days: 6,
    total_deeds: 13,
    weekly_deeds: 3,
  },
  {
    username: "GoodDeedDoer",
    points: 112,
    streak_days: 4,
    total_deeds: 9,
    weekly_deeds: 2,
  },
  {
    username: "WarmHeart",
    points: 98,
    streak_days: 9,
    total_deeds: 14,
    weekly_deeds: 3,
  },
  {
    username: "GentleSoul",
    points: 87,
    streak_days: 2,
    total_deeds: 7,
    weekly_deeds: 1,
  },
  {
    username: "KindSpirit",
    points: 76,
    streak_days: 5,
    total_deeds: 10,
    weekly_deeds: 2,
  },
];

export const mockWeeklyLeaderboard = [
  { username: "HeartOfGold", weekly_deeds: 5, weekly_points: 45 },
  { username: "KindnessHero", weekly_deeds: 4, weekly_points: 38 },
  { username: "LoveSpreader", weekly_deeds: 4, weekly_points: 35 },
  { username: "GoodSamaritan", weekly_deeds: 3, weekly_points: 28 },
  { username: "KindnessQueen", weekly_deeds: 3, weekly_points: 25 },
  { username: "WarmHeart", weekly_deeds: 3, weekly_points: 22 },
  { username: "CompassionKing", weekly_deeds: 2, weekly_points: 18 },
  { username: "GoodDeedDoer", weekly_deeds: 2, weekly_points: 15 },
  { username: "GentleSoul", weekly_deeds: 1, weekly_points: 8 },
  { username: "KindSpirit", weekly_deeds: 2, weekly_points: 12 },
];

export const mockStreakLeaderboard = [
  { username: "HeartOfGold", streak_days: 12, points: 167, total_deeds: 22 },
  { username: "WarmHeart", streak_days: 9, points: 98, total_deeds: 14 },
  { username: "KindnessHero", streak_days: 7, points: 245, total_deeds: 18 },
  { username: "LoveSpreader", streak_days: 8, points: 134, total_deeds: 16 },
  { username: "KindnessQueen", streak_days: 6, points: 123, total_deeds: 13 },
  { username: "GoodSamaritan", streak_days: 5, points: 198, total_deeds: 15 },
  { username: "KindSpirit", streak_days: 5, points: 76, total_deeds: 10 },
  { username: "CompassionKing", streak_days: 3, points: 145, total_deeds: 11 },
  { username: "GoodDeedDoer", streak_days: 4, points: 112, total_deeds: 9 },
  { username: "GentleSoul", streak_days: 2, points: 87, total_deeds: 7 },
];

export const mockCommunityStats = {
  total_users: 1250,
  total_points: 45678,
  avg_points: 36.5,
  max_points: 245,
  total_streak_days: 8900,
  avg_streak_days: 7.1,
  max_streak_days: 12,
  total_deeds: 3456,
  weekly_deeds: 234,
  monthly_deeds: 987,
};

export const mockTopCategories = [
  { deed_type: "Courtesy", count: 456 },
  { deed_type: "Kindness", count: 398 },
  { deed_type: "Helping", count: 345 },
  { deed_type: "Charity", count: 234 },
  { deed_type: "Communication", count: 198 },
];

export const mockRecentActivity = [
  {
    username: "KindnessHero",
    deed_type: "Hold the Door",
    points_earned: 5,
    completed_at: "2024-01-20T14:30:00Z",
  },
  {
    username: "GoodSamaritan",
    deed_type: "Compliment Someone",
    points_earned: 10,
    completed_at: "2024-01-20T13:15:00Z",
  },
  {
    username: "HeartOfGold",
    deed_type: "Help with Groceries",
    points_earned: 15,
    completed_at: "2024-01-20T12:45:00Z",
  },
  {
    username: "LoveSpreader",
    deed_type: "Donate Something",
    points_earned: 20,
    completed_at: "2024-01-20T11:20:00Z",
  },
  {
    username: "CompassionKing",
    deed_type: "Listen Actively",
    points_earned: 8,
    completed_at: "2024-01-20T10:30:00Z",
  },
];
