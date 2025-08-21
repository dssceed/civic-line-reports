
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import authTh from '../locales/th/auth.json';
import dashboardTh from '../locales/th/dashboard.json';
import complaintsTh from '../locales/th/complaints.json';
import reportsTh from '../locales/th/reports.json';
import commonTh from '../locales/th/common.json';
import formsTh from '../locales/th/forms.json';

// English translations (for future use)
import authEn from '../locales/en/auth.json';
import dashboardEn from '../locales/en/dashboard.json';
import complaintsEn from '../locales/en/complaints.json';
import reportsEn from '../locales/en/reports.json';
import commonEn from '../locales/en/common.json';
import formsEn from '../locales/en/forms.json';

const resources = {
  th: {
    auth: authTh,
    dashboard: dashboardTh,
    complaints: complaintsTh,
    reports: reportsTh,
    common: commonTh,
    forms: formsTh,
  },
  en: {
    auth: authEn,
    dashboard: dashboardEn,
    complaints: complaintsEn,
    reports: reportsEn,
    common: commonEn,
    forms: formsEn,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'th',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
