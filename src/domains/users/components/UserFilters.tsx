import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"
import type { UserFilters } from "@/domains/users/hooks/useUserFilters"

interface UserFiltersProps {
  filters: UserFilters
  onUpdateFilter: (key: keyof UserFilters, value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function UserFilters({ filters, onUpdateFilter, onClearFilters, hasActiveFilters }: UserFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
        <Input
          placeholder="ค้นหาชื่อ, อีเมล, หรือ ID..."
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
          <option value="active">ใช้งาน</option>
          <option value="inactive">ไม่ใช้งาน</option>
          <option value="suspended">ระงับการใช้งาน</option>
        </select>

        {/* Role Filter */}
        <select
          value={filters.role}
          onChange={(e) => onUpdateFilter('role', e.target.value)}
          className="px-3 py-1.5 bg-slate-700/50 border border-blue-500/30 rounded-md text-blue-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">บทบาททั้งหมด</option>
          <option value="admin">ผู้ดูแลระบบ</option>
          <option value="officer">เจ้าหน้าที่</option>
          <option value="analyst">นักวิเคราะห์</option>
          <option value="viewer">ผู้ดูข้อมูล</option>
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
            <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded border border-blue-600/50 break-all">
              ค้นหา: "{filters.search}"
            </span>
          )}
          {filters.status && (
            <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded border border-green-600/50">
              สถานะ: {filters.status === 'active' ? 'ใช้งาน' : filters.status === 'inactive' ? 'ไม่ใช้งาน' : 'ระงับการใช้งาน'}
            </span>
          )}
          {filters.role && (
            <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded border border-purple-600/50">
              บทบาท: {filters.role === 'admin' ? 'ผู้ดูแลระบบ' : filters.role === 'officer' ? 'เจ้าหน้าที่' : filters.role === 'analyst' ? 'นักวิเคราะห์' : 'ผู้ดูข้อมูล'}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
