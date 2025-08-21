
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Calendar,
  Users,
  FileText,
  Lightbulb,
  Wrench,
  Trash2 as TrashIcon,
  Droplets,
  Leaf,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ComplaintFormManageModal } from "@/domains/complaintForms/components/ComplaintFormManageModal";

interface ComplaintForm {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: string[];
  isActive: boolean;
  responses: number;
  createdAt: string;
  url: string;
}

const ComplaintForms = () => {
  const { toast } = useToast();
  const [selectedComplaintForm, setSelectedComplaintForm] = useState<ComplaintForm | null>(null);

  // Mock data for complaint forms
  const [forms, setForms] = useState<ComplaintForm[]>([
    {
      id: "form-001",
      name: "ฟอร์มแจ้งปัญหาไฟฟ้าสาธารณะ",
      description: "สำหรับแจ้งปัญหาเกี่ยวกับไฟฟ้าส่องสว่างตามถนน สวนสาธารณะ",
      category: "ไฟฟ้าสาธารณะ",
      fields: ["รายละเอียดปัญหา", "สถานที่", "รูปภาพ", "วันที่เกิดเหตุ"],
      isActive: true,
      responses: 45,
      createdAt: "2024-01-15",
      url: "http://localhost:8080/forms/electrical-issues"
    },
    {
      id: "form-002",
      name: "ฟอร์มแจ้งปัญหาถนน-ทางเท้า",
      description: "สำหรับแจ้งปัญหาหลุมบ่อ ถนนชำรุด ทางเท้าแตกหัก",
      category: "ถนน",
      fields: ["ประเภทปัญหา", "ขนาดความเสียหาย", "ตำแหน่ง GPS", "รูปภาพ"],
      isActive: true,
      responses: 73,
      createdAt: "2024-01-10",
      url: "http://localhost:8080/forms/road-issues"
    },
    {
      id: "form-003",
      name: "ฟอร์มแจ้งปัญหาขยะ",
      description: "สำหรับแจ้งปัญหาการเก็บขยะ ความสะอาด",
      category: "ขยะ",
      fields: ["ประเภทขยะ", "พื้นที่", "ความถี่ปัญหา", "ข้อเสนอแนะ"],
      isActive: false,
      responses: 28,
      createdAt: "2024-01-05",
      url: "http://localhost:8080/forms/waste-issues"
    }
  ]);

  const handleToggleActive = (formId: string) => {
    setForms(forms.map(form =>
      form.id === formId ? { ...form, isActive: !form.isActive } : form
    ));

    toast({
      title: "อัพเดตสถานะสำเร็จ",
      description: "สถานะฟอร์มได้รับการอัพเดตแล้ว",
    });
  };

  const handleCopyUrl = (url: string, formName: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "คัดลอก URL สำเร็จ",
      description: `คัดลอก URL ของ "${formName}" แล้ว`,
    });
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter(form => form.id !== formId));
    toast({
      title: "ลบฟอร์มสำเร็จ",
      description: "ฟอร์มถูกลบออกจากระบบแล้ว",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ไฟฟ้าสาธารณะ": return <Lightbulb className="w-6 h-6" />;
      case "ถนน": return <Wrench className="w-6 h-6" />;
      case "ขยะ": return <TrashIcon className="w-6 h-6" />;
      case "น้ำท่วม": return <Droplets className="w-6 h-6" />;
      case "สิ่งแวดล้อม": return <Leaf className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ไฟฟ้าสาธารณะ": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "ถนน": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "ขยะ": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "น้ำท่วม": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50";
      case "สิ่งแวดล้อม": return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">จัดการฟอร์มร้องเรียน</h1>
            <p className="text-gray-400">สร้างและจัดการฟอร์มสำหรับรับเรื่องร้องเรียนจากประชาชน</p>
          </div>
          <Button onClick={()=> setSelectedComplaintForm(forms[0])} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 neon-glow">
            <Plus className="mr-2 h-4 w-4" />
            สร้างฟอร์มใหม่
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-cyan-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">ฟอร์มทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{forms.length}</div>
              <p className="text-xs text-gray-500">ฟอร์มที่สร้างไว้</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">ฟอร์มที่เปิดใช้งาน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {forms.filter(f => f.isActive).length}
              </div>
              <p className="text-xs text-gray-500">พร้อมใช้งาน</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">การตอบกลับรวม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                {forms.reduce((sum, form) => sum + form.responses, 0)}
              </div>
              <p className="text-xs text-gray-500">ครั้งทั้งหมด</p>
            </CardContent>
          </Card>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Card key={form.id} className="bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      {getCategoryIcon(form.category)}
                    </div>
                    <div>
                      <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                        {form.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getCategoryColor(form.category)}>
                          {form.category}
                        </Badge>
                        <Badge className={form.isActive ?
                          "bg-green-500/20 text-green-400 border-green-500/50" :
                          "bg-red-500/20 text-red-400 border-red-500/50"
                        }>
                          {form.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-950"
                      onClick={() => handleToggleActive(form.id)}
                    >
                      {form.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-950"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-950"
                      onClick={() => handleDeleteForm(form.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-gray-400 mt-3">
                  {form.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Form Fields Preview */}
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">ฟิลด์ในฟอร์ม:</p>
                  <div className="flex flex-wrap gap-1">
                    {form.fields.slice(0, 3).map((field, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-700 text-gray-300 border-gray-600 text-xs">
                        {field}
                      </Badge>
                    ))}
                    {form.fields.length > 3 && (
                      <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600 text-xs">
                        +{form.fields.length - 3} อื่นๆ
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Form Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{form.responses} การตอบกลับ</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>สร้างเมื่อ {new Date(form.createdAt).toLocaleDateString('th-TH')}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    onClick={() => handleCopyUrl(form.url, form.name)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    คัดลอก URL
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    onClick={() => window.open(form.url, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    เปิดฟอร์ม
                  </Button>
                </div>

                {/* URL Display */}
                <div className="bg-gray-900 p-3 rounded border border-gray-600">
                  <p className="text-xs text-gray-400 mb-1">URL ของฟอร์ม:</p>
                  <p className="text-sm text-blue-400 font-mono break-all">{form.url}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ComplaintFormManageModal onClose={() => setSelectedComplaintForm(null)} complaintForm={selectedComplaintForm} />
      </div>
    </AdminLayout>
  );
};

export default ComplaintForms;
