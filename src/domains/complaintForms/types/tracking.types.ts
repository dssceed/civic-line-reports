export interface TrackingStatus {
  id: string;
  referenceId: string;
  title: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  estimatedCompletion?: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  notes?: string[];
}

export interface TrackingStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  rejected: number;
  averageCompletionTime: number;
}

export interface TrackingSearchResult {
  success: boolean;
  data?: TrackingStatus;
  message?: string;
}

export interface TrackingUpdateRequest {
  referenceId: string;
  status: string;
  notes?: string[];
  assignedTo?: string;
  estimatedCompletion?: string;
}

export interface TrackingUpdateResponse {
  success: boolean;
  message: string;
  updatedAt: string;
}

export interface TrackingFilters {
  status?: string;
  category?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface TrackingListResponse {
  trackings: TrackingStatus[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
