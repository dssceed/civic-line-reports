
import { Complaint, ComplaintFilters } from '@/common/types';

export class ComplaintService {
  // Mock data - replace with real API calls
  private static mockComplaints: Complaint[] = [
    {
      id: "C2024001",
      reporterName: "นาย ประชา ชาวบ้าน กองอำนวยการสำหรับหน่วยงานไฟฟ้าแห่งประเทศไทย",
      reporterLine: "pracha_citizen",
      category: "ไฟฟ้าสาธารณะ",
      description: "ไฟถนนดับในซอย 15 ทำให้เดินทางกลับบ้านไม่ปลอดภัย",
      location: "ซอย 15 ถนนสุขุมวิท",
      coordinates: { lat: 13.7563, lng: 100.5018 },
      status: "ใหม่",
      priority: "ปกติ",
      dateReported: "2024-05-31 14:30",
      assignedTo: "",
      images: ["image1.jpg", "image2.jpg"]
    },
    {
      id: "C2024002",
      reporterName: "นาง สุดา ผู้ใจดี",
      reporterLine: "suda_kind",
      category: "ถนน",
      description: "หลุมบ่อขนาดใหญ่บนถนนสายหลัก ทำให้รถเสียหายได้",
      location: "ถนนพระราม 4 กม.12",
      coordinates: { lat: 13.7563, lng: 100.5018 },
      status: "กำลังดำเนินการ",
      priority: "ด่วน",
      dateReported: "2024-05-30 09:15",
      assignedTo: "นาย วิศวกร ช่างซ่อม",
      images: ["road1.jpg"]
    },
    {
      id: "C2024003",
      reporterName: "นาย สะอาด รักเมือง",
      reporterLine: "clean_city",
      category: "ขยะ",
      description: "รถขยะไม่มาเก็บตามกำหนด 3 วันแล้ว ขยะเน่าเหม็น",
      location: "หมู่บ้านสีเขียว ซอย 8",
      coordinates: { lat: 13.7563, lng: 100.5018 },
      status: "รอตรวจสอบ",
      priority: "ปกติ",
      dateReported: "2024-05-30 16:45",
      assignedTo: "กองสาธารณสุข",
      images: []
    }
  ];

  static getComplaints(): Complaint[] {
    return this.mockComplaints;
  }

  static filterComplaints(complaints: Complaint[], filters: ComplaintFilters): Complaint[] {
    return complaints.filter(complaint => {
      const matchesSearch = complaint.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           complaint.reporterName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           complaint.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.statusFilter === "all" || complaint.status === filters.statusFilter;
      const matchesCategory = filters.categoryFilter === "all" || complaint.category === filters.categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }

  static getStatusColor(status: string): string {
    switch (status) {
      case "ใหม่": return "bg-blue-500/20 text-blue-300 border border-blue-500/50";
      case "กำลังดำเนินการ": return "bg-purple-600/20 text-purple-300 border border-purple-600/50";
      case "รอตรวจสอบ": return "bg-cyan-600/20 text-cyan-300 border border-cyan-600/50";
      case "เสร็จสิ้น": return "bg-green-600/20 text-green-300 border border-green-600/50";
      default: return "bg-slate-700/20 text-slate-400 border border-slate-700/50";
    }
  }

  static getPriorityColor(priority: string): string {
    switch (priority) {
      case "ด่วน": return "bg-red-600/20 text-red-300 border border-red-600/50";
      case "ปกติ": return "bg-slate-700/20 text-slate-400 border border-slate-700/50";
      default: return "bg-slate-700/20 text-slate-400 border border-slate-700/50";
    }
  }
}
