import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePublicForms, useFormStats } from "@/domains/complaintForms/hooks/usePublicForms";
import {
  Search,
  Filter,
  ExternalLink,
  Calendar,
  Users,
  FileText,
  MapPin,
  ArrowRight,
  Building2,
  Lightbulb,
  Trash2,
  Wrench,
  Droplets,
  Leaf
} from "lucide-react";

interface PublicForm {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: string[];
  isActive: boolean;
  responses: number;
  createdAt: string;
  url: string;
  estimatedTime: string;
  icon: string;
}

const PublicFormList = () => {
  const { forms, loading: formsLoading, error: formsError } = usePublicForms();
  const { stats, loading: statsLoading } = useFormStats();
  const [filteredForms, setFilteredForms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter forms based on search and category
  useEffect(() => {
    let filtered = forms.filter(form => form.isActive);

    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(form => form.category === selectedCategory);
    }

    setFilteredForms(filtered);
  }, [forms, searchTerm, selectedCategory]);

  // Filter forms based on search and category
  useEffect(() => {
    let filtered = forms.filter(form => form.isActive);

    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(form => form.category === selectedCategory);
    }

    setFilteredForms(filtered);
  }, [forms, searchTerm, selectedCategory]);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "lightbulb": return <Lightbulb className="w-6 h-6" />;
      case "wrench": return <Wrench className="w-6 h-6" />;
      case "trash2": return <Trash2 className="w-6 h-6" />;
      case "building2": return <Building2 className="w-6 h-6" />;
      case "droplets": return <Droplets className="w-6 h-6" />;
      case "leaf": return <Leaf className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
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

  const getCategoryIconName = (category: string) => {
    switch (category) {
      case "ไฟฟ้าสาธารณะ": return "lightbulb";
      case "ถนน": return "wrench";
      case "ขยะ": return "trash2";
      case "น้ำท่วม": return "droplets";
      case "สิ่งแวดล้อม": return "leaf";
      default: return "file-text";
    }
  };

  const categories = ["all", ...Array.from(new Set(forms.map(form => form.category)))];

  if (formsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">กำลังโหลดฟอร์ม...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">ฟอร์มแจ้งปัญหาสาธารณะ</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              เลือกฟอร์มที่เหมาะสมกับปัญหาที่คุณพบ เพื่อให้เราสามารถช่วยแก้ไขปัญหาได้อย่างตรงจุดและรวดเร็ว
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ค้นหาฟอร์ม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "ทุกหมวดหมู่" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                     <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-blue-500">
             <CardContent className="p-4">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-gray-400">ฟอร์มทั้งหมด</p>
                   <p className="text-2xl font-bold text-blue-400">{stats?.totalForms || 0}</p>
                 </div>
                 <FileText className="w-8 h-8 text-blue-400" />
               </div>
             </CardContent>
           </Card>

           <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-green-500">
             <CardContent className="p-4">
               <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm text-gray-400">การตอบกลับรวม</p>
                   <p className="text-2xl font-bold text-green-400">
                     {stats?.totalResponses || 0}
                   </p>
                 </div>
                 <Users className="w-8 h-8 text-green-400" />
               </div>
             </CardContent>
           </Card>

           <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-purple-500">
             <CardContent className="p-4">
               <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm text-gray-400">หมวดหมู่</p>
                 <p className="text-2xl font-bold text-purple-400">
                   {stats?.categories?.length || 0}
                 </p>
               </div>
               <Building2 className="w-8 h-8 text-purple-400" />
             </div>
           </CardContent>
         </Card>

         <Card className="bg-gray-800 border-gray-700 border-l-4 border-l-orange-500">
           <CardContent className="p-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm text-gray-400">ฟอร์มล่าสุด</p>
                 <p className="text-2xl font-bold text-orange-400">
                   {stats?.recentForms?.[0]?.createdAt ? new Date(stats.recentForms[0].createdAt).toLocaleDateString('th-TH') : '-'}
                 </p>
               </div>
               <Calendar className="w-8 h-8 text-orange-400" />
             </div>
           </CardContent>
         </Card>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <Card key={form.id} className="bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                      {getCategoryIcon(getCategoryIconName(form.category))}
                    </div>
                    <div>
                      <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                        {form.name}
                      </CardTitle>
                      <Badge className={getCategoryColor(form.category)}>
                        {form.category}
                      </Badge>
                    </div>
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
                        {field.label}
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

                {/* Action Button */}
                <Button
                  onClick={() => window.location.href = `/forms/${form.id}`}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group-hover:shadow-lg transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  เริ่มกรอกฟอร์ม
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-2">ไม่พบฟอร์มที่ตรงกับเงื่อนไข</h3>
            <p className="text-gray-400 mb-4">
              ลองเปลี่ยนคำค้นหาหรือหมวดหมู่เพื่อดูฟอร์มอื่นๆ
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              ล้างตัวกรอง
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicFormList;
