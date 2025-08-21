export interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'email' | 'phone' | 'date' | 'file' | 'location';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fileTypes?: string[];
  maxFileSize?: number;
  multiple?: boolean;
  allowCurrentLocation?: boolean;
  showMap?: boolean;
  defaultLatitude?: number;
  defaultLongitude?: number;
}

export interface PublicFormData {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
  isActive: boolean;
  responses: number;
  createdAt: string;
  url: string;
}

export interface FormSubmission {
  formId: string;
  values: Record<string, any>;
  files?: Record<string, File[]>;
  location?: { lat: number; lng: number };
  submittedAt: string;
  referenceId?: string;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  timestamp: string;
}

export interface FormStats {
  totalForms: number;
  totalResponses: number;
  categories: string[];
  recentForms: PublicFormData[];
}
