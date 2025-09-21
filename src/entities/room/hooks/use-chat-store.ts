import { create } from "zustand";

interface ChatState {
  oldText: string;
  setOldText: (payload: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  oldText: "",
  setOldText: (text) => set({ oldText: text }),
}));
