
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Forbidden = () => {
    const { t } = useTranslation('common');
    const location = useLocation();

    useEffect(() => {
        console.warn(
            "403 Forbidden: User attempted to access a restricted route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 gradient-text">403</h1>
                <p className="text-xl text-blue-300 mb-4">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
                <a href="/" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                    กลับสู่หน้าหลัก
                </a>
            </div>
        </div>
    );
};

export default Forbidden;

