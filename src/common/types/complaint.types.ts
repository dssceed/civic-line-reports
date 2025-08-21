
export interface Complaint {
  id: string;
  reporterName: string;
  reporterLine: string;
  category: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: ComplaintStatus;
  priority: ComplaintPriority;
  dateReported: string;
  assignedTo: string | null;
  images: string[];
  activityLogs?: ActivityLog[];
}

export type ComplaintStatus = "ใหม่" | "รอตรวจสอบ" | "กำลังดำเนินการ" | "เสร็จสิ้น";
export type ComplaintPriority = "ด่วน" | "ปกติ";
export type ComplaintCategory = "ไฟฟ้าสาธารณะ" | "ถนน" | "ขยะ" | "ท่อระบายน้ำ";

export interface ComplaintFilters {
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  complaintId: string;
  action: ActivityAction;
  performedBy: string;
  performedAt: string;
  description: string;
  details?: ActivityDetails;
  attachments?: string[];
}

export type ActivityAction = 
  | "created" 
  | "status_changed" 
  | "assigned" 
  | "priority_changed" 
  | "note_added" 
  | "image_added" 
  | "location_updated" 
  | "completed" 
  | "reopened";

export interface ActivityDetails {
  oldValue?: string;
  newValue?: string;
  reason?: string;
  estimatedCompletion?: string;
  notes?: string;
}

export interface CreateActivityLogRequest {
  complaintId: string;
  action: ActivityAction;
  performedBy: string;
  description: string;
  details?: ActivityDetails;
  attachments?: string[];
}

export interface ActivityLogFilters {
  action?: ActivityAction;
  performedBy?: string;
  dateFrom?: string;
  dateTo?: string;
}
