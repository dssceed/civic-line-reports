import { useState, useMemo, useEffect } from 'react'
import type { User } from '@/common/types/auth.types'

export type UserFilters = {
  search: string
  status: string
  role: string
}

export function useUserFilters(users: User[]) {
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: '',
    role: ''
  })

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.id.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status && user.status !== filters.status) {
        return false
      }

      // Role filter
      if (filters.role && !user.roles.includes(filters.role as any)) {
        return false
      }

      return true
    })
  }, [users, filters])

  const updateFilter = (key: keyof UserFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      role: ''
    })
  }

  const hasActiveFilters = filters.search || filters.status || filters.role

  // Reset pagination when filters change
  useEffect(() => {
    // This will be handled by the parent component
  }, [filters])

  return {
    filters,
    filteredUsers,
    updateFilter,
    clearFilters,
    hasActiveFilters
  }
}
