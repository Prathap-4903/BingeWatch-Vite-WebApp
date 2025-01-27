import { create } from 'zustand';

const useUserStore = create((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
  getUsername: () => useUserStore.getState().username,
}));

export default useUserStore;