import { useState, useEffect } from 'react';
import { TrackingService } from '../services/tracking.service';
import type { 
  TrackingStatus, 
  TrackingStats, 
  TrackingSearchResult,
  TrackingUpdateRequest 
} from '../types/tracking.types';

export const useTrackingSearch = () => {
  const [tracking, setTracking] = useState<TrackingStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTracking = async (referenceId: string) => {
    if (!referenceId.trim()) {
      setError('กรุณากรอกหมายเลขการแจ้ง');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      setTracking(null);

      const result = await TrackingService.searchTracking(referenceId);
      
      if (result) {
        setTracking(result);
        return result;
      } else {
        setError('ไม่พบหมายเลขการแจ้งนี้ในระบบ');
        return null;
      }
    } catch (err) {
      const errorMessage = 'เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง';
      setError(errorMessage);
      console.error('Error searching tracking:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setTracking(null);
    setError(null);
  };

  return {
    tracking,
    loading,
    error,
    searchTracking,
    clearSearch
  };
};

export const useTrackingStats = () => {
  const [stats, setStats] = useState<TrackingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TrackingService.getTrackingStats();
      setStats(data);
    } catch (err) {
      setError('ไม่สามารถโหลดสถิติได้');
      console.error('Error loading tracking stats:', err);
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

export const useRecentTrackings = (limit: number = 5) => {
  const [trackings, setTrackings] = useState<TrackingStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecentTrackings();
  }, [limit]);

  const loadRecentTrackings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TrackingService.getRecentTrackings(limit);
      setTrackings(data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error loading recent trackings:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    trackings,
    loading,
    error,
    refetch: loadRecentTrackings
  };
};

export const useTrackingUpdate = () => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTracking = async (request: TrackingUpdateRequest): Promise<boolean> => {
    try {
      setUpdating(true);
      setError(null);
      
      const success = await TrackingService.updateTrackingStatus(
        request.referenceId,
        request.status,
        request.notes
      );
      
      if (!success) {
        setError('ไม่สามารถอัปเดตสถานะได้');
        return false;
      }
      
      return true;
    } catch (err) {
      const errorMessage = 'เกิดข้อผิดพลาดในการอัปเดต';
      setError(errorMessage);
      console.error('Error updating tracking:', err);
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return {
    updating,
    error,
    updateTracking
  };
};

export const useTrackingByStatus = (status: string) => {
  const [trackings, setTrackings] = useState<TrackingStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status) {
      loadTrackingsByStatus();
    }
  }, [status]);

  const loadTrackingsByStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TrackingService.getTrackingsByStatus(status);
      setTrackings(data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error loading trackings by status:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    trackings,
    loading,
    error,
    refetch: loadTrackingsByStatus
  };
};

export const useTrackingByCategory = (category: string) => {
  const [trackings, setTrackings] = useState<TrackingStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      loadTrackingsByCategory();
    }
  }, [category]);

  const loadTrackingsByCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TrackingService.getTrackingsByCategory(category);
      setTrackings(data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error loading trackings by category:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    trackings,
    loading,
    error,
    refetch: loadTrackingsByCategory
  };
};
