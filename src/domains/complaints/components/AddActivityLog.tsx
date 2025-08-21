import { useState } from "react";
import { ActivityAction, CreateActivityLogRequest } from "@/common/types";
import { ActivityLogService } from "../services/activityLog.service";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AddActivityLogProps {
  complaintId: string;
  onActivityAdded: () => void;
}

export const AddActivityLog = ({ complaintId, onActivityAdded }: AddActivityLogProps) => {
  const { t } = useTranslation('complaints');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    action: "" as ActivityAction,
    description: "",
    notes: "",
    reason: "",
    estimatedCompletion: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const request: CreateActivityLogRequest = {
        complaintId,
        action: formData.action,
        performedBy: "admin001", // TODO: Get from auth context
        description: formData.description,
        details: {
          notes: formData.notes || undefined,
          reason: formData.reason || undefined,
          estimatedCompletion: formData.estimatedCompletion || undefined
        }
      };

      await ActivityLogService.createActivityLog(request);
      
      // Reset form
      setFormData({
        action: "" as ActivityAction,
        description: "",
        notes: "",
        reason: "",
        estimatedCompletion: ""
      });
      
      setOpen(false);
      onActivityAdded();
    } catch (error) {
      console.error("Error creating activity log:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionOptions = () => [
    { value: "status_changed", label: "เปลี่ยนสถานะ" },
    { value: "assigned", label: "มอบหมายงาน" },
    { value: "priority_changed", label: "เปลี่ยนความสำคัญ" },
    { value: "note_added", label: "เพิ่มบันทึก" },
    { value: "completed", label: "เสร็จสิ้น" },
    { value: "reopened", label: "เปิดใหม่" }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มการดำเนินการ
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-blue-500/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-100">เพิ่มการดำเนินการ</DialogTitle>
          <DialogDescription className="text-blue-300/80">
            บันทึกการดำเนินการใหม่สำหรับเรื่องร้องเรียนนี้
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="action" className="text-blue-200">ประเภทการดำเนินการ</Label>
            <Select 
              value={formData.action} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, action: value as ActivityAction }))}
              required
            >
              <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-blue-100">
                <SelectValue placeholder="เลือกประเภทการดำเนินการ" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-500/30">
                {getActionOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-blue-200">คำอธิบาย</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="อธิบายการดำเนินการที่ทำ..."
              className="bg-slate-700/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
              required
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-blue-200">บันทึกเพิ่มเติม</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="บันทึกเพิ่มเติม (ไม่บังคับ)"
              className="bg-slate-700/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
          </div>

          <div>
            <Label htmlFor="reason" className="text-blue-200">เหตุผล</Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              placeholder="เหตุผลในการดำเนินการ (ไม่บังคับ)"
              className="bg-slate-700/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
          </div>

          <div>
            <Label htmlFor="estimatedCompletion" className="text-blue-200">คาดว่าจะเสร็จ</Label>
            <Input
              id="estimatedCompletion"
              type="date"
              value={formData.estimatedCompletion}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
              className="bg-slate-700/50 border-blue-500/30 text-blue-100"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-slate-700/50 border-blue-500/30 text-blue-100 hover:bg-slate-700/70"
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.action || !formData.description}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                "บันทึก"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
