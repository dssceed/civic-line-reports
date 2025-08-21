
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { ComplaintFilters } from "@/common/types";

interface ComplaintFiltersProps {
  filters: ComplaintFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export const ComplaintFiltersComponent = ({
  filters,
  onSearchChange,
  onStatusChange,
  onCategoryChange
}: ComplaintFiltersProps) => {
  return (
    <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
      <CardHeader>
        <CardTitle className="text-blue-100">ค้นหาและกรองข้อมูล</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
            <Input
              placeholder="ค้นหาเลขที่, ชื่อผู้แจ้ง, หรือรายละเอียด"
              value={filters.searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-700/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60"
            />
          </div>
          
          <Select value={filters.statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-blue-100">
              <SelectValue placeholder="สถานะ" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-blue-500/30">
              <SelectItem value="all">สถานะทั้งหมด</SelectItem>
              <SelectItem value="ใหม่">ใหม่</SelectItem>
              <SelectItem value="รอตรวจสอบ">รอตรวจสอบ</SelectItem>
              <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
              <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-blue-100">
              <SelectValue placeholder="หมวดหมู่" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-blue-500/30">
              <SelectItem value="all">หมวดหมู่ทั้งหมด</SelectItem>
              <SelectItem value="ไฟฟ้าสาธารณะ">ไฟฟ้าสาธารณะ</SelectItem>
              <SelectItem value="ถนน">ถนน</SelectItem>
              <SelectItem value="ขยะ">ขยะ</SelectItem>
              <SelectItem value="ท่อระบายน้ำ">ท่อระบายน้ำ</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full bg-slate-700/50 border-blue-500/30 text-blue-100 hover:bg-slate-700/70">
            <Filter className="mr-2 h-4 w-4" />
            ตัวกรองเพิ่มเติม
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
