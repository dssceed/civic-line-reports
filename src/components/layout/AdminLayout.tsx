
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  User,
  FormInput,
  Users,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LanguageSwitcher from "../LanguageSwitcher";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useTranslation('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navigation = [
    { name: t('navigation.dashboard'), href: "/dashboard", icon: LayoutDashboard },
    { name: t('navigation.complaints'), href: "/complaints", icon: FileText },
    { name: t('navigation.reports'), href: "/reports", icon: BarChart3 },
    { name: t('navigation.forms'), href: "/complaint-forms", icon: FormInput },
    { name: t('navigation.users'), href: "/users", icon: Users },
    { name: t('navigation.categories'), href: "/categories", icon: Database },
    { name: t('navigation.settings'), href: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้งานระบบ",
    });
    navigate("/");
  };

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900">
      <div className="p-6 border-b border-blue-500/30">
        <h2 className="text-xl font-bold gradient-text">ระบบจัดการ</h2>
        <p className="text-sm text-blue-300/80">เรื่องร้องเรียน</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.href)
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg enhanced-neon-glow"
                : "text-blue-200 hover:bg-blue-900/30 hover:text-blue-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-500/30">
        <div className="flex items-center mb-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-100">ผู้ดูแลระบบ</p>
            <p className="text-xs text-blue-300/70">admin@municipality.gov</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('navigation.logout')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-slate-900 shadow-2xl border-r border-blue-500/30">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-72 bg-slate-900 border-blue-500/30">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Navigation */}
        <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-blue-500/30">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="lg:hidden -ml-2 text-blue-200 hover:bg-blue-900/30"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <h1 className="ml-2 lg:ml-0 text-lg font-semibold text-blue-100">
                {navigation.find(item => isActive(item.href))?.name || t('navigation.dashboard')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="hidden md:block text-sm text-blue-300/70">
                วันที่ {new Date().toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-6 bg-slate-900 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
