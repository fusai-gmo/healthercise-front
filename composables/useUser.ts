import { User } from 'firebase/auth'

export const useUser = () =>
  useState<{ isLoading: boolean; user: User | null }>('user', () => ({
    isLoading: false,
    user: null,
  }))
