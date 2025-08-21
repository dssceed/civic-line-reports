import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  toggleCategoryStatus, 
  deleteCategory,
  type CreateCategoryPayload, 
  type UpdateCategoryPayload,
  type ToggleCategoryStatusPayload
} from '@/domains/categories/services/category.service'
import type { Category } from '@/common/types/category.types'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลหมวดหมู่ได้",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const addCategory = useCallback(async (payload: CreateCategoryPayload) => {
    try {
      const newCategory = await createCategory(payload)
      setCategories(prev => [...prev, newCategory])
      toast({
        title: "เพิ่มหมวดหมู่สำเร็จ",
        description: "เพิ่มหมวดหมู่ใหม่เรียบร้อยแล้ว",
        className: "bg-green-600 text-white border-green-400",
      })
      return newCategory
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเพิ่มหมวดหมู่ได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  const editCategory = useCallback(async (payload: UpdateCategoryPayload) => {
    try {
      const updatedCategory = await updateCategory(payload)
      setCategories(prev => prev.map(category => category.id === payload.id ? updatedCategory : category))
      toast({
        title: "แก้ไขหมวดหมู่สำเร็จ",
        description: "แก้ไขข้อมูลหมวดหมู่เรียบร้อยแล้ว",
        className: "bg-green-600 text-white border-green-400",
      })
      return updatedCategory
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถแก้ไขหมวดหมู่ได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  const toggleStatus = useCallback(async (payload: ToggleCategoryStatusPayload) => {
    try {
      const updatedCategory = await toggleCategoryStatus(payload)
      setCategories(prev => prev.map(category => category.id === payload.id ? updatedCategory : category))
      toast({
        title: `${payload.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}สำเร็จ`,
        description: `${payload.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}หมวดหมู่เรียบร้อยแล้ว`,
        className: "bg-green-600 text-white border-green-400",
      })
      return updatedCategory
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเปลี่ยนสถานะได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  const removeCategory = useCallback(async (id: string) => {
    try {
      await deleteCategory(id)
      setCategories(prev => prev.filter(category => category.id !== id))
      toast({
        title: "ลบหมวดหมู่สำเร็จ",
        description: "ลบหมวดหมู่เรียบร้อยแล้ว",
        className: "bg-green-600 text-white border-green-400",
      })
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบหมวดหมู่ได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    loading,
    addCategory,
    editCategory,
    toggleStatus,
    removeCategory,
    refetch: fetchCategories,
  }
}
