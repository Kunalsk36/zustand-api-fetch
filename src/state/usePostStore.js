import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    loading: false,
    error: null,
    fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch('https://potterapi-fedeperin.vercel.app/en/books');
            const data = await response.json();
            set({ posts: data, loading: false });
        } catch (error) {
            set({ error: "faild to fetch posts", loading: false });
        }
    }
}));

export default usePostStore;
