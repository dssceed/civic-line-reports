import { ActivityLog, CreateActivityLogRequest, ActivityLogFilters, ActivityAction } from "@/common/types";

// Mock activity log data
const mockActivityLogs: ActivityLog[] = [
  {
    id: "act-001",
    complaintId: "C2024001",
    action: "created",
    performedBy: "user123",
    performedAt: "2024-05-31T10:30:00Z",
    description: "สร้างเรื่องร้องเรียนใหม่",
    details: {
      notes: "ผู้ใช้แจ้งปัญหาไฟถนนดับในซอย 15"
    }
  },
  {
    id: "act-002",
    complaintId: "C2024001",
    action: "status_changed",
    performedBy: "admin001",
    performedAt: "2024-05-31T11:15:00Z",
    description: "เปลี่ยนสถานะจาก 'ใหม่' เป็น 'รอตรวจสอบ'",
    details: {
      oldValue: "ใหม่",
      newValue: "รอตรวจสอบ",
      reason: "เริ่มดำเนินการตรวจสอบ"
    }
  },
  {
    id: "act-003",
    complaintId: "C2024001",
    action: "assigned",
    performedBy: "admin001",
    performedAt: "2024-05-31T14:20:00Z",
    description: "มอบหมายให้ทีมไฟฟ้าสาธารณะ",
    details: {
      newValue: "ทีมไฟฟ้าสาธารณะ",
      estimatedCompletion: "2024-06-03"
    }
  },
  {
    id: "act-004",
    complaintId: "C2024001",
    action: "note_added",
    performedBy: "tech001",
    performedAt: "2024-06-01T09:30:00Z",
    description: "เพิ่มบันทึกการตรวจสอบ",
    details: {
      notes: "ตรวจสอบแล้วพบว่าเป็นปัญหาไฟดับจากหม้อแปลงไฟฟ้า กำลังดำเนินการซ่อมแซม"
    }
  },
  {
    id: "act-005",
    complaintId: "C2024001",
    action: "status_changed",
    performedBy: "tech001",
    performedAt: "2024-06-01T16:45:00Z",
    description: "เปลี่ยนสถานะเป็น 'กำลังดำเนินการ'",
    details: {
      oldValue: "รอตรวจสอบ",
      newValue: "กำลังดำเนินการ",
      reason: "เริ่มดำเนินการซ่อมแซม"
    }
  },
  {
    id: "act-006",
    complaintId: "C2024002",
    action: "created",
    performedBy: "user456",
    performedAt: "2024-05-30T08:15:00Z",
    description: "สร้างเรื่องร้องเรียนใหม่",
    details: {
      notes: "ผู้ใช้แจ้งปัญหาหลุมบ่อบนถนนสายหลัก"
    }
  },
  {
    id: "act-007",
    complaintId: "C2024002",
    action: "priority_changed",
    performedBy: "admin001",
    performedAt: "2024-05-30T09:00:00Z",
    description: "เปลี่ยนความสำคัญเป็น 'ด่วน'",
    details: {
      oldValue: "ปกติ",
      newValue: "ด่วน",
      reason: "เป็นปัญหาความปลอดภัย"
    }
  },
  {
    id: "act-008",
    complaintId: "C2024002",
    action: "assigned",
    performedBy: "admin001",
    performedAt: "2024-05-30T09:30:00Z",
    description: "มอบหมายให้ทีมซ่อมแซมถนน",
    details: {
      newValue: "ทีมซ่อมแซมถนน",
      estimatedCompletion: "2024-06-02"
    }
  },
  {
    id: "act-009",
    complaintId: "C2024002",
    action: "status_changed",
    performedBy: "road001",
    performedAt: "2024-06-01T10:00:00Z",
    description: "เปลี่ยนสถานะเป็น 'กำลังดำเนินการ'",
    details: {
      oldValue: "รอตรวจสอบ",
      newValue: "กำลังดำเนินการ",
      reason: "เริ่มดำเนินการซ่อมแซม"
    }
  },
  {
    id: "act-010",
    complaintId: "C2024002",
    action: "completed",
    performedBy: "road001",
    performedAt: "2024-06-02T15:30:00Z",
    description: "เสร็จสิ้นการดำเนินการ",
    details: {
      notes: "ซ่อมแซมหลุมบ่อเรียบร้อยแล้ว ตรวจสอบคุณภาพงานผ่าน"
    }
  }
];

export class ActivityLogService {
  // Get activity logs for a specific complaint
  static async getActivityLogs(complaintId: string): Promise<ActivityLog[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockActivityLogs
      .filter(log => log.complaintId === complaintId)
      .sort((a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime());
  }

  // Create new activity log
  static async createActivityLog(request: CreateActivityLogRequest): Promise<ActivityLog> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      complaintId: request.complaintId,
      action: request.action,
      performedBy: request.performedBy,
      performedAt: new Date().toISOString(),
      description: request.description,
      details: request.details,
      attachments: request.attachments
    };
    
    mockActivityLogs.push(newLog);
    return newLog;
  }

  // Get activity logs with filters
  static async getActivityLogsWithFilters(filters: ActivityLogFilters): Promise<ActivityLog[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let filteredLogs = [...mockActivityLogs];
    
    if (filters.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action);
    }
    
    if (filters.performedBy) {
      filteredLogs = filteredLogs.filter(log => log.performedBy === filters.performedBy);
    }
    
    if (filters.dateFrom) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.performedAt) >= new Date(filters.dateFrom!)
      );
    }
    
    if (filters.dateTo) {
      filteredLogs = filteredLogs.filter(log => 
        new Date(log.performedAt) <= new Date(filters.dateTo!)
      );
    }
    
    return filteredLogs.sort((a, b) => 
      new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
    );
  }

  // Get recent activity logs
  static async getRecentActivityLogs(limit: number = 10): Promise<ActivityLog[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return mockActivityLogs
      .sort((a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime())
      .slice(0, limit);
  }

  // Get activity statistics
  static async getActivityStats(): Promise<{
    totalActions: number;
    actionsByType: Record<ActivityAction, number>;
    recentActivity: number;
    mostActiveUser: string;
  }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const totalActions = mockActivityLogs.length;
    const actionsByType = mockActivityLogs.reduce((acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1;
      return acc;
    }, {} as Record<ActivityAction, number>);
    
    const recentActivity = mockActivityLogs.filter(log => {
      const logDate = new Date(log.performedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    }).length;
    
    const userActivity = mockActivityLogs.reduce((acc, log) => {
      acc[log.performedBy] = (acc[log.performedBy] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostActiveUser = Object.entries(userActivity)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || "ไม่มีข้อมูล";
    
    return {
      totalActions,
      actionsByType,
      recentActivity,
      mostActiveUser
    };
  }

  // Helper method to get action display name
  static getActionDisplayName(action: ActivityAction): string {
    const actionNames: Record<ActivityAction, string> = {
      created: "สร้างเรื่อง",
      status_changed: "เปลี่ยนสถานะ",
      assigned: "มอบหมายงาน",
      priority_changed: "เปลี่ยนความสำคัญ",
      note_added: "เพิ่มบันทึก",
      image_added: "เพิ่มรูปภาพ",
      location_updated: "อัปเดตตำแหน่ง",
      completed: "เสร็จสิ้น",
      reopened: "เปิดใหม่"
    };
    
    return actionNames[action] || action;
  }

  // Helper method to get action icon
  static getActionIcon(action: ActivityAction): string {
    const actionIcons: Record<ActivityAction, string> = {
      created: "📝",
      status_changed: "🔄",
      assigned: "👤",
      priority_changed: "⚠️",
      note_added: "📝",
      image_added: "📷",
      location_updated: "📍",
      completed: "✅",
      reopened: "🔄"
    };
    
    return actionIcons[action] || "📋";
  }
}
