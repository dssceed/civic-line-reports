 
 import { useCallback } from 'react'
 import { fetchMe, login as apiLogin, logout as apiLogout } from '@/domains/auth/services/auth.service'
 import type { User } from '@/common/types/auth.types'
 import { useAuth } from '@/providers/AuthProvider'
 
 export function useAuthActions() {
   const { setUser } = useAuth() as unknown as { setUser: (u: User | null) => void }
 
   const bootstrap = useCallback(async () => {
     try {
       const me = await fetchMe()
       setUser(me)
       return me
     } catch {
       setUser(null)
       return null
     }
   }, [setUser])
 
   const login = useCallback(async (username: string, password: string) => {
     await apiLogin({ username, password })
     const me = await fetchMe()
     setUser(me)
     return me
   }, [setUser])
 
   const logout = useCallback(async () => {
     await apiLogout()
     setUser(null)
   }, [setUser])
 
   return { bootstrap, login, logout }
 }
 

