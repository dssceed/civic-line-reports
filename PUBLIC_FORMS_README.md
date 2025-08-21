# Public Forms System

ระบบฟอร์มสาธารณะสำหรับรับเรื่องร้องเรียนจากประชาชน

## โครงสร้างไฟล์

```
src/
├── pages/
│   ├── PublicFormList.tsx      # หน้าแสดงรายการฟอร์ม
│   └── PublicForm.tsx          # หน้าฟอร์มสำหรับกรอกข้อมูล
├── domains/complaintForms/
│   ├── components/
│   │   └── ComplaintFormManageModal.tsx  # Modal สำหรับจัดการฟอร์ม (Admin)
│   ├── services/
│   │   └── publicForm.service.ts         # Service สำหรับจัดการข้อมูล
│   ├── hooks/
│   │   └── usePublicForms.ts             # Custom hooks
│   ├── types/
│   │   └── publicForm.types.ts           # TypeScript types
│   └── index.ts                          # Export file
└── routes/
    └── config.tsx                        # Route configuration
```

## การใช้งาน

### 1. หน้าแสดงรายการฟอร์ม (`/forms`)
- แสดงฟอร์มทั้งหมดที่เปิดใช้งาน
- มีระบบค้นหาและกรองตามหมวดหมู่
- แสดงสถิติการใช้งาน

### 2. หน้าฟอร์ม (`/forms/:formId`)
- แสดงฟอร์มตาม ID ที่ระบุ
- รองรับฟิลด์หลายประเภท:
  - Text, Email, Phone
  - Textarea
  - Select (Dropdown)
  - Checkbox
  - Number, Date
  - File Upload
  - Location Picker (พร้อมแผนที่)

### 3. ระบบจัดการฟอร์ม (Admin)
- สร้างและแก้ไขฟอร์ม
- กำหนดฟิลด์และประเภทข้อมูล
- เปิด/ปิดการใช้งานฟอร์ม

## ฟีเจอร์หลัก

### ฟิลด์ที่รองรับ
1. **Text Input** - ข้อความทั่วไป
2. **Email** - อีเมล
3. **Phone** - เบอร์โทรศัพท์
4. **Textarea** - ข้อความยาว
5. **Select** - ตัวเลือกแบบ dropdown
6. **Checkbox** - ช่องติ๊ก
7. **Number** - ตัวเลข
8. **Date** - วันที่
9. **File Upload** - อัปโหลดไฟล์
10. **Location** - เลือกตำแหน่งบนแผนที่

### การตรวจสอบข้อมูล
- ตรวจสอบฟิลด์ที่จำเป็น (required)
- ตรวจสอบรูปแบบข้อมูล (email, phone)
- ตรวจสอบขนาดไฟล์
- ตรวจสอบประเภทไฟล์

### การส่งข้อมูล
- ส่งข้อมูลไปยัง API
- แสดงสถานะการส่ง
- สร้าง Reference ID
- แสดงหน้าสำเร็จ

## การติดตั้งและใช้งาน

### 1. เพิ่ม Routes
```typescript
// src/routes/config.tsx
{ path: '/forms', element: <PublicFormList />, public: true },
{ path: '/forms/:formId', element: <PublicForm />, public: true },
```

### 2. ใช้งาน Hooks
```typescript
import { usePublicForms, usePublicForm, useFormSubmission } from '@/domains/complaintForms';

// ดึงรายการฟอร์ม
const { forms, loading, error } = usePublicForms();

// ดึงข้อมูลฟอร์มเฉพาะ
const { form, loading, error } = usePublicForm(formId);

// ส่งฟอร์ม
const { submitForm, submitting } = useFormSubmission();
```

### 3. ใช้งาน Service
```typescript
import { PublicFormService } from '@/domains/complaintForms';

// ดึงข้อมูลฟอร์ม
const form = await PublicFormService.getFormById(formId);

// ส่งฟอร์ม
const response = await PublicFormService.submitFormResponse(formId, data);
```

## การปรับแต่ง

### เพิ่มฟิลด์ใหม่
1. เพิ่ม type ใน `FormField` interface
2. เพิ่มการ render ใน `renderField` function
3. เพิ่มการจัดการข้อมูลใน service

### เพิ่มการตรวจสอบ
1. แก้ไข `validateForm` function
2. เพิ่มการตรวจสอบตามความต้องการ

### ปรับแต่ง UI
1. แก้ไข CSS classes
2. เพิ่ม animations
3. ปรับแต่ง responsive design

## การพัฒนาเพิ่มเติม

### ฟีเจอร์ที่แนะนำ
1. **ระบบแจ้งเตือน** - แจ้งเตือนเมื่อมีการส่งฟอร์มใหม่
2. **ระบบติดตาม** - ติดตามสถานะการแก้ไขปัญหา
3. **ระบบรายงาน** - สร้างรายงานสถิติ
4. **ระบบไฟล์แนบ** - อัปโหลดไฟล์หลายประเภท
5. **ระบบแผนที่** - แสดงตำแหน่งบนแผนที่จริง

### การปรับปรุงประสิทธิภาพ
1. **Lazy Loading** - โหลดข้อมูลตามต้องการ
2. **Caching** - เก็บข้อมูลใน cache
3. **Optimization** - ปรับปรุงการ render
4. **Error Handling** - จัดการข้อผิดพลาดที่ดีขึ้น

## การทดสอบ

### Unit Tests
- ทดสอบ hooks
- ทดสอบ service functions
- ทดสอบ validation logic

### Integration Tests
- ทดสอบการส่งฟอร์ม
- ทดสอบการโหลดข้อมูล
- ทดสอบ error handling

### E2E Tests
- ทดสอบการใช้งานจริง
- ทดสอบ responsive design
- ทดสอบ accessibility
