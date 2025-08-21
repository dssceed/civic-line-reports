
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthActions } from "@/domains/auth/hooks/useAuthActions";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { t } = useTranslation('auth');
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuthActions()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      toast({
        title: t('loginSuccess'),
        description: t('loginSuccessDescription'),
        variant: "success",
      });
      navigate("/dashboard", { replace: true })
    } catch (err) {
      toast({
        title: t('loginError'),
        description: t('loginErrorDescription'),
        variant: "destructive",
      });
      setError("เข้าสู่ระบบไม่สำเร็จ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-transparent to-blue-900/30"></div>

      {/* Floating neon shapes */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Left Side - 3D Robot Character & Chat */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 relative z-10">
        {/* Robot Character Area */}
        <div className="relative mb-8">
          {/* 3D Robot Illustration Placeholder */}
          <div className="w-80 h-80 relative">
            {/* Robot Body */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-blue-200 to-cyan-200 rounded-3xl shadow-2xl rotate-12 transform-gpu">
              <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl">
                {/* Robot Face */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-cyan-400/20 rounded-2xl border border-cyan-400/30">
                  {/* Eyes */}
                  <div className="absolute top-4 left-6 w-6 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-4 right-6 w-6 h-6 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                  {/* Mouth */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-cyan-400/60 rounded-full"></div>
                </div>

                {/* Robot Arms */}
                <div className="absolute -left-8 top-16 w-16 h-8 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full rotate-45"></div>
                <div className="absolute -right-8 top-16 w-16 h-8 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full -rotate-45"></div>

                {/* Robot Chest Light */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              </div>
            </div>

            {/* Floating Rings */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-blue-400/30 rounded-full animate-spin"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-purple-400/30 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Chat Bubble */}
        <div className="relative">
          <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-blue-400/30 max-w-xs">
            <p className="text-white text-sm mb-2 font-medium">{t('botGreeting')}</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
          {/* Chat bubble tail */}
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-gradient-to-r from-blue-600/90 to-purple-600/90 transform rotate-45"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="md:flex-1 flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg shadow-blue-500/25">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 gradient-text">
              {t('welcome')}
            </h1>
            <p className="text-blue-300/80 text-base">{t('systemTitle')}</p>
          </div>

          <Card className="glass-effect shadow-2xl neon-glow border-blue-500/30 bg-transparent">
            <CardHeader className="space-y-2 text-center pb-6">
              <CardTitle className="text-xl text-blue-100 font-semibold">{t('loginTitle')}</CardTitle>
              <CardDescription className="text-blue-300/80">
                {t('loginDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-blue-200 text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('username')}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={t('usernamePlaceholder')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="h-12 bg-slate-800/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 hover:bg-slate-800/70 pl-4"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-200 text-sm font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t('password')}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t('passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 bg-slate-800/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 hover:bg-slate-800/70 pl-4 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-slate-800 via-blue-900 to-purple-900 hover:from-slate-700 hover:via-blue-800 hover:to-purple-800 text-cyan-300 font-medium shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400/50 hover:scale-[1.02] enhanced-neon-glow hover:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-cyan-300/30 border-t-cyan-300 rounded-full animate-spin"></div>
                      <span>{t('loggingIn')}</span>
                    </div>
                  ) : (
                    t('loginButton')
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-cyan-500/30">
                <p className="text-sm text-cyan-300/80 mb-3 font-medium">{t('demoCredentials')}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">{t('username')}:</span>
                    <code className="bg-slate-700/50 text-cyan-300 px-2 py-1 rounded text-sm font-mono border border-cyan-500/30">admin</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">{t('password')}:</span>
                    <code className="bg-slate-700/50 text-cyan-300 px-2 py-1 rounded text-sm font-mono border border-cyan-500/30">admin</code>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex justify-center space-x-6 pt-4 border-t border-blue-500/20">
                <a href="#" className="text-sm text-blue-400 hover:text-cyan-400 transition-colors">{t('terms')}</a>
                <a href="#" className="text-sm text-blue-400 hover:text-cyan-400 transition-colors">{t('privacy')}</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
