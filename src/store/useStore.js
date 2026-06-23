import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // User data
      user: null,
      setUser: (userData) => set({ user: userData }),

      // Selected categories
      categories: [],
      setCategories: (cats) => set({ categories: cats }),
      toggleCategory: (category) => {
        const current = get().categories;
        if (current.includes(category)) {
          set({ categories: current.filter((c) => c !== category) });
        } else {
          set({ categories: [...current, category] });
        }
      },
      removeCategory: (category) => {
        set({ categories: get().categories.filter((c) => c !== category) });
      },

      // Notes
      notes: '',
      setNotes: (text) => set({ notes: text }),

      // Reset
      resetStore: () => set({ user: null, categories: [], notes: '' }),
    }),
    {
      name: 'super-app-store',
    }
  )
);

export default useStore;
