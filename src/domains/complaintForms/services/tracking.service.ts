import type { TrackingStatus } from '../types/tracking.types';

// Mock tracking data
const mockTrackingData: Record<string, TrackingStatus> = {
  "REF-1703123456-ABC123DEF": {
    id: "track-001",
    referenceId: "REF-1703123456-ABC123DEF",
    title: "แจ้งปัญหาไฟส่องสว่างไม่ทำงาน",
    category: "ไฟฟ้าสาธารณะ",
    status: "in_progress",
    submittedAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:15:00Z",
    estimatedCompletion: "2024-01-25",
    description: "ไฟส่องสว่างบริเวณถนนสุขุมวิท ระหว่างซอย 1-2 ไม่ทำงานมา 3 วันแล้ว",
    location: "ถนนสุขุมวิท ซอย 1-2",
    priority: "medium",
    assignedTo: "ทีมไฟฟ้าสาธารณะ",
    notes: [
      "ได้รับแจ้งปัญหาเมื่อวันที่ 15 มกราคม 2024",
      "ส่งทีมตรวจสอบเมื่อวันที่ 16 มกราคม 2024",
      "พบปัญหาเป็นสาเหตุจากหม้อแปลงไฟฟ้าเสียหาย",
      "สั่งซื้ออุปกรณ์ใหม่แล้ว คาดว่าจะติดตั้งได้ภายในวันที่ 25 มกราคม 2024"
    ]
  },
  "REF-1702987654-XYZ789GHI": {
    id: "track-002",
    referenceId: "REF-1702987654-XYZ789GHI",
    title: "แจ้งปัญหาหลุมบ่อบนถนน",
    category: "ถนน",
    status: "completed",
    submittedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
    estimatedCompletion: "2024-01-20",
    description: "มีหลุมบ่อขนาดใหญ่บนถนนรัชดาภิเษก ใกล้กับป้ายรถเมล์",
    location: "ถนนรัชดาภิเษก ใกล้ป้ายรถเมล์",
    priority: "high",
    assignedTo: "ทีมซ่อมแซมถนน",
    notes: [
      "ได้รับแจ้งปัญหาเมื่อวันที่ 10 มกราคม 2024",
      "ส่งทีมตรวจสอบเมื่อวันที่ 11 มกราคม 2024",
      "เริ่มดำเนินการซ่อมแซมเมื่อวันที่ 12 มกราคม 2024",
      "เสร็จสิ้นการซ่อมแซมเมื่อวันที่ 18 มกราคม 2024",
      "ตรวจสอบคุณภาพงานเรียบร้อยแล้ว"
    ]
  },
  "REF-1702854321-DEF456JKL": {
    id: "track-003",
    referenceId: "REF-1702854321-DEF456JKL",
    title: "แจ้งปัญหาขยะไม่ถูกเก็บ",
    category: "ขยะ",
    status: "pending",
    submittedAt: "2024-01-08T14:20:00Z",
    updatedAt: "2024-01-08T14:20:00Z",
    description: "ขยะในถังขยะไม่ถูกเก็บมา 2 วันแล้ว ทำให้มีกลิ่นเหม็น",
    location: "ซอยลาดพร้าว 42",
    priority: "medium",
    notes: [
      "ได้รับแจ้งปัญหาเมื่อวันที่ 8 มกราคม 2024",
      "กำลังจัดสรรทีมเก็บขยะ"
    ]
  },
  "REF-1702721098-MNO321PQR": {
    id: "track-004",
    referenceId: "REF-1702721098-MNO321PQR",
    title: "แจ้งปัญหาน้ำท่วมขัง",
    category: "น้ำท่วม",
    status: "in_progress",
    submittedAt: "2024-01-05T11:45:00Z",
    updatedAt: "2024-01-19T10:20:00Z",
    estimatedCompletion: "2024-01-30",
    description: "มีน้ำท่วมขังบนถนนหลังฝนตก ทำให้รถผ่านได้ยาก",
    location: "ถนนวิภาวดีรังสิต ใกล้กับห้างสรรพสินค้า",
    priority: "urgent",
    assignedTo: "ทีมระบายน้ำ",
    notes: [
      "ได้รับแจ้งปัญหาเมื่อวันที่ 5 มกราคม 2024",
      "ส่งทีมตรวจสอบเมื่อวันที่ 6 มกราคม 2024",
      "พบปัญหาเป็นท่อระบายน้ำอุดตัน",
      "เริ่มดำเนินการขุดลอกท่อระบายน้ำ",
      "คาดว่าจะเสร็จสิ้นภายในวันที่ 30 มกราคม 2024"
    ]
  }
};

export class TrackingService {
  // Search tracking by reference ID
  static async searchTracking(referenceId: string): Promise<TrackingStatus | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const normalizedId = referenceId.toUpperCase().trim();
    const tracking = mockTrackingData[normalizedId];
    
    return tracking || null;
  }

  // Get tracking statistics
  static async getTrackingStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    rejected: number;
    averageCompletionTime: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allTrackings = Object.values(mockTrackingData);
    const total = allTrackings.length;
    const pending = allTrackings.filter(t => t.status === 'pending').length;
    const inProgress = allTrackings.filter(t => t.status === 'in_progress').length;
    const completed = allTrackings.filter(t => t.status === 'completed').length;
    const rejected = allTrackings.filter(t => t.status === 'rejected').length;
    
    // Calculate average completion time (mock data)
    const averageCompletionTime = 3.2; // days
    
    return {
      total,
      pending,
      inProgress,
      completed,
      rejected,
      averageCompletionTime
    };
  }

  // Get recent trackings
  static async getRecentTrackings(limit: number = 5): Promise<TrackingStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const allTrackings = Object.values(mockTrackingData);
    return allTrackings
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }

  // Get trackings by status
  static async getTrackingsByStatus(status: string): Promise<TrackingStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allTrackings = Object.values(mockTrackingData);
    return allTrackings.filter(t => t.status === status);
  }

  // Get trackings by category
  static async getTrackingsByCategory(category: string): Promise<TrackingStatus[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allTrackings = Object.values(mockTrackingData);
    return allTrackings.filter(t => t.category === category);
  }

  // Update tracking status (for admin use)
  static async updateTrackingStatus(
    referenceId: string, 
    status: string, 
    notes?: string[]
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const tracking = mockTrackingData[referenceId];
    if (!tracking) return false;
    
    // Update tracking data
    tracking.status = status as any;
    tracking.updatedAt = new Date().toISOString();
    if (notes) {
      tracking.notes = [...(tracking.notes || []), ...notes];
    }
    
    return true;
  }

  // Generate tracking reference ID
  static generateReferenceId(): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `REF-${timestamp}-${randomStr}`;
  }

  // Validate reference ID format
  static isValidReferenceId(referenceId: string): boolean {
    const pattern = /^REF-\d{13}-[A-Z0-9]{9}$/;
    return pattern.test(referenceId.toUpperCase());
  }
}
