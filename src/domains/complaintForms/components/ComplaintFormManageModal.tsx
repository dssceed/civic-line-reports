import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, User, Image as ImageIcon, Phone, FileText, CheckSquare, Hash, Settings, Edit3, X, Plus, GripVertical, Upload, Link, Navigation, Map } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Input as InputComponent } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface ComplaintFormManageModalProps {
  complaintForm: any;
  onClose: () => void;
}

// Widget Types
interface FormWidget {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'email' | 'phone' | 'date' | 'file' | 'location';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // สำหรับ select
  fileTypes?: string[]; // สำหรับ file upload
  maxFileSize?: number; // สำหรับ file upload (MB)
  multiple?: boolean; // สำหรับ file upload
  allowCurrentLocation?: boolean; // สำหรับ location
  showMap?: boolean; // สำหรับ location
  defaultLatitude?: number; // สำหรับ location
  defaultLongitude?: number; // สำหรับ location
}

// Drop Zone Component
const DropZone = ({ 
  onDrop, 
  isActive, 
  position 
}: { 
  onDrop: (position: 'before' | 'after') => void; 
  isActive: boolean; 
  position: 'before' | 'after';
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(position);
  };

  return (
    <div
      className={`h-2 transition-all duration-200 ${
        isActive 
          ? 'bg-blue-500/50 border-2 border-dashed border-blue-400' 
          : 'bg-transparent hover:bg-slate-600/30'
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    />
  );
};

// Field Settings Dialog
const FieldSettingsDialog = ({ 
  field, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  field: FormWidget; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (updates: Partial<FormWidget>) => void;
}) => {
  const [settings, setSettings] = useState<Partial<FormWidget>>({
    label: field.label,
    placeholder: field.placeholder || '',
    required: field.required || false,
    options: field.options || [],
    fileTypes: field.fileTypes || ['image/*'],
    maxFileSize: field.maxFileSize || 5,
    multiple: field.multiple || false,
    allowCurrentLocation: field.allowCurrentLocation || true,
    showMap: field.showMap || true,
    defaultLatitude: field.defaultLatitude || 13.7563,
    defaultLongitude: field.defaultLongitude || 100.5018
  });

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const addOption = () => {
    setSettings(prev => ({
      ...prev,
      options: [...(prev.options || []), `Option ${(prev.options?.length || 0) + 1}`]
    }));
  };

  const removeOption = (index: number) => {
    setSettings(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }));
  };

  const updateOption = (index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      options: prev.options?.map((option, i) => i === index ? value : option) || []
    }));
  };

  const addFileType = () => {
    setSettings(prev => ({
      ...prev,
      fileTypes: [...(prev.fileTypes || []), 'image/*']
    }));
  };

  const removeFileType = (index: number) => {
    setSettings(prev => ({
      ...prev,
      fileTypes: prev.fileTypes?.filter((_, i) => i !== index) || []
    }));
  };

  const updateFileType = (index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      fileTypes: prev.fileTypes?.map((type, i) => i === index ? value : type) || []
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-200">แก้ไข Field Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Label */}
          <div>
            <Label className="text-sm text-slate-300">Label</Label>
            <Input
              value={settings.label}
              onChange={(e) => setSettings(prev => ({ ...prev, label: e.target.value }))}
              placeholder="Enter field label"
              className="mt-1"
            />
          </div>

          {/* Placeholder */}
          <div>
            <Label className="text-sm text-slate-300">Placeholder</Label>
            <Input
              value={settings.placeholder}
              onChange={(e) => setSettings(prev => ({ ...prev, placeholder: e.target.value }))}
              placeholder="Enter placeholder text"
              className="mt-1"
            />
          </div>

          {/* Required */}
          <div className="flex items-center justify-between">
            <Label className="text-sm text-slate-300">Required Field</Label>
            <Switch
              checked={settings.required}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, required: checked }))}
            />
          </div>

          {/* Options for Select */}
          {field.type === 'select' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm text-slate-300">Options</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="h-7 px-2"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {settings.options?.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Upload Settings */}
          {field.type === 'file' && (
            <>
              {/* Multiple Files */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-300">Multiple Files</Label>
                <Switch
                  checked={settings.multiple}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, multiple: checked }))}
                />
              </div>

              {/* Max File Size */}
              <div>
                <Label className="text-sm text-slate-300">Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) || 5 }))}
                  placeholder="5"
                  className="mt-1"
                />
              </div>

              {/* File Types */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-slate-300">Allowed File Types</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFileType}
                    className="h-7 px-2"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {settings.fileTypes?.map((fileType, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        value={fileType}
                        onValueChange={(value) => updateFileType(index, value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image/*">Images (all)</SelectItem>
                          <SelectItem value="image/jpeg">JPEG</SelectItem>
                          <SelectItem value="image/png">PNG</SelectItem>
                          <SelectItem value="image/gif">GIF</SelectItem>
                          <SelectItem value="application/pdf">PDF</SelectItem>
                          <SelectItem value="application/msword">Word (.doc)</SelectItem>
                          <SelectItem value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Word (.docx)</SelectItem>
                          <SelectItem value="application/vnd.ms-excel">Excel (.xls)</SelectItem>
                          <SelectItem value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">Excel (.xlsx)</SelectItem>
                          <SelectItem value="text/plain">Text (.txt)</SelectItem>
                          <SelectItem value="*/*">All Files</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFileType(index)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Location Settings */}
          {field.type === 'location' && (
            <>
              {/* Allow Current Location */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-300">Allow Current Location</Label>
                <Switch
                  checked={settings.allowCurrentLocation}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowCurrentLocation: checked }))}
                />
              </div>

              {/* Show Map */}
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-300">Show Map</Label>
                <Switch
                  checked={settings.showMap}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showMap: checked }))}
                />
              </div>

              {/* Default Latitude */}
              <div>
                <Label className="text-sm text-slate-300">Default Latitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={settings.defaultLatitude}
                  onChange={(e) => setSettings(prev => ({ ...prev, defaultLatitude: parseFloat(e.target.value) || 13.7563 }))}
                  placeholder="13.7563"
                  className="mt-1"
                />
              </div>

              {/* Default Longitude */}
              <div>
                <Label className="text-sm text-slate-300">Default Longitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={settings.defaultLongitude}
                  onChange={(e) => setSettings(prev => ({ ...prev, defaultLongitude: parseFloat(e.target.value) || 100.5018 }))}
                  placeholder="100.5018"
                  className="mt-1"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              ยกเลิก
            </Button>
            <Button onClick={handleSave} className="flex-1">
              บันทึก
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Widget Components
const WidgetItem = ({ widget, onDragStart }: { widget: FormWidget; onDragStart: (e: React.DragEvent, widget: FormWidget) => void }) => {
  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'text': return <Input className="w-4 h-4" />;
      case 'textarea': return <FileText className="w-4 h-4" />;
      case 'select': return <Hash className="w-4 h-4" />;
      case 'checkbox': return <CheckSquare className="w-4 h-4" />;
      case 'number': return <Hash className="w-4 h-4" />;
      case 'email': return <Input className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'date': return <Calendar className="w-4 h-4" />;
      case 'file': return <Upload className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      default: return <Input className="w-4 h-4" />;
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, widget)}
      className="flex items-center gap-2 p-3 bg-slate-700/50 border border-slate-600 rounded-lg cursor-move hover:bg-slate-600/50 transition-colors"
    >
      {getWidgetIcon(widget.type)}
      <span className="text-sm text-slate-200">{widget.label}</span>
    </div>
  );
};

// Form Field Component
const FormField = ({ 
  field, 
  onRemove, 
  onUpdate,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  dragOverId,
  index
}: { 
  field: FormWidget; 
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: Partial<FormWidget>) => void;
  onDragStart: (e: React.DragEvent, field: FormWidget) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDrop: (targetId: string, position: 'before' | 'after') => void;
  isDragging: boolean;
  dragOverId: string | null;
  index: number;
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <InputComponent
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full"
          />
        );
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full"
          />
        );
      case 'number':
        return (
          <InputComponent
            type="number"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            className="w-full"
          />
        );
      case 'date':
        return (
          <InputComponent
            type="date"
            className="w-full"
          />
        );
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || "Select an option"} />
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
            <Checkbox id={field.id} />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        );
      case 'file':
        return (
          <div className="space-y-2">
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm text-slate-300 mb-1">
                {field.placeholder || "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-slate-500">
                {field.fileTypes?.join(', ')} • Max {field.maxFileSize}MB
                {field.multiple && ' • Multiple files allowed'}
              </p>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="space-y-3">
            {/* Map Preview */}
            {field.showMap && (
              <div className="border border-slate-600 rounded-lg p-4 bg-slate-800/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">แผนที่</span>
                  </div>
                  {field.allowCurrentLocation && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Simulate getting current location
                        const mockLocation = {
                          lat: field.defaultLatitude || 13.7563,
                          lng: field.defaultLongitude || 100.5018
                        };
                        setSelectedLocation(mockLocation);
                      }}
                      className="text-slate-300 border-slate-600 hover:bg-slate-700"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      ตำแหน่งปัจจุบัน
                    </Button>
                  )}
                </div>
                
                {/* Map Placeholder */}
                <div className="w-full h-48 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center relative">
                  <div className="text-center text-slate-400">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">คลิกเพื่อเลือกตำแหน่งบนแผนที่</p>
                    {selectedLocation && (
                      <p className="text-xs mt-1">
                        {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                  
                  {/* Location Marker */}
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

            {/* Coordinates Display */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-slate-400">Latitude</Label>
                <InputComponent
                  type="number"
                  step="any"
                  value={selectedLocation?.lat || field.defaultLatitude || ''}
                  onChange={(e) => {
                    const lat = parseFloat(e.target.value);
                    setSelectedLocation(prev => ({ 
                      lat, 
                      lng: prev?.lng || field.defaultLongitude || 100.5018 
                    }));
                  }}
                  placeholder="13.7563"
                  className="w-full text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-400">Longitude</Label>
                <InputComponent
                  type="number"
                  step="any"
                  value={selectedLocation?.lng || field.defaultLongitude || ''}
                  onChange={(e) => {
                    const lng = parseFloat(e.target.value);
                    setSelectedLocation(prev => ({ 
                      lat: prev?.lat || field.defaultLatitude || 13.7563, 
                      lng 
                    }));
                  }}
                  placeholder="100.5018"
                  className="w-full text-sm"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <Label className="text-xs text-slate-400">ที่อยู่ (ถ้ามี)</Label>
              <InputComponent
                placeholder="กรอกที่อยู่เพิ่มเติม"
                className="w-full text-sm"
              />
            </div>
          </div>
        );
      default:
        return <InputComponent placeholder="Field" className="w-full" />;
    }
  };

  const isDragOver = dragOverId === field.id;

  return (
    <>
      <div className="relative">
        {/* Top Drop Zone */}
        <DropZone
          onDrop={(position) => onDrop(field.id, position)}
          isActive={isDragOver && isDragging}
          position="before"
        />
        
        <div 
          className={`p-4 bg-slate-700/30 border border-slate-600 rounded-lg relative group transition-all duration-200 ${
            isDragOver && isDragging ? 'ring-2 ring-blue-500/50' : ''
          }`}
          draggable
          onDragStart={(e) => onDragStart(e, field)}
          onDragOver={(e) => onDragOver(e, field.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="cursor-move text-slate-400 hover:text-slate-300">
                <GripVertical className="w-4 h-4" />
              </div>
              <Label className="text-sm font-medium text-slate-200">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </Label>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300"
                title="แก้ไข Settings"
              >
                <Settings className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(field.id)}
                className="h-7 w-7 p-0 text-red-400 hover:text-red-300"
                title="ลบ Field"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          {renderField()}
        </div>

        {/* Bottom Drop Zone */}
        <DropZone
          onDrop={(position) => onDrop(field.id, position)}
          isActive={isDragOver && isDragging}
          position="after"
        />
      </div>

      <FieldSettingsDialog
        field={field}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={(updates) => onUpdate(field.id, updates)}
      />
    </>
  );
};

export const ComplaintFormManageModal = ({ complaintForm, onClose }: ComplaintFormManageModalProps) => {
  const [status, setStatus] = useState(complaintForm?.status || "");
  const [actionNotes, setActionNotes] = useState("");
  const [formFields, setFormFields] = useState<FormWidget[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [draggedField, setDraggedField] = useState<FormWidget | null>(null);
  const [formSlug, setFormSlug] = useState(complaintForm?.slug || "");
  const { toast } = useToast();

  // Available widgets
  const availableWidgets: FormWidget[] = [
    { id: 'text-1', type: 'text', label: 'Text Input', placeholder: 'Enter text' },
    { id: 'textarea-1', type: 'textarea', label: 'Text Area', placeholder: 'Enter description' },
    { id: 'email-1', type: 'email', label: 'Email', placeholder: 'Enter email' },
    { id: 'phone-1', type: 'phone', label: 'Phone', placeholder: 'Enter phone number' },
    { id: 'number-1', type: 'number', label: 'Number', placeholder: 'Enter number' },
    { id: 'date-1', type: 'date', label: 'Date', placeholder: 'Select date' },
    { id: 'select-1', type: 'select', label: 'Dropdown', options: ['Option 1', 'Option 2', 'Option 3'] },
    { id: 'checkbox-1', type: 'checkbox', label: 'Checkbox' },
    { id: 'file-1', type: 'file', label: 'File Upload', placeholder: 'Upload files', fileTypes: ['image/*'], maxFileSize: 5, multiple: false },
    { id: 'location-1', type: 'location', label: 'Location Picker', placeholder: 'Select location', allowCurrentLocation: true, showMap: true, defaultLatitude: 13.7563, defaultLongitude: 100.5018 },
  ];

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleDragStart = (e: React.DragEvent, widget: FormWidget) => {
    e.dataTransfer.setData('application/json', JSON.stringify(widget));
  };

  const handleFieldDragStart = (e: React.DragEvent, field: FormWidget) => {
    setIsDragging(true);
    setDraggedField(field);
    e.dataTransfer.setData('application/json', JSON.stringify({ type: 'field', field }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFieldDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const widgetData = e.dataTransfer.getData('application/json');
    if (widgetData) {
      const data = JSON.parse(widgetData);
      
      if (data.type === 'field') {
        // Reordering existing field
        return;
      }
      
      // Adding new widget from sidebar
      const widget: FormWidget = data;
      const newWidget: FormWidget = {
        ...widget,
        id: `${widget.type}-${Date.now()}`,
      };
      setFormFields(prev => [...prev, newWidget]);
      toast({
        title: "Widget Added",
        description: `${widget.label} has been added to the form`,
      });
    }
  };

  const handleFieldDrop = (targetId: string, position: 'before' | 'after') => {
    if (!draggedField || draggedField.id === targetId) return;

    setFormFields(prev => {
      const newFields = [...prev];
      const draggedIndex = newFields.findIndex(f => f.id === draggedField.id);
      const targetIndex = newFields.findIndex(f => f.id === targetId);
      
      // Remove dragged field
      newFields.splice(draggedIndex, 1);
      
      // Calculate new position
      let newIndex = targetIndex;
      if (position === 'after') {
        newIndex = targetIndex + 1;
      }
      if (draggedIndex < targetIndex) {
        newIndex = targetIndex;
      }
      
      // Insert at new position
      newFields.splice(newIndex, 0, draggedField);
      
      return newFields;
    });

    toast({
      title: "Field Moved",
      description: `Field "${draggedField.label}" has been moved`,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverId(null);
    setDraggedField(null);
  };

  const handleRemoveField = (id: string) => {
    setFormFields(prev => prev.filter(field => field.id !== id));
    toast({
      title: "Field Removed",
      description: "Field has been removed from the form",
    });
  };

  const handleUpdateField = (id: string, updates: Partial<FormWidget>) => {
    setFormFields(prev => prev.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
    toast({
      title: "Field Updated",
      description: "Field settings have been updated",
    });
  };

  const handleSaveForm = () => {
    // Save form configuration
    console.log('Form Fields:', formFields);
    console.log('Form Slug:', formSlug);
    toast({
      title: "Form Saved",
      description: "Form configuration has been saved successfully",
    });
  };

  if (!complaintForm) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="
      fixed top-0 right-0 w-full lg:w-[60vw]
      left-auto bottom-0 transform-none
      max-w-full overflow-y-auto shadow-xl p-0
      data-[state=open]:!animate-slide-in-right
      data-[state=closed]:!animate-slide-out-right
    "
      >
        <div className="flex gap-1 h-full">
          {/* Widgets Panel */}
          <div className="rounded-[10px] w-[40%] h-full bg-slate-800/50 border border-slate-600" id="widgets">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Available Widgets</h3>
              <div className="space-y-2">
                {availableWidgets.map((widget) => (
                  <WidgetItem
                    key={widget.id}
                    widget={widget}
                    onDragStart={handleDragStart}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form Builder Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-200">Form Builder</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormFields([])}
                    className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  >
                    Clear All
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveForm}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Form
                  </Button>
                </div>
              </div>
              
              {/* Form Slug Section */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-300 flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Form URL Slug
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="form-slug"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormSlug(generateSlug(complaintForm?.title || 'form'))}
                    className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  URL: /forms/{formSlug || 'your-slug'}
                </p>
              </div>
            </div>

            <div 
              className="rounded-[10px] border border-slate-600 w-full h-full bg-slate-800/50 p-4 overflow-y-auto" 
              id="content-form"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
            >
              {formFields.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-slate-400">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-lg font-medium mb-2">Drag widgets here to build your form</p>
                    <p className="text-sm">Start by dragging widgets from the left panel</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {formFields.map((field, index) => (
                    <FormField
                      key={field.id}
                      field={field}
                      index={index}
                      onRemove={handleRemoveField}
                      onUpdate={handleUpdateField}
                      onDragStart={handleFieldDragStart}
                      onDragOver={handleFieldDragOver}
                      onDrop={handleFieldDrop}
                      isDragging={isDragging}
                      dragOverId={dragOverId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};