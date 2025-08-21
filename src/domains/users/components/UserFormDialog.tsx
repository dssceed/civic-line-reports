import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/common/types/auth.types"
import type { CreateUserPayload, UpdateUserPayload } from "@/domains/users/services/user.service"

interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
  onSubmit: (payload: CreateUserPayload | UpdateUserPayload) => Promise<void>
  loading?: boolean
}

const AVAILABLE_ROLES = [
  { id: 'admin', label: 'ผู้ดูแลระบบ' },
  { id: 'officer', label: 'เจ้าหน้าที่' },
  { id: 'analyst', label: 'นักวิเคราะห์' },
  { id: 'viewer', label: 'ผู้ดูข้อมูล' },
] as const

const AVAILABLE_PERMISSIONS = [
  { id: 'complaints.read', label: 'ดูข้อร้องเรียน' },
  { id: 'complaints.create', label: 'สร้างข้อร้องเรียน' },
  { id: 'complaints.update', label: 'แก้ไขข้อร้องเรียน' },
  { id: 'complaints.assign', label: 'มอบหมายข้อร้องเรียน' },
  { id: 'complaints.close', label: 'ปิดข้อร้องเรียน' },
  { id: 'complaints.delete', label: 'ลบข้อร้องเรียน' },
  { id: 'reports.view', label: 'ดูรายงาน' },
  { id: 'reports.export', label: 'ส่งออกรายงาน' },
  { id: 'users.read', label: 'ดูผู้ใช้' },
  { id: 'users.manage', label: 'จัดการผู้ใช้' },
  { id: 'settings.manage', label: 'จัดการตั้งค่า' },
] as const

export function UserFormDialog({ open, onOpenChange, user, onSubmit, loading }: UserFormDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<'active' | 'inactive' | 'suspended'>('active')
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const isEdit = !!user

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setStatus(user.status)
      setSelectedRoles(user.roles)
      setSelectedPermissions(user.permissions)
    } else {
      setName("")
      setEmail("")
      setStatus('active')
      setSelectedRoles([])
      setSelectedPermissions([])
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      return
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      status,
      roles: selectedRoles,
      permissions: selectedPermissions,
    }

    if (isEdit && user) {
      await onSubmit({ id: user.id, ...payload } as UpdateUserPayload)
    } else {
      await onSubmit(payload as CreateUserPayload)
    }

    onOpenChange(false)
  }

  const handleRoleChange = (roleId: string, checked: boolean) => {
    if (checked) {
      setSelectedRoles(prev => [...prev, roleId])
    } else {
      setSelectedRoles(prev => prev.filter(id => id !== roleId))
    }
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionId])
    } else {
      setSelectedPermissions(prev => prev.filter(id => id !== permissionId))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-100">
            {isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้ใหม่"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-blue-200">ชื่อผู้ใช้</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรอกชื่อผู้ใช้"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-blue-200">อีเมล</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมล"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-blue-200">สถานะ</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'suspended')}
              className="mt-1 w-full px-3 py-2 bg-slate-700 border border-blue-500/30 rounded-md text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">ใช้งาน</option>
              <option value="inactive">ไม่ใช้งาน</option>
              <option value="suspended">ระงับการใช้งาน</option>
            </select>
          </div>

          <div>
            <Label className="text-blue-200 mb-3 block">บทบาท (Roles)</Label>
            <div className="grid grid-cols-2 gap-3">
              {AVAILABLE_ROLES.map((role) => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={selectedRoles.includes(role.id)}
                    onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                  />
                  <Label htmlFor={`role-${role.id}`} className="text-sm text-blue-200">
                    {role.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-blue-200 mb-3 block">สิทธิ์ (Permissions)</Label>
            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
              {AVAILABLE_PERMISSIONS.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`permission-${permission.id}`}
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                  />
                  <Label htmlFor={`permission-${permission.id}`} className="text-sm text-blue-200">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {selectedRoles.length > 0 && (
            <div>
              <Label className="text-blue-200 mb-2 block">บทบาทที่เลือก:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedRoles.map((roleId) => {
                  const role = AVAILABLE_ROLES.find(r => r.id === roleId)
                  return (
                    <Badge key={roleId} variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-600/50">
                      {role?.label}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          {selectedPermissions.length > 0 && (
            <div>
              <Label className="text-blue-200 mb-2 block">สิทธิ์ที่เลือก:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedPermissions.map((permissionId) => {
                  const permission = AVAILABLE_PERMISSIONS.find(p => p.id === permissionId)
                  return (
                    <Badge key={permissionId} variant="outline" className="bg-green-600/20 text-green-300 border-green-600/50">
                      {permission?.label}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={loading || !name.trim() || !email.trim()}>
              {loading ? "กำลังบันทึก..." : (isEdit ? "บันทึกการแก้ไข" : "เพิ่มผู้ใช้")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
