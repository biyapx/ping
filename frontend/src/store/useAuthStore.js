import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningIn: false,
  isLoggingIn: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.status === 200) {
        set({ authUser: res.data });
        console.log("User is authenticated:", res.data);
      } else if (res.status === 401) {
        console.log("User is not authenticated");
        set({ authUser: null });
      } else {
        set({ authUser: null });
        console.log("Unexpected response status:", res.status);
      }
    } catch (error) {
      console.error("Error checking auth:", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      if (res.status === 201) {
        set({ authUser: res.data });
        console.log("User signed up successfully:", res.data);
      } else {
        console.log("Error signing up:", res.status);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      set({ isSigningIn: false });
    }
  },
}));
