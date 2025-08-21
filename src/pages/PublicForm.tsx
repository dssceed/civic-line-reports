import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { usePublicForm, useFormSubmission } from "@/domains/complaintForms/hooks/usePublicForms";
import {
  MapPin,
  Calendar,
  User,
  Image as ImageIcon,
  Phone,
  FileText,
  CheckSquare,
  Hash,
  Upload,
  Navigation,
  Map,
  Send,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface FormField {
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

interface PublicFormData {
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

const PublicForm = () => {
  const { formId } = useParams<{ formId: string }>();
  const { toast } = useToast();
  const { form: formData, loading, error } = usePublicForm(formId || '');
  const { submitForm, submitting } = useFormSubmission();
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleFileUpload = (fieldId: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [fieldId]: fileArray
      }));
    }
  };

  const handleLocationSelect = (fieldId: string, location: {lat: number, lng: number}) => {
    setSelectedLocation(location);
    setFormValues(prev => ({
      ...prev,
      [fieldId]: location
    }));
  };

  const validateForm = () => {
    if (!formData) return false;

    for (const field of formData.fields) {
      if (field.required) {
        const value = formValues[field.id];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          toast({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            description: `กรุณากรอกข้อมูลในช่อง "${field.label}"`,
            variant: "destructive"
          });
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !formData) return;

    const submissionData = {
      formId: formData.id,
      values: formValues,
      files: uploadedFiles,
      location: selectedLocation,
      submittedAt: new Date().toISOString()
    };

    const response = await submitForm(formData.id, submissionData);
    
    if (response.success) {
      setIsSubmitted(true);
      toast({
        title: "ส่งฟอร์มสำเร็จ",
        description: "ข้อมูลของคุณได้รับการส่งเรียบร้อยแล้ว เราจะดำเนินการตรวจสอบและแก้ไขปัญหาโดยเร็วที่สุด",
      });
    } else {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: response.message || "ไม่สามารถส่งฟอร์มได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
            placeholder={field.placeholder}
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full"
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full"
            required={field.required}
            rows={4}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full"
            required={field.required}
          />
        );
      case 'date':
        return (
          <Input
            type="date"
            value={formValues[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full"
            required={field.required}
          />
        );
      case 'select':
        return (
          <Select
            value={formValues[field.id] || ''}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="เลือกตัวเลือก" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formValues[field.id] || false}
              onCheckedChange={(checked) => handleInputChange(field.id, checked)}
              required={field.required}
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );
      case 'file':
        return (
          <div className="space-y-2">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-300 mb-1">
                {field.placeholder || "คลิกเพื่ออัปโหลดหรือลากไฟล์มาวาง"}
              </p>
              <p className="text-xs text-gray-500">
                {field.fileTypes?.join(', ')} • ขนาดสูงสุด {field.maxFileSize}MB
                {field.multiple && ' • อัปโหลดได้หลายไฟล์'}
              </p>
              <input
                type="file"
                multiple={field.multiple}
                accept={field.fileTypes?.join(',')}
                onChange={(e) => handleFileUpload(field.id, e.target.files)}
                className="hidden"
                id={`file-${field.id}`}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`file-${field.id}`)?.click()}
                className="mt-2"
              >
                เลือกไฟล์
              </Button>
            </div>
            {uploadedFiles[field.id] && uploadedFiles[field.id].length > 0 && (
              <div className="space-y-1">
                {uploadedFiles[field.id].map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                    <span className="text-sm text-gray-300">{file.name}</span>
                    <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'location':
        return (
          <div className="space-y-3">
            {field.showMap && (
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-800/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">แผนที่</span>
                  </div>
                  {field.allowCurrentLocation && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Simulate getting current location
                        const mockLocation = {
                          lat: field.defaultLatitude || 13.7563,
                          lng: field.defaultLongitude || 100.5018
                        };
                        handleLocationSelect(field.id, mockLocation);
                      }}
                      className="text-gray-300 border-gray-600 hover:bg-gray-700"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      ตำแหน่งปัจจุบัน
                    </Button>
                  )}
                </div>
                
                <div className="w-full h-48 bg-gray-700/50 border border-gray-600 rounded-lg flex items-center justify-center relative">
                  <div className="text-center text-gray-400">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">คลิกเพื่อเลือกตำแหน่งบนแผนที่</p>
                    {selectedLocation && (
                      <p className="text-xs mt-1">
                        {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                  
                  {selectedLocation && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-400">ละติจูด</Label>
                <Input
                  type="number"
                  step="any"
                  value={selectedLocation?.lat || field.defaultLatitude || ''}
                  onChange={(e) => {
                    const lat = parseFloat(e.target.value);
                    const location = { 
                      lat, 
                      lng: selectedLocation?.lng || field.defaultLongitude || 100.5018 
                    };
                    handleLocationSelect(field.id, location);
                  }}
                  placeholder="13.7563"
                  className="w-full text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400">ลองจิจูด</Label>
                <Input
                  type="number"
                  step="any"
                  value={selectedLocation?.lng || field.defaultLongitude || ''}
                  onChange={(e) => {
                    const lng = parseFloat(e.target.value);
                    const location = { 
                      lat: selectedLocation?.lat || field.defaultLatitude || 13.7563, 
                      lng 
                    };
                    handleLocationSelect(field.id, location);
                  }}
                  placeholder="100.5018"
                  className="w-full text-sm"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-400">ที่อยู่ (ถ้ามี)</Label>
              <Input
                placeholder="กรอกที่อยู่เพิ่มเติม"
                className="w-full text-sm"
                value={formValues[`${field.id}_address`] || ''}
                onChange={(e) => handleInputChange(`${field.id}_address`, e.target.value)}
              />
            </div>
          </div>
        );
      default:
        return <Input placeholder="Field" className="w-full" />;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">ส่งฟอร์มสำเร็จ</h2>
            <p className="text-gray-400 mb-6">
              ข้อมูลของคุณได้รับการส่งเรียบร้อยแล้ว เราจะดำเนินการตรวจสอบและแก้ไขปัญหาโดยเร็วที่สุด
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>หมายเลขการแจ้ง: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p>วันที่ส่ง: {new Date().toLocaleDateString('th-TH')}</p>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              กลับหน้าหลัก
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">กำลังโหลดฟอร์ม...</p>
        </div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-2">ไม่พบฟอร์ม</h2>
          <p className="text-gray-400 mb-6">
            {error || "ไม่พบฟอร์มที่คุณต้องการ"}
          </p>
          <Button
            onClick={() => window.location.href = '/forms'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            กลับไปยังรายการฟอร์ม
          </Button>
        </div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
              <p className="text-gray-400">{formData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">{formData.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {formData.description}
                </CardDescription>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                {formData.category}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              {formData.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="text-sm font-medium text-gray-200">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <Separator className="bg-gray-700" />

            <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <p className="text-sm text-blue-300">
                ข้อมูลที่คุณส่งมาจะถูกใช้เพื่อการแก้ไขปัญหาเท่านั้น เราจะรักษาความเป็นส่วนตัวของข้อมูลคุณ
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังส่งข้อมูล...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  ส่งฟอร์ม
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicForm;
