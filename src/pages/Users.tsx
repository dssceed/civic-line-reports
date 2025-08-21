import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { UserFormDialog } from "@/domains/users/components/UserFormDialog"
import { UserFilters } from "@/domains/users/components/UserFilters"
import { useUsers } from "@/domains/users/hooks/useUsers"
import { useUserFilters } from "@/domains/users/hooks/useUserFilters"
import { usePagination } from "@/domains/users/hooks/usePagination"
import { Pagination } from "@/domains/users/components/Pagination"
import { Plus, Edit, Trash2, Users as UserIcon } from "lucide-react"
import type { User } from "@/common/types/auth.types"

const Users = () => {
  const { users, loading, addUser, editUser, removeUser } = useUsers()
  const { filters, filteredUsers, updateFilter, clearFilters, hasActiveFilters } = useUserFilters(users)
  
  // Reset pagination when filters change
  useEffect(() => {
    resetPagination()
  }, [filters])
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
  } = usePagination(filteredUsers, 2) // 5 items per page
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  const handleAddUser = () => {
    setSelectedUser(null)
    setDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setDialogOpen(true)
  }

  const handleDeleteUser = async (user: User) => {
    if (confirm(`คุณต้องการลบผู้ใช้ "${user.name}" ใช่หรือไม่?`)) {
      setActionLoading(true)
      try {
        await removeUser(user.id)
      } finally {
        setActionLoading(false)
      }
    }
  }

  const handleSubmit = async (payload: any) => {
    setActionLoading(true)
    try {
      if (selectedUser) {
        await editUser(payload)
      } else {
        await addUser(payload)
      }
    } finally {
      setActionLoading(false)
    }
  }

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: 'ผู้ดูแลระบบ',
      officer: 'เจ้าหน้าที่',
      analyst: 'นักวิเคราะห์',
      viewer: 'ผู้ดูข้อมูล'
    }
    return roleMap[role] || role
  }

  const getRoleColor = (role: string) => {
    const colorMap: Record<string, string> = {
      admin: 'bg-red-600/20 text-red-300 border-red-600/50',
      officer: 'bg-blue-600/20 text-blue-300 border-blue-600/50',
      analyst: 'bg-purple-600/20 text-purple-300 border-purple-600/50',
      viewer: 'bg-slate-600/20 text-slate-300 border-slate-600/50'
    }
    return colorMap[role] || 'bg-slate-600/20 text-slate-300 border-slate-600/50'
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      active: 'bg-green-600/20 text-green-300 border-green-600/50',
      inactive: 'bg-slate-600/20 text-slate-300 border-slate-600/50',
      suspended: 'bg-red-600/20 text-red-300 border-red-600/50'
    }
    return colorMap[status] || 'bg-slate-600/20 text-slate-300 border-slate-600/50'
  }

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      active: 'ใช้งาน',
      inactive: 'ไม่ใช้งาน',
      suspended: 'ระงับการใช้งาน'
    }
    return labelMap[status] || status
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">จัดการผู้ใช้</h1>
            <p className="text-blue-300/80">เพิ่ม แก้ไข และลบผู้ใช้ในระบบ</p>
          </div>
          <Button onClick={handleAddUser} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มผู้ใช้
          </Button>
        </div>

        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100 flex items-center">
              <UserIcon className="mr-2 h-5 w-5" />
              รายชื่อผู้ใช้ทั้งหมด ({totalItems} คน)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserFilters
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
                <UserIcon className="mx-auto h-12 w-12 text-blue-400/50" />
                <p className="text-blue-300 mt-2">
                  {hasActiveFilters ? "ไม่พบผู้ใช้ที่ตรงกับเงื่อนไขการค้นหา" : "ยังไม่มีผู้ใช้ในระบบ"}
                </p>
                {hasActiveFilters ? (
                  <Button onClick={clearFilters} variant="outline" className="mt-4">
                    ล้างตัวกรอง
                  </Button>
                ) : (
                  <Button onClick={handleAddUser} variant="outline" className="mt-4">
                    เพิ่มผู้ใช้คนแรก
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-500/30">
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">ชื่อผู้ใช้</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">อีเมล</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">สถานะ</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">บทบาท</th>
                      <th className="text-left py-3 px-4 text-blue-200 font-medium">สิทธิ์</th>
                      <th className="text-right py-3 px-4 text-blue-200 font-medium">การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.map((user) => (
                      <tr key={user.id} className="border-b border-blue-500/20 hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-blue-100 font-medium">{user.name}</p>
                            <p className="text-blue-400/70 text-sm">ID: {user.id}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-blue-200">{user.email}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {getStatusLabel(user.status)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <Badge key={role} variant="outline" className={getRoleColor(role)}>
                                {getRoleLabel(role)}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {user.permissions.slice(0, 3).map((permission) => (
                              <Badge key={permission} variant="outline" className="bg-green-600/20 text-green-300 border-green-600/50 text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {user.permissions.length > 3 && (
                              <Badge variant="outline" className="bg-slate-600/20 text-slate-300 border-slate-600/50 text-xs">
                                +{user.permissions.length - 3} อื่นๆ
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              disabled={actionLoading}
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user)}
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

        <UserFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          user={selectedUser}
          onSubmit={handleSubmit}
          loading={actionLoading}
        />
      </div>
    </AdminLayout>
  )
}

export default Users
