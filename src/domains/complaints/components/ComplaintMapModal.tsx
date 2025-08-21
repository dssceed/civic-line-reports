
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, Image as ImageIcon, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface ComplaintMapModalProps {
  complaint: any;
  onClose: () => void;
}

export const ComplaintMapModal = ({ complaint, onClose }: ComplaintMapModalProps) => {
  const [status, setStatus] = useState(complaint?.status || "");
  const [actionNotes, setActionNotes] = useState("");
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
      case "ใหม่": return "bg-blue-100 text-blue-800";
      case "กำลังดำเนินการ": return "bg-yellow-100 text-yellow-800";
      case "รอตรวจสอบ": return "bg-orange-100 text-orange-800";
      case "เสร็จสิ้น": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "ด่วน": return "bg-red-100 text-red-800";
      case "ปกติ": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const position: [number, number] = [13.7563, 100.5018]; // Bangkok
  const bounds: LatLngBoundsExpression = [
    [5, 97],   // SW
    [20, 106], // NE (กรอบประเทศไทยคร่าวๆ)
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>รายละเอียดเรื่องร้องเรียน {complaint.id}</span>
            <Badge className={getStatusColor(complaint.status)}>
              {complaint.status}
            </Badge>
            <Badge className={getPriorityColor(complaint.priority)}>
              {complaint.priority}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <MapContainer
            bounds={bounds}
            boundsOptions={{ padding: [50, 50] }}
            zoom={20}
            minZoom={5}
            maxZoom={18}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
            whenReady={() => console.log("✅ Map ready")}
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
      </DialogContent>
    </Dialog>
  );
};
