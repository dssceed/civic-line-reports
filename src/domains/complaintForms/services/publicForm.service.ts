import type { FormField, PublicFormData } from '../types/publicForm.types';

// Mock API service for public forms
export class PublicFormService {
  private static forms: PublicFormData[] = [
    {
      id: "electrical-issues",
      name: "ฟอร์มแจ้งปัญหาไฟฟ้าสาธารณะ",
      description: "สำหรับแจ้งปัญหาเกี่ยวกับไฟฟ้าส่องสว่างตามถนน สวนสาธารณะ และพื้นที่สาธารณะต่างๆ",
      category: "ไฟฟ้าสาธารณะ",
      fields: [
        {
          id: "name",
          type: "text",
          label: "ชื่อผู้แจ้ง",
          required: true,
          placeholder: "กรอกชื่อ-นามสกุล"
        },
        {
          id: "phone",
          type: "phone",
          label: "เบอร์โทรศัพท์",
          required: true,
          placeholder: "กรอกเบอร์โทรศัพท์"
        },
        {
          id: "email",
          type: "email",
          label: "อีเมล",
          required: false,
          placeholder: "กรอกอีเมล (ถ้ามี)"
        },
        {
          id: "problem_type",
          type: "select",
          label: "ประเภทปัญหา",
          required: true,
          options: [
            "ไฟส่องสว่างไม่ทำงาน",
            "ไฟส่องสว่างแตก/เสียหาย",
            "ไฟส่องสว่างไม่เพียงพอ",
            "ไฟส่องสว่างส่องรบกวน",
            "อื่นๆ"
          ]
        },
        {
          id: "location_description",
          type: "textarea",
          label: "รายละเอียดสถานที่",
          required: true,
          placeholder: "อธิบายตำแหน่งที่เกิดปัญหา เช่น ใกล้กับอะไร อยู่ตรงไหน"
        },
        {
          id: "problem_description",
          type: "textarea",
          label: "รายละเอียดปัญหา",
          required: true,
          placeholder: "อธิบายปัญหาที่พบอย่างละเอียด"
        },
        {
          id: "location",
          type: "location",
          label: "ตำแหน่งที่เกิดปัญหา",
          required: true,
          allowCurrentLocation: true,
          showMap: true,
          defaultLatitude: 13.7563,
          defaultLongitude: 100.5018
        },
        {
          id: "photos",
          type: "file",
          label: "รูปภาพประกอบ",
          required: false,
          fileTypes: ["image/*"],
          maxFileSize: 5,
          multiple: true
        },
        {
          id: "urgency",
          type: "select",
          label: "ระดับความเร่งด่วน",
          required: true,
          options: [
            "ปกติ",
            "เร่งด่วน",
            "เร่งด่วนมาก"
          ]
        },
        {
          id: "agree_terms",
          type: "checkbox",
          label: "ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว",
          required: true
        }
      ],
      isActive: true,
      responses: 45,
      createdAt: "2024-01-15",
      url: "/forms/electrical-issues"
    },
    {
      id: "road-issues",
      name: "ฟอร์มแจ้งปัญหาถนน-ทางเท้า",
      description: "สำหรับแจ้งปัญหาหลุมบ่อ ถนนชำรุด ทางเท้าแตกหัก และปัญหาการจราจร",
      category: "ถนน",
      fields: [
        {
          id: "name",
          type: "text",
          label: "ชื่อผู้แจ้ง",
          required: true,
          placeholder: "กรอกชื่อ-นามสกุล"
        },
        {
          id: "phone",
          type: "phone",
          label: "เบอร์โทรศัพท์",
          required: true,
          placeholder: "กรอกเบอร์โทรศัพท์"
        },
        {
          id: "problem_type",
          type: "select",
          label: "ประเภทปัญหา",
          required: true,
          options: [
            "หลุมบ่อบนถนน",
            "ถนนชำรุด",
            "ทางเท้าแตกหัก",
            "ป้ายจราจรเสียหาย",
            "ไฟจราจรไม่ทำงาน",
            "อื่นๆ"
          ]
        },
        {
          id: "location_description",
          type: "textarea",
          label: "รายละเอียดสถานที่",
          required: true,
          placeholder: "อธิบายตำแหน่งที่เกิดปัญหา เช่น ใกล้กับอะไร อยู่ตรงไหน"
        },
        {
          id: "problem_description",
          type: "textarea",
          label: "รายละเอียดปัญหา",
          required: true,
          placeholder: "อธิบายปัญหาที่พบอย่างละเอียด"
        },
        {
          id: "location",
          type: "location",
          label: "ตำแหน่งที่เกิดปัญหา",
          required: true,
          allowCurrentLocation: true,
          showMap: true,
          defaultLatitude: 13.7563,
          defaultLongitude: 100.5018
        },
        {
          id: "photos",
          type: "file",
          label: "รูปภาพประกอบ",
          required: false,
          fileTypes: ["image/*"],
          maxFileSize: 5,
          multiple: true
        },
        {
          id: "urgency",
          type: "select",
          label: "ระดับความเร่งด่วน",
          required: true,
          options: [
            "ปกติ",
            "เร่งด่วน",
            "เร่งด่วนมาก"
          ]
        },
        {
          id: "agree_terms",
          type: "checkbox",
          label: "ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว",
          required: true
        }
      ],
      isActive: true,
      responses: 73,
      createdAt: "2024-01-10",
      url: "/forms/road-issues"
    },
    {
      id: "waste-issues",
      name: "ฟอร์มแจ้งปัญหาขยะ",
      description: "สำหรับแจ้งปัญหาการเก็บขยะ ความสะอาด และการจัดการขยะในชุมชน",
      category: "ขยะ",
      fields: [
        {
          id: "name",
          type: "text",
          label: "ชื่อผู้แจ้ง",
          required: true,
          placeholder: "กรอกชื่อ-นามสกุล"
        },
        {
          id: "phone",
          type: "phone",
          label: "เบอร์โทรศัพท์",
          required: true,
          placeholder: "กรอกเบอร์โทรศัพท์"
        },
        {
          id: "waste_type",
          type: "select",
          label: "ประเภทขยะ",
          required: true,
          options: [
            "ขยะทั่วไป",
            "ขยะรีไซเคิล",
            "ขยะอันตราย",
            "ขยะอินทรีย์",
            "ขยะอิเล็กทรอนิกส์",
            "อื่นๆ"
          ]
        },
        {
          id: "area",
          type: "textarea",
          label: "พื้นที่ที่เกิดปัญหา",
          required: true,
          placeholder: "ระบุพื้นที่ที่เกิดปัญหาขยะ"
        },
        {
          id: "frequency",
          type: "select",
          label: "ความถี่ของปัญหา",
          required: true,
          options: [
            "ครั้งเดียว",
            "เป็นครั้งคราว",
            "บ่อยครั้ง",
            "ต่อเนื่อง"
          ]
        },
        {
          id: "description",
          type: "textarea",
          label: "รายละเอียดปัญหา",
          required: true,
          placeholder: "อธิบายปัญหาที่พบอย่างละเอียด"
        },
        {
          id: "location",
          type: "location",
          label: "ตำแหน่งที่เกิดปัญหา",
          required: true,
          allowCurrentLocation: true,
          showMap: true,
          defaultLatitude: 13.7563,
          defaultLongitude: 100.5018
        },
        {
          id: "photos",
          type: "file",
          label: "รูปภาพประกอบ",
          required: false,
          fileTypes: ["image/*"],
          maxFileSize: 5,
          multiple: true
        },
        {
          id: "agree_terms",
          type: "checkbox",
          label: "ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว",
          required: true
        }
      ],
      isActive: true,
      responses: 28,
      createdAt: "2024-01-05",
      url: "/forms/waste-issues"
    }
  ];

  // Get all active forms
  static async getAllForms(): Promise<PublicFormData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.forms.filter(form => form.isActive);
  }

  // Get form by ID
  static async getFormById(formId: string): Promise<PublicFormData | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const form = this.forms.find(f => f.id === formId && f.isActive);
    return form || null;
  }

  // Submit form response
  static async submitFormResponse(formId: string, data: any): Promise<{ success: boolean; message: string; referenceId?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate reference ID
    const referenceId = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    console.log('Form submission:', {
      formId,
      data,
      referenceId,
      timestamp: new Date().toISOString()
    });

    // In real implementation, this would save to database
    return {
      success: true,
      message: "ส่งฟอร์มสำเร็จ",
      referenceId
    };
  }

  // Get form statistics
  static async getFormStats(): Promise<{
    totalForms: number;
    totalResponses: number;
    categories: string[];
    recentForms: PublicFormData[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const activeForms = this.forms.filter(form => form.isActive);
    const totalResponses = activeForms.reduce((sum, form) => sum + form.responses, 0);
    const categories = Array.from(new Set(activeForms.map(form => form.category)));
    const recentForms = activeForms
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return {
      totalForms: activeForms.length,
      totalResponses,
      categories,
      recentForms
    };
  }
}
