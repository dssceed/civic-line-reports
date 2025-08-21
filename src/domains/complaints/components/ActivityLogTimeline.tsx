import { useState, useEffect } from "react";
import { ActivityLog, ActivityAction } from "@/common/types";
import { ActivityLogService } from "../services/activityLog.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Filter, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ActivityLogTimelineProps {
  complaintId: string;
  onRefresh?: () => void;
}

export const ActivityLogTimeline = ({ complaintId, onRefresh }: ActivityLogTimelineProps) => {
  const { t } = useTranslation('complaints');
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    action: "all",
    performedBy: "",
    dateFrom: "",
    dateTo: ""
  });

  const loadActivityLogs = async () => {
    setLoading(true);
    try {
      const logs = await ActivityLogService.getActivityLogs(complaintId);
      setActivityLogs(logs);
    } catch (error) {
      console.error("Error loading activity logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivityLogs();
  }, [complaintId]);

  const handleRefresh = () => {
    loadActivityLogs();
    onRefresh?.();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionColor = (action: ActivityAction) => {
    const colors: Record<ActivityAction, string> = {
      created: "bg-blue-500/20 text-blue-300 border-blue-500/50",
      status_changed: "bg-purple-500/20 text-purple-300 border-purple-500/50",
      assigned: "bg-green-500/20 text-green-300 border-green-500/50",
      priority_changed: "bg-orange-500/20 text-orange-300 border-orange-500/50",
      note_added: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50",
      image_added: "bg-pink-500/20 text-pink-300 border-pink-500/50",
      location_updated: "bg-indigo-500/20 text-indigo-300 border-indigo-500/50",
      completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
      reopened: "bg-red-500/20 text-red-300 border-red-500/50"
    };
    return colors[action] || "bg-slate-500/20 text-slate-300 border-slate-500/50";
  };

  const filteredLogs = activityLogs.filter(log => {
    if (filters.action && filters.action !== "all" && log.action !== filters.action) return false;
    if (filters.performedBy && !log.performedBy.includes(filters.performedBy)) return false;
    if (filters.dateFrom && new Date(log.performedAt) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(log.performedAt) > new Date(filters.dateTo)) return false;
    return true;
  });

  return (
    <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-blue-100 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('activityLog.title')}
            </CardTitle>
            <CardDescription className="text-blue-300/80">
              {t('activityLog.description')}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="bg-slate-700/50 border-blue-500/30 text-blue-100 hover:bg-slate-700/70"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            รีเฟรช
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-700/30 border border-blue-500/30 rounded-lg">
          <div>
            <label className="text-sm text-blue-400/70 mb-1 block">ประเภทการดำเนินการ</label>
            <Select value={filters.action} onValueChange={(value) => setFilters(prev => ({ ...prev, action: value }))}>
              <SelectTrigger className="bg-slate-700/50 border-blue-500/30 text-blue-100">
                <SelectValue placeholder="ทั้งหมด" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-blue-500/30">
                <SelectItem value="all">ทั้งหมด</SelectItem>
                <SelectItem value="created">สร้างเรื่อง</SelectItem>
                <SelectItem value="status_changed">เปลี่ยนสถานะ</SelectItem>
                <SelectItem value="assigned">มอบหมายงาน</SelectItem>
                <SelectItem value="priority_changed">เปลี่ยนความสำคัญ</SelectItem>
                <SelectItem value="note_added">เพิ่มบันทึก</SelectItem>
                <SelectItem value="completed">เสร็จสิ้น</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-blue-400/70 mb-1 block">ผู้ดำเนินการ</label>
            <Input
              placeholder="ค้นหาผู้ดำเนินการ"
              value={filters.performedBy}
              onChange={(e) => setFilters(prev => ({ ...prev, performedBy: e.target.value }))}
              className="bg-slate-700/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
          </div>
          <div>
            <label className="text-sm text-blue-400/70 mb-1 block">วันที่เริ่มต้น</label>
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="bg-slate-700/50 border-blue-500/30 text-blue-100"
            />
          </div>
          <div>
            <label className="text-sm text-blue-400/70 mb-1 block">วันที่สิ้นสุด</label>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="bg-slate-700/50 border-blue-500/30 text-blue-100"
            />
          </div>
        </div>

        {/* Activity Timeline */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-blue-300">กำลังโหลด...</span>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-blue-400/70">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>ไม่พบประวัติการดำเนินการ</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <div key={log.id} className="relative">
                {/* Timeline line */}
                {index < filteredLogs.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-blue-500/30"></div>
                )}
                
                <div className="flex items-start space-x-4 p-4 bg-slate-700/30 border border-blue-500/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-600/50 border border-blue-500/30 rounded-full flex items-center justify-center">
                    <span className="text-lg">{ActivityLogService.getActionIcon(log.action)}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getActionColor(log.action)}>
                        {ActivityLogService.getActionDisplayName(log.action)}
                      </Badge>
                      <span className="text-sm text-blue-400/70">
                        {formatDate(log.performedAt)}
                      </span>
                    </div>
                    
                    <p className="text-blue-200 mb-2">{log.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-blue-400/70">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{log.performedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(log.performedAt).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>
                    
                    {/* Details */}
                    {log.details && (
                      <div className="mt-3 p-3 bg-slate-600/30 border border-blue-500/20 rounded-lg">
                        {log.details.oldValue && log.details.newValue && (
                          <div className="mb-2">
                            <span className="text-blue-400/70">เปลี่ยนจาก: </span>
                            <span className="text-red-300">{log.details.oldValue}</span>
                            <span className="text-blue-400/70"> เป็น: </span>
                            <span className="text-green-300">{log.details.newValue}</span>
                          </div>
                        )}
                        {log.details.reason && (
                          <div className="mb-2">
                            <span className="text-blue-400/70">เหตุผล: </span>
                            <span className="text-blue-200">{log.details.reason}</span>
                          </div>
                        )}
                        {log.details.estimatedCompletion && (
                          <div className="mb-2">
                            <span className="text-blue-400/70">คาดว่าจะเสร็จ: </span>
                            <span className="text-yellow-300">{log.details.estimatedCompletion}</span>
                          </div>
                        )}
                        {log.details.notes && (
                          <div>
                            <span className="text-blue-400/70">บันทึก: </span>
                            <span className="text-blue-200">{log.details.notes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
