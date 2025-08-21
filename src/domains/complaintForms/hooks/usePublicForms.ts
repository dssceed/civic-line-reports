import { useState, useEffect } from 'react';
import { PublicFormService } from '../services/publicForm.service';
import type { PublicFormData, FormSubmission, FormStats } from '../types/publicForm.types';

export const usePublicForms = () => {
  const [forms, setForms] = useState<PublicFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PublicFormService.getAllForms();
      setForms(data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลฟอร์มได้');
      console.error('Error loading forms:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    forms,
    loading,
    error,
    refetch: loadForms
  };
};

export const usePublicForm = (formId: string) => {
  const [form, setForm] = useState<PublicFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formId) {
      loadForm(formId);
    }
  }, [formId]);

  const loadForm = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await PublicFormService.getFormById(id);
      if (data) {
        setForm(data);
      } else {
        setError('ไม่พบฟอร์มที่ต้องการ');
      }
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลฟอร์มได้');
      console.error('Error loading form:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    refetch: () => loadForm(formId)
  };
};

export const useFormSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formId: string, data: FormSubmission) => {
    try {
      setSubmitting(true);
      setError(null);
      const response = await PublicFormService.submitFormResponse(formId, data);
      return response;
    } catch (err) {
      const errorMessage = 'ไม่สามารถส่งฟอร์มได้ กรุณาลองใหม่อีกครั้ง';
      setError(errorMessage);
      console.error('Error submitting form:', err);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitForm,
    submitting,
    error
  };
};

export const useFormStats = () => {
  const [stats, setStats] = useState<FormStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PublicFormService.getFormStats();
      setStats(data);
    } catch (err) {
      setError('ไม่สามารถโหลดสถิติได้');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: loadStats
  };
};
