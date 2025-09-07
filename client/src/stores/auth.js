import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import { mockUser } from "./mockData";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(mockUser); // Use mock user data
  const token = ref("mock-token"); // Mock token
  const loading = ref(false);

  const toast = useToast();

  const isAuthenticated = computed(() => true); // Always authenticated in mock version

  const login = async (credentials) => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Welcome back! 🎉");
      return { success: true };
    } catch (error) {
      toast.error("Login failed");
      return { success: false, error: "Login failed" };
    } finally {
      loading.value = false;
    }
  };

  const register = async (userData) => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Account created successfully! 🎉");
      return { success: true };
    } catch (error) {
      toast.error("Registration failed");
      return { success: false, error: "Registration failed" };
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    toast.info("Logged out successfully");
  };

  const fetchProfile = async () => {
    // Mock profile fetch - no action needed
  };

  const updateProfile = async (profileData) => {
    loading.value = true;
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update mock user data
      if (profileData.username) {
        user.value.username = profileData.username;
      }
      if (profileData.email) {
        user.value.email = profileData.email;
      }

      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update profile");
      return { success: false, error: "Failed to update profile" };
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
  };
});
