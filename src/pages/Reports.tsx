
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Calendar, Download, Filter, TrendingUp } from "lucide-react";

const Reports = () => {
  // Mock data for charts
  const monthlyData = [
    { month: "ม.ค.", complaints: 45, resolved: 42 },
    { month: "ก.พ.", complaints: 52, resolved: 48 },
    { month: "มี.ค.", complaints: 38, resolved: 36 },
    { month: "เม.ย.", complaints: 65, resolved: 58 },
    { month: "พ.ค.", complaints: 71, resolved: 68 },
    { month: "มิ.ย.", complaints: 43, resolved: 40 }
  ];

  const categoryData = [
    { name: "ไฟฟ้าสาธารณะ", value: 35, color: "#6366f1" },
    { name: "ถนน", value: 28, color: "#8b5cf6" },
    { name: "ขยะ", value: 20, color: "#0ea5e9" },
    { name: "ท่อระบายน้ำ", value: 12, color: "#ec4899" },
    { name: "อื่นๆ", value: 5, color: "#06b6d4" }
  ];

  const trendData = [
    { date: "1 มิ.ย.", count: 12 },
    { date: "8 มิ.ย.", count: 19 },
    { date: "15 มิ.ย.", count: 8 },
    { date: "22 มิ.ย.", count: 15 },
    { date: "29 มิ.ย.", count: 22 }
  ];

  const hotspotData = [
    { area: "ถนนสายหลัก", complaints: 25, lat: 14.0583, lng: 100.6014 },
    { area: "ตลาดเทศบาล", complaints: 18, lat: 14.0593, lng: 100.6024 },
    { area: "สวนสาธารณะ", complaints: 12, lat: 14.0573, lng: 100.6004 },
    { area: "โรงเรียน", complaints: 8, lat: 14.0563, lng: 100.5994 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">รายงาน</h1>
            <p className="text-blue-300/80">สรุปข้อมูลและสถิติเรื่องร้องเรียน</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-slate-800/50 border-blue-500/30 text-blue-100 hover:bg-slate-800/70">
              <Filter className="mr-2 h-4 w-4" />
              ตัวกรอง
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 neon-glow">
              <Download className="mr-2 h-4 w-4" />
              ส่งออกข้อมูล
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-blue-500 neon-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">เรื่องร้องเรียนรวม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">314</div>
              <p className="text-xs text-blue-400/70">เดือนนี้</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-purple-500 neon-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">แก้ไขเสร็จสิ้น</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">292</div>
              <p className="text-xs text-blue-400/70">93% ของทั้งหมด</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-cyan-500 neon-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">เวลาเฉลี่ย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">2.3</div>
              <p className="text-xs text-blue-400/70">วัน ต่อเรื่อง</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-pink-500 neon-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">ความพึงพอใจ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-400">4.2</div>
              <p className="text-xs text-blue-400/70">จาก 5 คะแนน</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
            <CardHeader>
              <CardTitle className="text-blue-100">แนวโน้มรายเดือน</CardTitle>
              <CardDescription className="text-blue-300/80">เปรียบเทียบจำนวนเรื่องร้องเรียนและเรื่องที่แก้ไข</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #6366f1',
                      borderRadius: '8px',
                      color: '#f8fafc'
                    }} 
                  />
                  <Bar dataKey="complaints" fill="#6366f1" name="เรื่องร้องเรียน" />
                  <Bar dataKey="resolved" fill="#0ea5e9" name="แก้ไขแล้ว" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
            <CardHeader>
              <CardTitle className="text-blue-100">แยกตามหมวดหมู่</CardTitle>
              <CardDescription className="text-blue-300/80">สัดส่วนเรื่องร้องเรียนในแต่ละหมวดหมู่</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #6366f1',
                      borderRadius: '8px',
                      color: '#f8fafc'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Trend Analysis */}
        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              แนวโน้มรายสัปดาห์
            </CardTitle>
            <CardDescription className="text-blue-300/80">จำนวนเรื่องร้องเรียนใหม่ในแต่ละสัปดาห์</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #6366f1',
                    borderRadius: '8px',
                    color: '#f8fafc'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hotspot Areas */}
        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100">พื้นที่เสี่ยง (Hotspots)</CardTitle>
            <CardDescription className="text-blue-300/80">พื้นที่ที่มีเรื่องร้องเรียนมากที่สุด</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hotspotData.map((hotspot, index) => (
                <div key={hotspot.area} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500' : 
                      index === 1 ? 'bg-orange-500' : 
                      index === 2 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="font-medium text-blue-100">{hotspot.area}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-400">{hotspot.complaints}</div>
                    <div className="text-xs text-blue-400/70">เรื่องร้องเรียน</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Reports;
