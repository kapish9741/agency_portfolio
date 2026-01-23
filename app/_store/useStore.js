import { create } from 'zustand';

export const useStore = create((set) => ({
    lenis: undefined,
    setLenis: (lenis) => set({ lenis }),
    introOut: false,
    setIntroOut: (introOut) => set({ introOut }),
    isLoading: true,
    setIsLoading: (isLoading) => set({ isLoading }),
    isMenuOpen: false,
    setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
}));
