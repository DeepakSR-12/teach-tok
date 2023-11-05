import { create } from "zustand";

export interface QuizObject {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: {
    id: string;
    answer: string;
  }[];
  user: {
    name: string;
    avatar: string;
  };
}

interface appState {
  data: QuizObject[];
  setData: (data: QuizObject[]) => void;
}

const useAppStore = create<appState>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useAppStore;
