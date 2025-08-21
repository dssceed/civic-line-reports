
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TrendingUp, Clock, CheckCircle, AlertCircle, BarChart3, PieChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const { t } = useTranslation('dashboard');

  // Mock data - replace with real data from API
  const stats = {
    newComplaints: 15,
    inProgress: 28,
    completed: 142,
    urgent: 3
  };

  // Mock data for weekly complaints chart
  const weeklyComplaintsData = [
    { day: "จันทร์", new: 8, inProgress: 12, completed: 15, urgent: 2 },
    { day: "อังคาร", new: 12, inProgress: 18, completed: 22, urgent: 1 },
    { day: "พุธ", new: 15, inProgress: 25, completed: 18, urgent: 3 },
    { day: "พฤหัสบดี", new: 10, inProgress: 20, completed: 25, urgent: 0 },
    { day: "ศุกร์", new: 18, inProgress: 30, completed: 28, urgent: 2 },
    { day: "เสาร์", new: 5, inProgress: 8, completed: 12, urgent: 1 },
    { day: "อาทิตย์", new: 3, inProgress: 5, completed: 8, urgent: 0 }
  ];

  // Mock data for category comparison chart
  const categoryComparisonData = [
    { name: "ไฟฟ้าสาธารณะ", value: 35, color: "#3B82F6" },
    { name: "ถนน", value: 28, color: "#10B981" },
    { name: "ขยะ", value: 22, color: "#F59E0B" },
    { name: "ท่อระบายน้ำ", value: 15, color: "#EF4444" }
  ];

  // Mock data for new vs total complaints
  const newVsTotalData = [
    { name: "ใหม่", value: 71, color: "#3B82F6" },
    { name: "ทั้งหมด", value: 185, color: "#6B7280" }
  ];

  const recentComplaints = [
    {
      id: "C2024001",
      category: "electrical",
      description: "ไฟถนนดับในซอย 15",
      status: "new",
      date: "2024-05-31",
      priority: "normal"
    },
    {
      id: "C2024002", 
      category: "road",
      description: "หลุมบ่อบนถนนสายหลัก",
      status: "inProgress",
      date: "2024-05-30",
      priority: "urgent"
    },
    {
      id: "C2024003",
      category: "waste",
      description: "รถขยะไม่มาเก็บตามกำหนด",
      status: "pending",
      date: "2024-05-30",
      priority: "normal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/20 text-blue-300 border border-blue-500/50";
      case "inProgress": return "bg-purple-600/20 text-purple-300 border border-purple-600/50";
      case "pending": return "bg-cyan-600/20 text-cyan-300 border border-cyan-600/50";
      case "completed": return "bg-green-600/20 text-green-300 border border-green-600/50";
      default: return "bg-slate-700/20 text-slate-400 border border-slate-700/50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-600/20 text-red-300 border border-red-600/50";
      case "normal": return "bg-slate-700/20 text-slate-400 border border-slate-700/50";
      default: return "bg-slate-700/20 text-slate-400 border border-slate-700/50";
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-blue-500/30 p-3 rounded-lg shadow-lg">
          <p className="text-blue-200 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text">{t('title')}</h1>
          <p className="text-blue-300/80">{t('description')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-blue-500 neon-glow hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">{t('newComplaints')}</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-300">{stats.newComplaints}</div>
              <p className="text-xs text-blue-400/70">{t('waitingForReceiving')}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-purple-600 neon-glow hover:shadow-xl hover:shadow-purple-600/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">{t('inProgress')}</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{stats.inProgress}</div>
              <p className="text-xs text-blue-400/70">{t('underReview')}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-green-600 neon-glow hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">{t('completed')}</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <p className="text-xs text-blue-400/70">{t('thisMonth')}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 border-l-4 border-l-red-600 neon-glow hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-200">{t('urgent')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{stats.urgent}</div>
              <p className="text-xs text-blue-400/70">{t('urgentAction')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Complaints Chart */}
          <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
            <CardHeader>
              <CardTitle className="text-blue-100 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {t('weeklyComplaints')}
              </CardTitle>
              <CardDescription className="text-blue-300/80">
                {t('weeklyComplaintsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyComplaintsData}>
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: '#94A3B8' }}
                    axisLine={{ stroke: '#475569' }}
                  />
                  <YAxis 
                    tick={{ fill: '#94A3B8' }}
                    axisLine={{ stroke: '#475569' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="new" fill="#3B82F6" name="ใหม่" />
                  <Bar dataKey="inProgress" fill="#8B5CF6" name="กำลังดำเนินการ" />
                  <Bar dataKey="completed" fill="#10B981" name="เสร็จสิ้น" />
                  <Bar dataKey="urgent" fill="#EF4444" name="ด่วน" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Comparison Chart */}
          <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
            <CardHeader>
              <CardTitle className="text-blue-100 flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                {t('categoryComparison')}
              </CardTitle>
              <CardDescription className="text-blue-300/80">
                {t('categoryComparisonDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryComparisonData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: '#94A3B8' }}
                  >
                    {categoryComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* New vs Total Comparison */}
        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('newVsTotal')}
            </CardTitle>
            <CardDescription className="text-blue-300/80">
              {t('newVsTotalDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={newVsTotalData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={{ stroke: '#94A3B8' }}
                    >
                      {newVsTotalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
                             <div className="flex flex-col justify-center space-y-4">
                 <div className="text-center">
                   <div className="text-3xl font-bold text-blue-300">{newVsTotalData[0].value}</div>
                   <div className="text-sm text-blue-400/70">{t('new')}</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-slate-400">{newVsTotalData[1].value}</div>
                   <div className="text-sm text-slate-500">{t('total')}</div>
                 </div>
                 <div className="text-center">
                   <div className="text-2xl font-bold text-green-400">
                     {((newVsTotalData[0].value / newVsTotalData[1].value) * 100).toFixed(1)}%
                   </div>
                   <div className="text-sm text-green-400/70">{t('newPercentage')}</div>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card className="bg-slate-800/50 border-blue-500/30 neon-glow">
          <CardHeader>
            <CardTitle className="text-blue-100">{t('recentComplaints')}</CardTitle>
            <CardDescription className="text-blue-300/80">{t('recentComplaintsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 bg-slate-700/30 border border-blue-500/30 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-blue-300">{complaint.id}</span>
                      <Badge variant="outline" className="bg-cyan-600/20 text-cyan-300 border-cyan-600/50">
                        {t(`categories.${complaint.category}`)}
                      </Badge>
                      <Badge className={getPriorityColor(complaint.priority)}>
                        {t(`priority.${complaint.priority}`)}
                      </Badge>
                    </div>
                    <p className="text-blue-200 mb-1">{complaint.description}</p>
                    <p className="text-sm text-blue-400/70">{complaint.date}</p>
                  </div>
                  <div className="ml-4">
                    <Badge className={getStatusColor(complaint.status)}>
                      {t(`status.${complaint.status}`)}
                    </Badge>
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

export default Dashboard;
