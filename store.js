import { create } from "zustand";

const useAppStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useAppStore;
