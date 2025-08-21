import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { CategoryFormDialog } from "@/domains/categories/components/CategoryFormDialog"
import { CategoryFilters } from "@/domains/categories/components/CategoryFilters"
import { useCategories } from "@/domains/categories/hooks/useCategories"
import { useCategoryFilters } from "@/domains/categories/hooks/useCategoryFilters"
import { usePagination } from "@/domains/users/hooks/usePagination"
import { Pagination } from "@/domains/users/components/Pagination"
import { Plus, Edit, Trash2, Database } from "lucide-react"
import type { Category } from "@/common/types/category.types"

const Categories = () => {
  const { categories, loading, addCategory, editCategory, toggleStatus, removeCategory } = useCategories()
  const { filters, filteredCategories, updateFilter, clearFilters, hasActiveFilters } = useCategoryFilters(categories)
  const {
    currentPage,
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
    startIndex,
    endIndex,
    totalItems
  } = usePagination(filteredCategories, 3) // 3 items per page
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setDialogOpen(true)
  }

  const handleToggleStatus = async (category: Category) => {
    setActionLoading(true)
    try {
      await toggleStatus({ id: category.id, active: !category.active })
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteCategory = async (category: Category) => {
    if (confirm(`คุณต้องการลบหมวดหมู่ "${category.name}" ใช่หรือไม่?`)) {
      setActionLoading(true)
      try {
        await removeCategory(category.id)
      } finally {
        setActionLoading(false)
      }
    }
  }

  const handleSubmit = async (payload: any) => {
    setActionLoading(true)
    try {
      if (selectedCategory) {
        await editCategory(payload)
      } else {
        await addCategory(payload)
      }
    } finally {
      setActionLoading(false)
    }
  }

  const activeCategories = categories.filter(c => c.active)
  const inactiveCategories = categories.filter(c => !c.active)

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination()
  }, [filters])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">จัดการหมวดหมู่</h1>
            <p className="text-blue-300/80">เพิ่ม แก้ไข และลบหมวดหมู่ของเรื่องร้องเรียน</p>
          </div>
          <Button onClick={handleAddCategory} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มหมวดหมู่
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">หมวดหมู่ทั้งหมด</CardTitle>
              <Database className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-300">{categories.length}</div>
              <p className="text-xs text-blue-400/70">หมวดหมู่ในระบบ</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">เปิดใช้งาน</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{activeCategories.length}</div>
              <p className="text-xs text-blue-400/70">หมวดหมู่ที่ใช้งาน</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-500/30 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">ปิดใช้งาน</CardTitle>
              <div className="h-4 w-4 bg-slate-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-400">{inactiveCategories.length}</div>
              <p className="text-xs text-blue-400/70">หมวดหมู่ที่ปิด</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100 flex items-center">
              <Database className="mr-2 h-5 w-5" />
              รายการหมวดหมู่ทั้งหมด ({totalItems} รายการ)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryFilters
              filters={filters}
              onUpdateFilter={updateFilter}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
            
            <div className="mt-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-blue-300 mt-2">กำลังโหลดข้อมูล...</p>
              </div>
            ) : paginatedItems.length === 0 ? (
              <div className="text-center py-8">
                <Database className="mx-auto h-12 w-12 text-blue-400/50" />
                <p className="text-blue-300 mt-2">
                  {hasActiveFilters ? "ไม่พบหมวดหมู่ที่ตรงกับเงื่อนไขการค้นหา" : "ยังไม่มีหมวดหมู่ในระบบ"}
                </p>
                {hasActiveFilters ? (
                  <Button onClick={clearFilters} variant="outline" className="mt-4">
                    ล้างตัวกรอง
                  </Button>
                ) : (
                  <Button onClick={handleAddCategory} variant="outline" className="mt-4">
                    เพิ่มหมวดหมู่แรก
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-500/30">
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">ชื่อหมวดหมู่</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">คำอธิบาย</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">จำนวนเรื่อง</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">สถานะ</th>
                      <th className="text-right py-3 px-4 text-blue-200 font-medium">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((category) => (
                      <tr key={category.id} className="border-b border-blue-500/20 hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-4">
                          <p className="text-blue-100 font-medium">{category.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-blue-300/80 text-sm max-w-xs truncate">{category.description}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-cyan-600/20 text-cyan-300 border-cyan-600/50">
                            {category.count} เรื่อง
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={category.active}
                              onCheckedChange={() => handleToggleStatus(category)}
                              disabled={actionLoading}
                              className="data-[state=checked]:bg-blue-600"
                            />
                            <Badge 
                              variant="outline" 
                              className={category.active 
                                ? "bg-green-600/20 text-green-300 border-green-600/50" 
                                : "bg-slate-600/20 text-slate-300 border-slate-600/50"
                              }
                            >
                              {category.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCategory(category)}
                              disabled={actionLoading}
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCategory(category)}
                              disabled={actionLoading}
                              className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>

            {/* Pagination */}
            {paginatedItems.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={goToPage}
                onNextPage={goToNextPage}
                onPrevPage={goToPrevPage}
                onFirstPage={goToFirstPage}
                onLastPage={goToLastPage}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
              />
            )}
          </CardContent>
        </Card>

        <CategoryFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          category={selectedCategory}
          onSubmit={handleSubmit}
          loading={actionLoading}
        />
      </div>
    </AdminLayout>
  )
}

export default Categories
