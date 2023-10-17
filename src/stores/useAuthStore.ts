import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface IAuthStore {
  token: string | null;
}

export const useAuthStore = create<IAuthStore>(
  subscribeWithSelector(
        persist(
            (set) => ({
                token: null,
            }),
            { name: 'auth-store' }
        )
)
);