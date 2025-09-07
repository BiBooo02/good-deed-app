import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import {
  mockDailyChallenge,
  mockChallenges,
  mockDeedHistory,
  mockUser,
} from "./mockData";

export const useDeedsStore = defineStore("deeds", () => {
  const dailyChallenge = ref(mockDailyChallenge);
  const userStats = ref({
    totalPoints: mockUser.points,
    streakDays: mockUser.streakDays,
    totalDeeds: mockUser.totalDeeds,
    thisWeekDeeds: mockUser.thisWeekDeeds,
    thisMonthDeeds: mockUser.thisMonthDeeds,
    totalPointsEarned: mockUser.totalPointsEarned,
    memberSince: mockUser.memberSince,
  });
  const deedHistory = ref(mockDeedHistory);
  const challenges = ref(mockChallenges);
  const loading = ref(false);

  const toast = useToast();

  const fetchDailyChallenge = async () => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Mock data is already loaded
    } catch (error) {
      console.error("Failed to fetch daily challenge:", error);
      toast.error("Failed to load daily challenge");
    } finally {
      loading.value = false;
    }
  };

  const completeChallenge = async (challengeId, description = "") => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find the challenge
      const challenge = challenges.value.find((c) => c.id === challengeId);
      if (!challenge) {
        throw new Error("Challenge not found");
      }

      // Update daily challenge as completed
      if (dailyChallenge.value && dailyChallenge.value.id === challengeId) {
        dailyChallenge.value.completed = true;
      }

      // Update user stats
      userStats.value.totalPoints += challenge.points;
      userStats.value.totalDeeds += 1;
      userStats.value.thisWeekDeeds += 1;
      userStats.value.totalPointsEarned += challenge.points;

      // Add to deed history
      const newDeed = {
        id: `deed-${Date.now()}`,
        deed_type: challenge.title,
        description: description || challenge.title,
        points_earned: challenge.points,
        completed_at: new Date().toISOString(),
      };
      deedHistory.value.unshift(newDeed);

      toast.success(`Challenge completed! +${challenge.points} points 🎉`);

      return { success: true, data: { pointsEarned: challenge.points } };
    } catch (error) {
      const message = error.message || "Failed to complete challenge";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      loading.value = false;
    }
  };

  const fetchUserStats = async () => {
    // Mock data is already loaded
  };

  const fetchDeedHistory = async (page = 1, limit = 10) => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedDeeds = deedHistory.value.slice(startIndex, endIndex);

      return {
        page,
        limit,
        total: deedHistory.value.length,
        pages: Math.ceil(deedHistory.value.length / limit),
      };
    } catch (error) {
      console.error("Failed to fetch deed history:", error);
      toast.error("Failed to load deed history");
    } finally {
      loading.value = false;
    }
  };

  const fetchChallenges = async () => {
    // Mock data is already loaded
  };

  const getChallengeById = computed(() => {
    return (id) => challenges.value.find((challenge) => challenge.id === id);
  });

  const getCompletedToday = computed(() => {
    return dailyChallenge.value?.completed || false;
  });

  return {
    dailyChallenge,
    userStats,
    deedHistory,
    challenges,
    loading,
    fetchDailyChallenge,
    completeChallenge,
    fetchUserStats,
    fetchDeedHistory,
    fetchChallenges,
    getChallengeById,
    getCompletedToday,
  };
});
