import { create } from "zustand";

interface IsAuth {
  isAuth: boolean | null;
  setIsAuth: (isAuth: boolean) => void;
}

export const useIsAuth = create<IsAuth>((set) => ({
  isAuth: null,
  setIsAuth: (isAuth: boolean) => set(() => ({ isAuth })),
}));
