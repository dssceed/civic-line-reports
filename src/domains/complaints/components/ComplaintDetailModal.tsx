
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, Image as ImageIcon, Phone, MessageSquare, Paperclip, Save, Clock, AlertCircle, CheckCircle, XCircle, History } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ActivityLogTimeline } from "./ActivityLogTimeline";
import { AddActivityLog } from "./AddActivityLog";

interface ComplaintDetailModalProps {
  complaint: any;
  onClose: () => void;
}

export const ComplaintDetailModal = ({ complaint, onClose }: ComplaintDetailModalProps) => {
  const [status, setStatus] = useState(complaint?.status || "");
  const [actionNotes, setActionNotes] = useState("");
  const position: [number, number] = [13.7563, 100.5018]; // Bangkok
  const bounds: LatLngBoundsExpression = [
    [5, 97],   // SW
    [20, 106], // NE (กรอบประเทศไทยคร่าวๆ)
  ];
  const [activeTimeline, setActiveTimeline] = useState(false);
  const [activeMap, setActiveMap] = useState(false);
  const [activeImages, setActiveImages] = useState(false);
  const [refreshActivityLogs, setRefreshActivityLogs] = useState(false);

  const { toast } = useToast();

  if (!complaint) return null;

  const handleStatusUpdate = () => {
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `เปลี่ยนสถานะเป็น "${status}" แล้ว`,
    });
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ใหม่": return "bg-primary text-primary-foreground border-0";
      case "กำลังดำเนินการ": return "bg-yellow-500 text-yellow-foreground border-0";
      case "รอตรวจสอบ": return "bg-orange-500 text-orange-foreground border-0";
      case "เสร็จสิ้น": return "bg-green-500 text-green-foreground border-0";
      default: return "bg-muted text-muted-foreground border-0";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "ด่วน": return "bg-destructive text-destructive-foreground border-0 animate-pulse";
      case "ปกติ": return "bg-muted text-muted-foreground border-0";
      default: return "bg-muted text-muted-foreground border-0";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ใหม่": return <AlertCircle className="h-4 w-4" />;
      case "กำลังดำเนินการ": return <Clock className="h-4 w-4" />;
      case "รอตรวจสอบ": return <AlertCircle className="h-4 w-4" />;
      case "เสร็จสิ้น": return <CheckCircle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="fixed top-0 right-0 w-full lg:w-[70vw] xl:w-[65vw]
        left-auto bottom-0 transform-none
        max-w-full overflow-y-auto shadow-2xl p-0
        data-[state=open]:!animate-slide-in-right
        data-[state=closed]:!animate-slide-out-right
        bg-background">

        {/* Header with theme colors */}
        <div className="text-white p-6 rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl font-bold">
              <div className="bg-primary-foreground/20 p-2 rounded-lg">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span>รายละเอียดเรื่องร้องเรียน #{complaint.id}</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getStatusColor(complaint.status)} flex items-center gap-1`}>
                    {getStatusIcon(complaint.status)}
                    {complaint.status}
                  </Badge>
                  <Badge className={`${getPriorityColor(complaint.priority)} flex items-center gap-1`}>
                    {complaint.priority}
                  </Badge>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="flex gap-0 h-full">
          {/* Sidebar with action buttons */}
          <div className="flex flex-col gap-4 p-4 bg-muted/30 border-r border-border">
            <div className="flex flex-col gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveTimeline(!activeTimeline)}
                      className={`group relative p-3 rounded-xl transition-all duration-300 ${activeTimeline
                        ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                        : 'bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground shadow-md hover:shadow-lg border border-border'
                        }`}
                      title="ไทม์ไลน์"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                      </svg>


                      {activeTimeline && (
                        <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ไทม์ไลน์</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveMap(!activeMap)}
                      className={`group relative p-3 rounded-xl transition-all duration-300 ${activeMap
                        ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                        : 'bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground shadow-md hover:shadow-lg border border-border'
                        }`}
                      title="แผนที่"
                    >
                      <MapPin className="h-5 w-5" />
                      {activeMap && (
                        <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>แผนที่</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveImages(!activeImages)}
                      className={`group relative p-3 rounded-xl transition-all duration-300 ${activeImages
                        ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                        : 'bg-background hover:bg-accent text-muted-foreground hover:text-accent-foreground shadow-md hover:shadow-lg border border-border'
                        }`}
                      title="รูปภาพ"
                    >
                      <ImageIcon className="h-5 w-5" />
                      {activeImages && (
                        <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>รูปภาพประกอบ</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Side panels */}
          <div className={`${activeMap || activeTimeline || activeImages ? 'block' : 'hidden'} w-80 bg-background border-r border-border`}>
            <div className={`${activeMap ? 'block' : 'hidden'} p-4`} id="location">
              <div className="bg-primary text-primary-foreground p-3 rounded-t-lg">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  ตำแหน่งที่เกิดเหตุ
                </h3>
              </div>
              <MapContainer
                bounds={bounds}
                boundsOptions={{ padding: [50, 50] }}
                zoom={20}
                minZoom={5}
                maxZoom={18}
                scrollWheelZoom={true}
                style={{ height: "400px", width: "100%" }}
                whenReady={() => console.log("✅ Map ready")}
                className="rounded-b-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/">OSM</a>'
                />
                <Marker position={position}>
                  <Popup>📍 กรุงเทพฯ</Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className={`${activeTimeline ? 'block' : 'hidden'} p-4`} id="timeline">
              <div className="bg-primary text-primary-foreground p-3 rounded-t-lg mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <History className="h-4 w-4" />
                  ประวัติการดำเนินการ
                </h3>
              </div>
              <ActivityLogTimeline 
                complaintId={complaint.id} 
                onRefresh={() => setRefreshActivityLogs(!refreshActivityLogs)}
              />
            </div>

            <div className={`${activeImages ? 'block' : 'hidden'} p-4`} id="images">
              <div className="bg-primary text-primary-foreground p-3 rounded-t-lg mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  รูปภาพประกอบ ({complaint.images?.length || 0} รูป)
                </h3>
              </div>
              {complaint.images && complaint.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {complaint.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center p-2 hover:shadow-md transition-shadow">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground text-center">{image}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm">ไม่มีรูปภาพประกอบ</p>
                </div>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Reporter and Location Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-card-foreground">
                  <User className="h-5 w-5 text-primary" />
                  ข้อมูลผู้แจ้ง
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{complaint.reporterName}</p>
                      <p className="text-sm text-muted-foreground">ผู้แจ้ง</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                    <span className="text-primary font-medium">@</span>
                    <div>
                      <p className="font-medium">{complaint.reporterLine}</p>
                      <p className="text-sm text-muted-foreground">Line ID</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">-</p>
                      <p className="text-sm text-muted-foreground">เบอร์โทรศัพท์</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-card-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  สถานที่เกิดเหตุ
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium">{complaint.location}</p>
                      <p className="text-sm text-muted-foreground">ที่อยู่</p>
                      {complaint.coordinates && (
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          พิกัด: {complaint.coordinates.lat}, {complaint.coordinates.lng}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint Details */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-card-foreground">
                <AlertCircle className="h-5 w-5 text-primary" />
                ข้อมูลเรื่องร้องเรียน
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">{complaint.dateReported}</p>
                    <p className="text-sm text-muted-foreground">วันที่แจ้ง</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                  <Badge variant="outline" className="bg-background">{complaint.category}</Badge>
                  <div>
                    <p className="font-medium">หมวดหมู่</p>
                  </div>
                </div>
                {complaint.assignedTo && (
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg shadow-sm border border-border">
                    <User className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{complaint.assignedTo}</p>
                      <p className="text-sm text-muted-foreground">ผู้รับผิดชอบ</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Problem Description */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-card-foreground">
                <AlertCircle className="h-5 w-5 text-primary" />
                รายละเอียดปัญหา
              </h3>
              <div className="p-4 bg-background rounded-lg shadow-sm border-l-4 border-primary">
                <p className="text-foreground leading-relaxed">{complaint.description}</p>
              </div>
            </div>

            {/* Action Section */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="font-semibold mb-6 flex items-center gap-2 text-card-foreground">
                <Save className="h-5 w-5 text-primary" />
                การดำเนินการ
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">อัปเดตสถานะ</label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="bg-background border-border hover:border-primary focus:border-primary">
                        <SelectValue placeholder="เลือกสถานะ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="รับเรื่องแล้ว">รับเรื่องแล้ว</SelectItem>
                        <SelectItem value="รอตรวจสอบ">รอตรวจสอบ</SelectItem>
                        <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
                        <SelectItem value="รออะไหล่">รออะไหล่</SelectItem>
                        <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                        <SelectItem value="ไม่สามารถดำเนินการได้">ไม่สามารถดำเนินการได้</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">มอบหมายให้</label>
                    <Select>
                      <SelectTrigger className="bg-background border-border hover:border-primary focus:border-primary">
                        <SelectValue placeholder="เลือกผู้รับผิดชอบ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineer1">นาย วิศวกร ช่างซ่อม</SelectItem>
                        <SelectItem value="sanitation">กองสาธารณสุข</SelectItem>
                        <SelectItem value="electric">กองไฟฟ้า</SelectItem>
                        <SelectItem value="road">กองช่าง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">บันทึกการดำเนินการ</label>
                  <Textarea
                    placeholder="บันทึกรายละเอียดการดำเนินการ, ความคืบหน้า, หรือหมายเหตุเพิ่มเติม..."
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    rows={4}
                    className="bg-background border-border hover:border-primary focus:border-primary resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleStatusUpdate}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    บันทึกการอัปเดต
                  </Button>
                  <AddActivityLog 
                    complaintId={complaint.id}
                    onActivityAdded={() => setRefreshActivityLogs(!refreshActivityLogs)}
                  />
                  <Button
                    variant="outline"
                    className="border-border hover:border-border hover:bg-accent transition-all duration-300 flex items-center gap-2"
                  >
                    <Paperclip className="h-4 w-4" />
                    แนบหลักฐาน
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:border-border hover:bg-accent text-foreground hover:text-accent-foreground transition-all duration-300 flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    ส่งข้อความถึงผู้แจ้ง
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};
