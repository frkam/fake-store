import { create } from "zustand";

interface IsAuth {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

export const useIsAuth = create<IsAuth>((set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set(() => ({ isAuth })),
}));
