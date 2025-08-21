// src/providers/AuthProvider.tsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import type { Permission, Role, User } from '@/common/types/auth.types'
import { fetchMe } from '@/domains/auth/services/auth.service'

type AuthContextValue = {
  user: User | null
  hasRole: (role: Role) => boolean
  hasAnyRole: (roles: Role[]) => boolean
  hasPermission: (permission: Permission) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // bootstrap current user if token exists
    fetchMe().then(setUser).catch(() => setUser(null))
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const roleSet = new Set(user?.roles ?? [])
    const permSet = new Set(user?.permissions ?? [])
    return {
      user,
      hasRole: (role) => roleSet.has(role),
      hasAnyRole: (roles) => roles.some((r) => roleSet.has(r)),
      hasPermission: (permission) => permSet.has(permission),
      hasAllPermissions: (permissions) => permissions.every((p) => permSet.has(p)),
      setUser,
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}