// src/common/types/auth.types.ts
export type Role = 'admin' | 'officer' | 'analyst' | 'viewer'

export type Permission =
  | 'complaints.read'
  | 'complaints.create'
  | 'complaints.update'
  | 'complaints.assign'
  | 'complaints.close'
  | 'complaints.delete'
  | 'reports.view'
  | 'reports.export'
  | 'users.read'
  | 'users.manage'
  | 'settings.manage'

export type User = {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  roles: Role[]
  permissions: Permission[]
}