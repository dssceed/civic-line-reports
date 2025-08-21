 
 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { useAuthActions } from "@/domains/auth/hooks/useAuthActions";
 import { useToast } from "@/hooks/use-toast";
 
 const Login = () => {
   const { login } = useAuthActions()
   const navigate = useNavigate()
   const { toast } = useToast()
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setError(null)
     setLoading(true)
     try {
       await login(username, password)
       navigate("/dashboard", { replace: true })
     } catch (err) {
       setError("เข้าสู่ระบบไม่สำเร็จ")
       toast({
         title: "เข้าสู่ระบบไม่สำเร็จ",
         description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
         variant: "destructive",
       })
     } finally {
       setLoading(false)
     }
   }
 
   return (
     <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
       <Card className="w-full max-w-md bg-slate-800/50 border-blue-500/30">
         <CardHeader>
           <CardTitle className="text-blue-100">เข้าสู่ระบบ</CardTitle>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="text-sm text-blue-200">ชื่อผู้ใช้</label>
               <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" required />
             </div>
             <div>
               <label className="text-sm text-blue-200">รหัสผ่าน</label>
               <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
             </div>
             {error && <p className="text-sm text-red-400">{error}</p>}
             <Button type="submit" className="w-full" disabled={loading}>
               {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
             </Button>
           </form>
         </CardContent>
       </Card>
     </div>
   )
 }
 
 export default Login
 

