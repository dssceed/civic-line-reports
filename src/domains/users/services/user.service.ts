import type { User, Role, Permission } from '@/common/types/auth.types'

// Mock data - ในอนาคตจะเปลี่ยนเป็น API call
let users: User[] = [
  {
    id: '1',
    name: 'ผู้ดูแลระบบ',
    email: 'admin@municipality.gov',
    status: 'active',
    roles: ['admin'],
    permissions: ['users.manage', 'complaints.read', 'complaints.create', 'complaints.update', 'complaints.delete', 'reports.view', 'reports.export', 'settings.manage']
  },
  {
    id: '2', 
    name: 'เจ้าหน้าที่ 1',
    email: 'officer1@municipality.gov',
    status: 'active',
    roles: ['officer'],
    permissions: ['complaints.read', 'complaints.create', 'complaints.update', 'complaints.assign', 'complaints.close']
  },
  {
    id: '3',
    name: 'นักวิเคราะห์',
    email: 'analyst@municipality.gov',
    status: 'inactive',
    roles: ['analyst'],
    permissions: ['reports.view', 'reports.export', 'complaints.read']
  }
]

export type CreateUserPayload = {
  name: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  roles: string[]
  permissions: string[]
}

export type UpdateUserPayload = {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'suspended'
  roles: string[]
  permissions: string[]
}

export async function getUsers(): Promise<User[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return [...users]
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const newUser: User = {
    id: Date.now().toString(),
    name: payload.name,
    email: payload.email,
    status: payload.status,
    roles: payload.roles as Role[],
    permissions: payload.permissions as Permission[]
  }
  users.push(newUser)
  return newUser
}

export async function updateUser(payload: UpdateUserPayload): Promise<User> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const index = users.findIndex(u => u.id === payload.id)
  if (index === -1) throw new Error('User not found')
  
  users[index] = { 
    ...users[index], 
    name: payload.name,
    email: payload.email,
    status: payload.status,
    roles: payload.roles as Role[],
    permissions: payload.permissions as Permission[]
  }
  return users[index]
}

export async function deleteUser(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('User not found')
  
  users.splice(index, 1)
}
