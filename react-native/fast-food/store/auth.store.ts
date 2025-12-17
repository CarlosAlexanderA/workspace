import {getCurrentUser} from '@/lib/appwrite';
import {User} from '@/type';
import {create} from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;

  fetchAutentucatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  setIsAuthenticated: (value) => set({isAuthenticated: value}),
  setUser: (user) => set({user}),
  setIsLoading: (loading) => set({isLoading: loading}),

  fetchAutentucatedUser: async () => {
    set({isLoading: true});
    try {
      // Call Appwrite SDK to get the authenticated user
      const user = await getCurrentUser(); // Replace with actual Appwrite call

      if (user) set({isAuthenticated: true, user: user as unknown as User});
      else set({user: null, isAuthenticated: false});
    } catch (error) {
      console.log('fetchAutenticatedUser error', error);
      set({user: null, isAuthenticated: false});
    } finally {
      set({isLoading: false});
    }
  },
}));

export default useAuthStore;
