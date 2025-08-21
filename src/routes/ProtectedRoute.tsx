// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import type { Permission, Role } from '@/common/types/auth.types'

export function ProtectedRoute({
  roles,
  permissions,
  children,
}: {
  roles?: Role[]
  permissions?: Permission[]
  children: React.ReactNode
}) {
  const { user, hasAnyRole, hasAllPermissions } = useAuth()

  if (!user) return <Navigate to="/" replace />

  if (roles && !hasAnyRole(roles)) return <Navigate to="/403" replace />
  if (permissions && !hasAllPermissions(permissions)) return <Navigate to="/403" replace />

  return <>{children}</>
}