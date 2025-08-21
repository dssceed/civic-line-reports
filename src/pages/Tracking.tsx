import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTrackingSearch } from "@/domains/complaintForms/hooks/useTracking";
import {
  Search,
  ArrowLeft,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  FileText,
  Lightbulb,
  Wrench,
  Trash2,
  Droplets,
  Leaf,
  Copy,
  Share2,
  RefreshCw
} from "lucide-react";

const Tracking = () => {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState("");
  const { tracking, loading, error, searchTracking, clearSearch } = useTrackingSearch();

  const handleTrackingSearch = async () => {
    const result = await searchTracking(trackingId);
    
    if (result) {
      toast({
        title: "พบข้อมูลการแจ้ง",
        description: "แสดงข้อมูลสถานะการดำเนินงาน",
      });
    } else if (error) {
      toast({
        title: "ไม่พบข้อมูล",
        description: error,
        variant: "destructive"
      });
    }
  };

  const handleCopyReferenceId = () => {
    if (tracking) {
      navigator.clipboard.writeText(tracking.referenceId);
      toast({
        title: "คัดลอกสำเร็จ",
        description: "คัดลอกหมายเลขการแจ้งแล้ว",
      });
    }
  };

  const handleShare = () => {
    if (tracking) {
      const shareUrl = `${window.location.origin}/tracking?ref=${tracking.referenceId}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "คัดลอกลิงก์สำเร็จ",
        description: "คัดลอกลิงก์สำหรับแชร์แล้ว",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case 'in_progress': return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case 'completed': return "bg-green-500/20 text-green-400 border-green-500/50";
      case 'rejected': return "bg-red-500/20 text-red-400 border-red-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return "รอดำเนินการ";
      case 'in_progress': return "กำลังดำเนินการ";
      case 'completed': return "เสร็จสิ้น";
      case 'rejected': return "ไม่อนุมัติ";
      default: return "ไม่ทราบสถานะ";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return "bg-green-500/20 text-green-400 border-green-500/50";
      case 'medium': return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case 'high': return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case 'urgent': return "bg-red-500/20 text-red-400 border-red-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return "ต่ำ";
      case 'medium': return "ปานกลาง";
      case 'high': return "สูง";
      case 'urgent': return "เร่งด่วน";
      default: return "ไม่ระบุ";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ไฟฟ้าสาธารณะ": return <Lightbulb className="w-6 h-6" />;
      case "ถนน": return <Wrench className="w-6 h-6" />;
      case "ขยะ": return <Trash2 className="w-6 h-6" />;
      case "น้ำท่วม": return <Droplets className="w-6 h-6" />;
      case "สิ่งแวดล้อม": return <Leaf className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">ติดตามสถานะการดำเนินงาน</h1>
              <p className="text-gray-400">ตรวจสอบสถานะการแก้ไขปัญหาที่คุณแจ้ง</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">ค้นหาการแจ้งปัญหา</CardTitle>
            <CardDescription className="text-gray-400">
              กรอกหมายเลขการแจ้งเพื่อติดตามสถานะการดำเนินงาน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="กรอกหมายเลขการแจ้ง (เช่น REF-1703123456-ABC123DEF)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackingSearch()}
              />
              <Button
                onClick={handleTrackingSearch}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Result */}
      {tracking && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getCategoryIcon(tracking.category)}
                    <div>
                      <CardTitle className="text-white">{tracking.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        หมายเลขการแจ้ง: {tracking.referenceId}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(tracking.status)}>
                      {getStatusIcon(tracking.status)}
                      <span className="ml-1">{getStatusText(tracking.status)}</span>
                    </Badge>
                    <Badge className={getPriorityColor(tracking.priority)}>
                      {getPriorityText(tracking.priority)}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyReferenceId}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    คัดลอก
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    แชร์
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">รายละเอียดปัญหา</p>
                  <p className="text-white">{tracking.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">สถานที่</p>
                  <p className="text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tracking.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">วันที่แจ้ง</p>
                  <p className="text-white flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(tracking.submittedAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">อัปเดตล่าสุด</p>
                  <p className="text-white flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(tracking.updatedAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Progress Info */}
              {tracking.assignedTo && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">ผู้รับผิดชอบ</p>
                  <p className="text-white flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {tracking.assignedTo}
                  </p>
                </div>
              )}

              {tracking.estimatedCompletion && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">คาดว่าจะเสร็จสิ้น</p>
                  <p className="text-white flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {new Date(tracking.estimatedCompletion).toLocaleDateString('th-TH')}
                  </p>
                </div>
              )}

              {/* Notes Timeline */}
              {tracking.notes && tracking.notes.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-3">ประวัติการดำเนินงาน</p>
                  <div className="space-y-3">
                    {tracking.notes.map((note, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-white text-sm">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error State */}
      {error && !tracking && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-white mb-2">ไม่พบข้อมูล</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <Button
                onClick={clearSearch}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                ลองใหม่
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Help Section */}
      {!tracking && !error && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">พร้อมติดตามสถานะ</h3>
              <p className="text-gray-400 mb-6">
                กรอกหมายเลขการแจ้งเพื่อดูสถานะการดำเนินงานและประวัติการแก้ไขปัญหา
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>ตัวอย่างหมายเลขการแจ้ง: REF-1703123456-ABC123DEF</p>
                <p>หมายเลขการแจ้งจะได้รับหลังจากส่งฟอร์มสำเร็จ</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Tracking;
