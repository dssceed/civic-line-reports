# Civic Line Reports

ระบบจัดการเรื่องร้องเรียนและแบบฟอร์มสาธารณะสำหรับหน่วยงานท้องถิ่น

## 📋 ภาพรวมโปรเจค

Civic Line Reports เป็นระบบจัดการเรื่องร้องเรียนและแบบฟอร์มสาธารณะที่พัฒนาด้วย React และ TypeScript โดยมีฟีเจอร์หลักดังนี้:

- **ระบบจัดการเรื่องร้องเรียน**: รับเรื่องร้องเรียนจากประชาชน พร้อมระบบติดตามสถานะ
- **แบบฟอร์มสาธารณะ**: สร้างและจัดการแบบฟอร์มสำหรับประชาชนกรอกข้อมูล
- **ระบบติดตาม**: ติดตามสถานะการดำเนินการเรื่องร้องเรียน
- **ระบบรายงาน**: สร้างรายงานสถิติต่างๆ
- **ระบบผู้ใช้**: จัดการสิทธิ์และบทบาทของผู้ใช้งาน
- **ระบบหมวดหมู่**: จัดหมวดหมู่เรื่องร้องเรียนและแบบฟอร์ม

## 🚀 ฟีเจอร์หลัก

### สำหรับประชาชน
- กรอกแบบฟอร์มร้องเรียนออนไลน์
- ติดตามสถานะการดำเนินการ
- อัปโหลดรูปภาพและไฟล์แนบ
- ระบุตำแหน่งบนแผนที่

### สำหรับเจ้าหน้าที่
- ดูรายการเรื่องร้องเรียนทั้งหมด
- อัปเดตสถานะการดำเนินการ
- เพิ่มบันทึกกิจกรรม
- จัดการหมวดหมู่และแบบฟอร์ม
- ดูรายงานสถิติ

### สำหรับผู้ดูแลระบบ
- จัดการผู้ใช้งานและสิทธิ์
- สร้างและแก้ไขแบบฟอร์ม
- ดูรายงานสถิติแบบละเอียด
- จัดการหมวดหมู่

## 🛠 เทคโนโลยีที่ใช้

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router DOM** - Routing
- **TanStack Query** - State Management & API Caching

### UI Components
- **Radix UI** - Headless UI Components
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component Library
- **Lucide React** - Icons
- **Sonner** - Toast Notifications

### Forms & Validation
- **React Hook Form** - Form Management
- **Zod** - Schema Validation
- **@hookform/resolvers** - Form Validation

### Maps & Location
- **Leaflet** - Interactive Maps
- **React Leaflet** - React Wrapper for Leaflet

### Charts & Data Visualization
- **Recharts** - Data Charts
- **React Day Picker** - Date Picker

### Internationalization
- **i18next** - Internationalization
- **react-i18next** - React i18n

### Development Tools
- **ESLint** - Code Linting
- **TypeScript ESLint** - TypeScript Linting
- **PostCSS** - CSS Processing
- **Autoprefixer** - CSS Vendor Prefixes

## 📁 โครงสร้างโปรเจค

```
src/
├── components/          # UI Components
│   ├── auth/           # Authentication Components
│   ├── layout/         # Layout Components
│   └── ui/             # Reusable UI Components
├── domains/            # Domain-specific Code
│   ├── auth/           # Authentication Domain
│   ├── categories/     # Categories Domain
│   ├── complaintForms/ # Public Forms Domain
│   ├── complaints/     # Complaints Domain
│   └── users/          # Users Domain
├── pages/              # Page Components
├── routes/             # Routing Configuration
├── providers/          # Context Providers
├── hooks/              # Custom Hooks
├── lib/                # Utility Functions
├── locales/            # Internationalization Files
└── common/             # Shared Types and Utilities
    └── types/          # TypeScript Type Definitions
```

## 🚀 วิธีติดตั้งและใช้งาน

### ความต้องการของระบบ
- Node.js 18+ 
- npm หรือ yarn

### การติดตั้ง

1. **Clone โปรเจค**
```bash
git clone <repository-url>
cd civic-line-reports
```

2. **ติดตั้ง Dependencies**
```bash
npm install
# หรือ
yarn install
```

3. **รันโปรเจคในโหมด Development**
```bash
npm run dev
# หรือ
yarn dev
```

4. **เปิดเบราว์เซอร์ไปที่**
```
http://localhost:8080
```

### Scripts ที่มี

```bash
# Development
npm run dev              # รันโปรเจคในโหมด development
npm run build:dev        # Build โปรเจคในโหมด development

# Production
npm run build            # Build โปรเจคสำหรับ production
npm run preview          # Preview production build

# Code Quality
npm run lint             # ตรวจสอบ code quality
```

## 🔐 ระบบสิทธิ์และบทบาท

### บทบาทผู้ใช้งาน
- **admin**: ผู้ดูแลระบบ - เข้าถึงฟีเจอร์ทั้งหมด
- **officer**: เจ้าหน้าที่ - จัดการเรื่องร้องเรียนและแบบฟอร์ม

### หน้าสาธารณะ
- `/` - หน้าหลัก
- `/home` - หน้าแรก
- `/login` - หน้าเข้าสู่ระบบ
- `/forms` - รายการแบบฟอร์มสาธารณะ
- `/forms/:formId` - แบบฟอร์มสำหรับกรอกข้อมูล
- `/tracking` - ติดตามสถานะ

### หน้าสำหรับผู้ใช้ที่เข้าสู่ระบบ
- `/dashboard` - แดชบอร์ด
- `/complaints` - จัดการเรื่องร้องเรียน
- `/reports` - รายงานสถิติ
- `/complaint-forms` - จัดการแบบฟอร์ม
- `/users` - จัดการผู้ใช้งาน
- `/categories` - จัดการหมวดหมู่
- `/settings` - ตั้งค่าระบบ

## 📊 ข้อมูลและประเภท

### ประเภทเรื่องร้องเรียน
- ไฟฟ้าสาธารณะ
- ถนน
- ขยะ
- ท่อระบายน้ำ

### สถานะเรื่องร้องเรียน
- ใหม่
- รอตรวจสอบ
- กำลังดำเนินการ
- เสร็จสิ้น

### ลำดับความสำคัญ
- ด่วน
- ปกติ

### ประเภทฟิลด์ในแบบฟอร์ม
- text - ข้อความ
- textarea - ข้อความหลายบรรทัด
- select - เลือกจากรายการ
- checkbox - เลือกหลายข้อ
- number - ตัวเลข
- email - อีเมล
- phone - เบอร์โทรศัพท์
- date - วันที่
- file - ไฟล์
- location - ตำแหน่ง

## 🌐 การรองรับหลายภาษา

ระบบรองรับภาษาไทยและภาษาอังกฤษ โดยใช้ i18next

### ไฟล์ภาษา
```
locales/
├── th/                 # ภาษาไทย
│   ├── auth.json
│   ├── common.json
│   ├── complaints.json
│   ├── dashboard.json
│   ├── forms.json
│   └── reports.json
└── en/                 # ภาษาอังกฤษ
    ├── auth.json
    ├── common.json
    ├── complaints.json
    ├── dashboard.json
    ├── forms.json
    └── reports.json
```

## 🔧 การพัฒนา

### การเพิ่มหน้าใหม่
1. สร้างไฟล์ใน `src/pages/`
2. เพิ่ม route ใน `src/routes/config.tsx`
3. เพิ่มการแปลภาษาใน `src/locales/`

### การเพิ่ม Component ใหม่
1. สร้างไฟล์ใน `src/components/` หรือ `src/domains/[domain]/components/`
2. Export จาก `src/domains/[domain]/components/index.ts`

### การเพิ่ม Type ใหม่
1. สร้างไฟล์ใน `src/common/types/` หรือ `src/domains/[domain]/types/`
2. Export จาก `src/common/types/index.ts`

## 📝 การ Deploy

### Build สำหรับ Production
```bash
npm run build
```

### ไฟล์ที่ได้
- `dist/` - ไฟล์ที่ build แล้ว
- `dist/index.html` - ไฟล์หลัก
- `dist/assets/` - ไฟล์ CSS, JS และ Assets

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📄 License

โปรเจคนี้อยู่ภายใต้ License [MIT](LICENSE)

## 📞 ติดต่อ

หากมีคำถามหรือข้อเสนอแนะ กรุณาติดต่อทีมพัฒนา
