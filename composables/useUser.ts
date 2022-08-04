import { User } from '~~/type/user'

export type UserState =
  | {
      user: User
      isLoggedIn: true
      isRegistered: true
      isLoading: false
    }
  | {
      user: null
      isLoggedIn: true
      isRegistered: false
      isLoading: false
    }
  | {
      user: null
      isLoggedIn: false
      isRegistered: false
      isLoading: false
    }
  | {
      user: null
      isLoggedIn: null
      isRegistered: null
      isLoading: true
    }

export const useUser = () =>
  useState<UserState>('user', () => ({
    user: null,
    isLoggedIn: null,
    isRegistered: null,
    isLoading: true,
  }))

export const usePromiseUser = () =>
  useState<Promise<UserState> | null>('user_promise', () => null)
