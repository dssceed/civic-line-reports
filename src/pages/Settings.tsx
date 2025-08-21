import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Settings as SettingsIcon, Bell, Database, Edit, RotateCcw, Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

interface LineNotification {
  id: string;
  name: string;
  channelAccessToken: string;
  channelSecret: string;
  isActive: boolean;
}

const Settings = () => {
  const [lineNotifications, setLineNotifications] = useState<LineNotification[]>([
    {
      id: "1",
      name: "Line Official Account หลัก",
      channelAccessToken: "",
      channelSecret: "",
      isActive: true
    }
  ]);

  const addLineNotification = () => {
    const newNotification: LineNotification = {
      id: Date.now().toString(),
      name: `Line Notification ${lineNotifications.length + 1}`,
      channelAccessToken: "",
      channelSecret: "",
      isActive: false
    };
    setLineNotifications([...lineNotifications, newNotification]);
  };

  const removeLineNotification = (id: string) => {
    if (lineNotifications.length > 1) {
      setLineNotifications(lineNotifications.filter(notification => notification.id !== id));
    }
  };

  const updateLineNotification = (id: string, field: keyof LineNotification, value: string | boolean) => {
    setLineNotifications(lineNotifications.map(notification => 
      notification.id === id ? { ...notification, [field]: value } : notification
    ));
  };

  const users = [
    { id: 1, name: "นาย วิศวกร ช่างซ่อม", email: "engineer@municipality.gov", role: "เจ้าหน้าที่ผู้รับผิดชอบ", status: "active" },
    { id: 2, name: "นาง สุมาลี รับเรื่อง", email: "sumalee@municipality.gov", role: "เจ้าหน้าที่รับเรื่อง", status: "active" },
    { id: 3, name: "นาย ผู้จัดการ ระบบ", email: "admin@municipality.gov", role: "ผู้ดูแลระบบ", status: "active" },
  ];

  const categories = [
    { id: 1, name: "ไฟฟ้าสาธารณะ", count: 45, active: true },
    { id: 2, name: "ถนน", count: 38, active: true },
    { id: 3, name: "ขยะสิ่งปฏิกูล", count: 32, active: true },
    { id: 4, name: "ท่อระบายน้ำ", count: 28, active: true },
    { id: 5, name: "อื่นๆ", count: 18, active: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">ตั้งค่าระบบ</h1>
          <p className="text-blue-300/70">จัดการการตั้งค่าและข้อมูลหลักของระบบ</p>
        </div>

        <div className="space-y-6">
          {/* การแจ้งเตือน */}
          <Card className="glass-effect border-blue-500/30 neon-glow bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-blue-100 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                การตั้งค่าการแจ้งเตือน
              </CardTitle>
              <CardDescription className="text-blue-300/70">กำหนดการแจ้งเตือนต่างๆ ของระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* การแจ้งเตือนระบบ */}
              <div className="rounded-lg border border-blue-500/30 bg-slate-900/50 overflow-hidden neon-glow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ประเภทการแจ้งเตือน</TableHead>
                      <TableHead>คำอธิบาย</TableHead>
                      <TableHead className="text-right">สถานะ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">แจ้งเตือนเรื่องใหม่</TableCell>
                      <TableCell className="text-blue-300/80">แจ้งเตือนทันทีเมื่อมีเรื่องร้องเรียนใหม่</TableCell>
                      <TableCell className="text-right">
                        <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">แจ้งเตือนเรื่องด่วน</TableCell>
                      <TableCell className="text-blue-300/80">แจ้งเตือนพิเศษสำหรับเรื่องที่มีความสำคัญสูง</TableCell>
                      <TableCell className="text-right">
                        <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">แจ้งเตือนเรื่องค้างนาน</TableCell>
                      <TableCell className="text-blue-300/80">แจ้งเตือนเรื่องที่ไม่มีการอัปเดตเป็นเวลานาน</TableCell>
                      <TableCell className="text-right">
                        <Switch className="data-[state=checked]:bg-blue-600" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* การตั้งค่า Line Notification */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-100">การตั้งค่า Line Notification</h3>
                  <Button 
                    onClick={addLineNotification}
                    variant="outline" 
                    size="sm"
                    className="border-blue-500/30 text-blue-200 hover:bg-blue-600/20"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่ม Line Notification
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {lineNotifications.map((notification, index) => (
                    <div key={notification.id} className="p-4 bg-slate-800/30 border border-blue-500/20 rounded-lg glass-effect">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={notification.isActive}
                            onCheckedChange={(checked) => updateLineNotification(notification.id, 'isActive', checked)}
                            className="data-[state=checked]:bg-blue-600"
                          />
                          <Input
                            value={notification.name}
                            onChange={(e) => updateLineNotification(notification.id, 'name', e.target.value)}
                            className="w-64 bg-slate-800/80 border-blue-500/30 text-blue-100"
                            placeholder="ชื่อ Line Notification"
                          />
                        </div>
                        {lineNotifications.length > 1 && (
                          <Button
                            onClick={() => removeLineNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-blue-100 text-sm">Line Channel Access Token</Label>
                          <Input 
                            value={notification.channelAccessToken}
                            onChange={(e) => updateLineNotification(notification.id, 'channelAccessToken', e.target.value)}
                            placeholder="ใส่ Channel Access Token สำหรับส่งข้อความผ่าน Line" 
                            className="mt-2 bg-slate-800/80 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60" 
                          />
                        </div>
                        
                        <div>
                          <Label className="text-blue-100 text-sm">Line Channel Secret</Label>
                          <Input 
                            type="password" 
                            value={notification.channelSecret}
                            onChange={(e) => updateLineNotification(notification.id, 'channelSecret', e.target.value)}
                            placeholder="ใส่ Channel Secret" 
                            className="mt-2 bg-slate-800/80 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* การตั้งค่าระบบ */}
          <Card className="glass-effect border-blue-500/30 neon-glow bg-slate-900/80">
            <CardHeader>
              <CardTitle className="text-blue-100 flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                การตั้งค่าระบบ
              </CardTitle>
              <CardDescription className="text-blue-300/70">การตั้งค่าทั่วไปของระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* ข้อมูลหน่วยงาน */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-100 mb-4">ข้อมูลหน่วยงาน</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-blue-100">ชื่อหน่วยงาน</Label>
                      <Input defaultValue="เทศบาลเมือง" className="bg-slate-800/80 border-blue-500/30 text-blue-100" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-100">เขตพื้นที่รับผิดชอบ</Label>
                      <Input defaultValue="เขตเมือง จังหวัดตัวอย่าง" className="bg-slate-800/80 border-blue-500/30 text-blue-100" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-100">เบอร์โทรศัพท์ติดต่อ</Label>
                      <Input defaultValue="02-XXX-XXXX" className="bg-slate-800/80 border-blue-500/30 text-blue-100" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-blue-100">อีเมลติดต่อ</Label>
                      <Input defaultValue="contact@municipality.gov" className="bg-slate-800/80 border-blue-500/30 text-blue-100" />
                    </div>
                  </div>
                </div>

                {/* การตั้งค่าระบบ */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-100 mb-4">การตั้งค่าระบบ</h3>
                  <div className="rounded-lg border border-blue-500/30 bg-slate-900/50 overflow-hidden neon-glow">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>การตั้งค่าระบบ</TableHead>
                          <TableHead>คำอธิบาย</TableHead>
                          <TableHead className="text-right">สถานะ</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">โหมดบำรุงรักษา</TableCell>
                          <TableCell className="text-blue-300/80">ปิดระบบชั่วคราวเพื่อบำรุงรักษา</TableCell>
                          <TableCell className="text-right">
                            <Switch className="data-[state=checked]:bg-blue-600" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">บันทึก Log การใช้งาน</TableCell>
                          <TableCell className="text-blue-300/80">เก็บประวัติการใช้งานเพื่อการตรวจสอบ</TableCell>
                          <TableCell className="text-right">
                            <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">การสำรองข้อมูลอัตโนมัติ</TableCell>
                          <TableCell className="text-blue-300/80">สำรองข้อมูลทุกวันเวลา 02:00 น.</TableCell>
                          <TableCell className="text-right">
                            <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white neon-glow">
                    บันทึกการตั้งค่า
                  </Button>
                  <Button variant="outline" className="border-blue-500/30 text-blue-200 hover:bg-blue-600/20">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    รีเซ็ตการตั้งค่า
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
