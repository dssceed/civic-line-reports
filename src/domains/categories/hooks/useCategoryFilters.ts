import { useState, useMemo } from 'react'
import type { Category } from '@/common/types/category.types'

export type CategoryFilters = {
  search: string
  status: string
}

export function useCategoryFilters(categories: Category[]) {
  const [filters, setFilters] = useState<CategoryFilters>({
    search: '',
    status: ''
  })

  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          category.name.toLowerCase().includes(searchLower) ||
          category.description.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status) {
        if (filters.status === 'active' && !category.active) return false
        if (filters.status === 'inactive' && category.active) return false
      }

      return true
    })
  }, [categories, filters])

  const updateFilter = (key: keyof CategoryFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      status: ''
    })
  }

  const hasActiveFilters = filters.search || filters.status

  return {
    filters,
    filteredCategories,
    updateFilter,
    clearFilters,
    hasActiveFilters
  }
}
