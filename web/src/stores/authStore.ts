import { defineStore } from "pinia";
import { BASE_URL } from "@/utils/apiURL";

import type { IAuthUser, ILoginCredentials, ILoginResponse } from "@/types/IAuth";

const USER_KEY = "snapup-user";
const ACCESS_TOKEN_KEY = "snapup-access-token";
const REFRESH_TOKEN_KEY = "snapup-refresh-token";

const getStoredUser = (): IAuthUser | null => {
  const storedUser = sessionStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as IAuthUser;
  } catch {
    sessionStorage.removeItem(USER_KEY);

    return null;
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getStoredUser() as IAuthUser | null,

    accessToken: sessionStorage.getItem(ACCESS_TOKEN_KEY),

    refreshToken: sessionStorage.getItem(REFRESH_TOKEN_KEY),

    isLoading: false,

    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state): boolean => {
      return Boolean(state.user && state.accessToken);
    },

    fullName: (state): string => {
      if (!state.user) {
        return "";
      }

      return `${state.user.firstName} ${state.user.lastName}`;
    }
  },

  actions: {
    async login(credentials: ILoginCredentials): Promise<boolean> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`${BASE_URL}auth/login`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 30
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(errorData?.message ?? "Unable to log in.");
        }

        const data = (await response.json()) as ILoginResponse;

        const { accessToken, refreshToken, ...user } = data;

        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        sessionStorage.setItem(USER_KEY, JSON.stringify(user));

        sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Something went wrong.";

        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async restoreSession() {
      if (!this.accessToken) {
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}auth/me`, {
          method: "GET",

          headers: {
            Authorization: `Bearer ${this.accessToken}`
          },

          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Session expired.");
        }

        const user = (await response.json()) as IAuthUser;

        this.user = user;

        sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch {
        this.logout();
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.error = null;

      sessionStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }
});
