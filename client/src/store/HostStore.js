import { create } from 'zustand';

const useHostStore = create((set) => ({
  hostname: '',
  setHostname: (hostname) => set({ hostname }),
  getHostname: () => useHostStore.getState().hostname,
}));

export default useHostStore;