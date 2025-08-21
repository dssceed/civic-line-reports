import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { Category } from "@/common/types/category.types"
import type { CreateCategoryPayload, UpdateCategoryPayload } from "@/domains/categories/services/category.service"

interface CategoryFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  onSubmit: (payload: CreateCategoryPayload | UpdateCategoryPayload) => Promise<void>
  loading?: boolean
}

export function CategoryFormDialog({ open, onOpenChange, category, onSubmit, loading }: CategoryFormDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const isEdit = !!category

  useEffect(() => {
    if (category) {
      setName(category.name)
      setDescription(category.description)
    } else {
      setName("")
      setDescription("")
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      return
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
    }

    if (isEdit && category) {
      await onSubmit({ id: category.id, ...payload } as UpdateCategoryPayload)
    } else {
      await onSubmit(payload as CreateCategoryPayload)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-100">
            {isEdit ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-blue-200">ชื่อหมวดหมู่</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรอกชื่อหมวดหมู่"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-blue-200">คำอธิบาย</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="กรอกคำอธิบายหมวดหมู่"
              className="mt-1"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? "กำลังบันทึก..." : (isEdit ? "บันทึกการแก้ไข" : "เพิ่มหมวดหมู่")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
