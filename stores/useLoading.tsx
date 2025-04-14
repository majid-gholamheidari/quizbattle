import { create } from "zustand";

interface LoadingState {
    loading: boolean;
    setLoading: (state: boolean) => void;
}

export const useLoading = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (state) => set({ loading: state }),
}));
