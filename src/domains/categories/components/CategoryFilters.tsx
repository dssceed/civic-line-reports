import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import type { CategoryFilters } from "@/domains/categories/hooks/useCategoryFilters"

interface CategoryFiltersProps {
  filters: CategoryFilters
  onUpdateFilter: (key: keyof CategoryFilters, value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function CategoryFilters({ filters, onUpdateFilter, onClearFilters, hasActiveFilters }: CategoryFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
        <Input
          placeholder="ค้นหาชื่อหรือคำอธิบายหมวดหมู่..."
          value={filters.search}
          onChange={(e) => onUpdateFilter('search', e.target.value)}
          className="pl-10 bg-slate-700/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-400" />
          <span className="text-blue-200 text-sm">กรอง:</span>
        </div>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => onUpdateFilter('status', e.target.value)}
          className="px-3 py-1.5 bg-slate-700/50 border border-blue-500/30 rounded-md text-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">สถานะทั้งหมด</option>
          <option value="active">เปิดใช้งาน</option>
          <option value="inactive">ปิดใช้งาน</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-500/30"
          >
            <X className="h-4 w-4 mr-1" />
            ล้างตัวกรอง
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded border border-blue-600/50">
              ค้นหา: "{filters.search}"
            </span>
          )}
          {filters.status && (
            <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded border border-green-600/50">
              สถานะ: {filters.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
