// src/components/auth/RequirePermission.tsx
import { useAuth } from '@/providers/AuthProvider'
import type { Permission } from '@/common/types/auth.types'

export function RequirePermission({
  all,
  any,
  children,
  fallback = null,
}: {
  all?: Permission[]
  any?: Permission[]
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const { hasAllPermissions, hasPermission } = useAuth()

  if (all && !hasAllPermissions(all)) return <>{fallback}</>
  if (any && !any.some((p) => hasPermission(p))) return <>{fallback}</>

  return <>{children}</>
}