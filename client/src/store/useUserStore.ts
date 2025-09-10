import { create } from "zustand";

type UserStore = {
  isAdmin: boolean;
  isSalesman: boolean;
  isFulfillment: boolean;
  setRoles: (roles: string[]) => void;
  clearRoles: () => void;
};

const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");

export const useUserStore = create<UserStore>((set) => ({
  isAdmin: storedRoles.includes("ADMIN"),
  isSalesman: storedRoles.includes("SALESMAN"),
  isFulfillment: storedRoles.includes("FULFILLMENT"),

  setRoles: (roles) => {
    localStorage.setItem("roles", JSON.stringify(roles));
    set({
      isAdmin: roles.includes("ADMIN"),
      isSalesman: roles.includes("SALESMAN"),
      isFulfillment: roles.includes("FULFILLMENT"),
    });
  },

  clearRoles: () => {
    localStorage.removeItem("roles");
    set({ isAdmin: false, isSalesman: false, isFulfillment: false });
  },
}));
