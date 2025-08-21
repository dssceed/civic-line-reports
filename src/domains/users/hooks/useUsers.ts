import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/hooks/use-toast'
import { getUsers, createUser, updateUser, deleteUser, type CreateUserPayload, type UpdateUserPayload } from '@/domains/users/services/user.service'
import type { User } from '@/common/types/auth.types'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  const addUser = useCallback(async (payload: CreateUserPayload) => {
    try {
      const newUser = await createUser(payload)
      setUsers(prev => [...prev, newUser])
      toast({
        title: "เพิ่มผู้ใช้สำเร็จ",
        description: "เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว",
        className: "bg-green-600 text-white border-green-400",
      })
      return newUser
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเพิ่มผู้ใช้ได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  const editUser = useCallback(async (payload: UpdateUserPayload) => {
    try {
      const updatedUser = await updateUser(payload)
      setUsers(prev => prev.map(user => user.id === payload.id ? updatedUser : user))
      toast({
        title: "แก้ไขผู้ใช้สำเร็จ",
        description: "แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว",
        className: "bg-green-600 text-white border-green-400",
      })
      return updatedUser
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถแก้ไขผู้ใช้ได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  const removeUser = useCallback(async (id: string) => {
    try {
      await deleteUser(id)
      setUsers(prev => prev.filter(user => user.id !== id))
      toast({
        title: "ลบผู้ใช้สำเร็จ",
        description: "ลบผู้ใช้เรียบร้อยแล้ว",
        className: "bg-green-600 text-white border-green-400",
      })
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบผู้ใช้ได้",
        variant: "destructive",
      })
      throw error
    }
  }, [toast])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return {
    users,
    loading,
    addUser,
    editUser,
    removeUser,
    refetch: fetchUsers,
  }
}
