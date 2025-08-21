import type { Category } from '@/common/types/category.types'

// Mock data - ในอนาคตจะเปลี่ยนเป็น API call
let categories: Category[] = [
  {
    id: '1',
    name: 'ไฟฟ้าสาธารณะ',
    description: 'ปัญหาเกี่ยวกับไฟฟ้าสาธารณะ ไฟถนน ไฟฟ้าส่องสว่าง',
    count: 45,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'ถนน',
    description: 'ปัญหาเกี่ยวกับถนน หลุมบ่อ รถขยะ',
    count: 38,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'ขยะสิ่งปฏิกูล',
    description: 'ปัญหาเกี่ยวกับขยะ การเก็บขยะ การจัดการขยะ',
    count: 32,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'ท่อระบายน้ำ',
    description: 'ปัญหาเกี่ยวกับท่อระบายน้ำ น้ำท่วม การระบายน้ำ',
    count: 28,
    active: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'อื่นๆ',
    description: 'ปัญหาอื่นๆ ที่ไม่เข้าข่ายหมวดหมู่ข้างต้น',
    count: 18,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

export type CreateCategoryPayload = {
  name: string
  description: string
}

export type UpdateCategoryPayload = {
  id: string
  name: string
  description: string
}

export type ToggleCategoryStatusPayload = {
  id: string
  active: boolean
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return [...categories]
}

export async function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const newCategory: Category = {
    id: Date.now().toString(),
    name: payload.name,
    description: payload.description,
    count: 0,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  categories.push(newCategory)
  return newCategory
}

export async function updateCategory(payload: UpdateCategoryPayload): Promise<Category> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const index = categories.findIndex(c => c.id === payload.id)
  if (index === -1) throw new Error('Category not found')
  
  categories[index] = { 
    ...categories[index], 
    name: payload.name,
    description: payload.description,
    updatedAt: new Date().toISOString()
  }
  return categories[index]
}

export async function toggleCategoryStatus(payload: ToggleCategoryStatusPayload): Promise<Category> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const index = categories.findIndex(c => c.id === payload.id)
  if (index === -1) throw new Error('Category not found')
  
  categories[index] = { 
    ...categories[index], 
    active: payload.active,
    updatedAt: new Date().toISOString()
  }
  return categories[index]
}

export async function deleteCategory(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const index = categories.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Category not found')
  
  categories.splice(index, 1)
}
