import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTrackingSearch, useTrackingStats } from "@/domains/complaintForms/hooks/useTracking";
import {
  Search,
  FileText,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  ExternalLink,
  Building2,
  Lightbulb,
  Wrench,
  Trash2,
  Droplets,
  Leaf,
  Phone,
  Mail,
  Calendar,
  TrendingUp
} from "lucide-react";

interface TrackingStatus {
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

const Landing = () => {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState("");
  const { tracking: trackingResult, loading: isSearching, error, searchTracking } = useTrackingSearch();
  const { stats } = useTrackingStats();

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

  const quickActions = [
    {
      title: "แจ้งปัญหาไฟฟ้าสาธารณะ",
      description: "ไฟส่องสว่าง ไฟฟ้าเสีย",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      url: "/forms/electrical-issues"
    },
    {
      title: "แจ้งปัญหาถนน-ทางเท้า",
      description: "หลุมบ่อ ถนนชำรุด",
      icon: <Wrench className="w-8 h-8" />,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      url: "/forms/road-issues"
    },
    {
      title: "แจ้งปัญหาขยะ",
      description: "การเก็บขยะ ความสะอาด",
      icon: <Trash2 className="w-8 h-8" />,
      color: "bg-green-500/20 text-green-400 border-green-500/50",
      url: "/forms/waste-issues"
    }
  ];

  const statsData = [
    { label: "การแจ้งรวม", value: stats?.total?.toString() || "0", icon: <FileText className="w-6 h-6" />, color: "text-blue-400" },
    { label: "เสร็จสิ้น", value: stats?.completed?.toString() || "0", icon: <CheckCircle className="w-6 h-6" />, color: "text-green-400" },
    { label: "กำลังดำเนินการ", value: stats?.inProgress?.toString() || "0", icon: <Clock className="w-6 h-6" />, color: "text-yellow-400" },
    { label: "เวลาเฉลี่ย", value: `${stats?.averageCompletionTime || 0} วัน`, icon: <TrendingUp className="w-6 h-6" />, color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              ระบบแจ้งปัญหาสาธารณะ
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              ร่วมกันสร้างชุมชนที่น่าอยู่ ด้วยการแจ้งปัญหาและติดตามการแก้ไขอย่างโปร่งใส
            </p>
            
            {/* Tracking Search */}
            <Card className="max-w-2xl mx-auto bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">ติดตามสถานะการดำเนินงาน</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="กรอกหมายเลขการแจ้ง (เช่น REF-1703123456-ABC123DEF)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={handleTrackingSearch}
                    disabled={isSearching}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    onClick={() => window.location.href = '/tracking'}
                    className="text-blue-400 hover:text-blue-300 p-0"
                  >
                    ไปยังหน้าติดตามสถานะ →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tracking Result */}
      {trackingResult && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-3">
                    {getCategoryIcon(trackingResult.category)}
                    {trackingResult.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">
                    หมายเลขการแจ้ง: {trackingResult.referenceId}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(trackingResult.status)}>
                    {getStatusIcon(trackingResult.status)}
                    <span className="ml-1">{getStatusText(trackingResult.status)}</span>
                  </Badge>
                  <Badge className={getPriorityColor(trackingResult.priority)}>
                    {getPriorityText(trackingResult.priority)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">รายละเอียดปัญหา</p>
                  <p className="text-white">{trackingResult.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">สถานที่</p>
                  <p className="text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {trackingResult.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">วันที่แจ้ง</p>
                  <p className="text-white flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(trackingResult.submittedAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">อัปเดตล่าสุด</p>
                  <p className="text-white flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(trackingResult.updatedAt).toLocaleDateString('th-TH')}
                  </p>
                </div>
              </div>

              {/* Progress Info */}
              {trackingResult.assignedTo && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">ผู้รับผิดชอบ</p>
                  <p className="text-white flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {trackingResult.assignedTo}
                  </p>
                </div>
              )}

              {trackingResult.estimatedCompletion && (
                <div>
                  <p className="text-sm text-gray-400 mb-1">คาดว่าจะเสร็จสิ้น</p>
                  <p className="text-white flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {new Date(trackingResult.estimatedCompletion).toLocaleDateString('th-TH')}
                  </p>
                </div>
              )}

              {/* Notes Timeline */}
              {trackingResult.notes && trackingResult.notes.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-3">ประวัติการดำเนินงาน</p>
                  <div className="space-y-3">
                    {trackingResult.notes.map((note, index) => (
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

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">สถิติการให้บริการ</h2>
          <p className="text-gray-400">ข้อมูลการดำเนินงานของเราในปี 2024</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className={`mx-auto mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">แจ้งปัญหาด่วน</h2>
          <p className="text-gray-400">เลือกประเภทปัญหาที่คุณพบ</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group"
              onClick={() => window.location.href = action.url}
            >
              <CardContent className="p-6 text-center">
                <div className={`mx-auto mb-4 p-3 rounded-lg ${action.color}`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{action.description}</p>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 group-hover:border-blue-500 group-hover:text-blue-400"
                >
                  แจ้งปัญหา
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">ติดต่อเรา</h2>
            <p className="text-gray-400 mb-8">หากมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติม</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-700/30 rounded-lg">
                <Phone className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-medium">โทรศัพท์</p>
                  <p className="text-gray-400">02-123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-700/30 rounded-lg">
                <Mail className="w-6 h-6 text-green-400" />
                <div className="text-left">
                  <p className="text-white font-medium">อีเมล</p>
                  <p className="text-gray-400">contact@municipality.gov</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-gray-700/30 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                  <p className="text-white font-medium">สำนักงาน</p>
                  <p className="text-gray-400">เปิดทำการ จันทร์-ศุกร์ 8:00-17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
