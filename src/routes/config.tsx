// src/routes/config.tsx
import { lazy } from 'react'
import type { Permission, Role } from '@/common/types/auth.types'
import Settings from '@/pages/Settings'
import ComplaintForms from '@/pages/ComplaintForms'
import PublicForm from '@/pages/PublicForm'
import PublicFormList from '@/pages/PublicFormList'
import Landing from '@/pages/Landing'
import Tracking from '@/pages/Tracking'

const Index = lazy(() => import('@/pages/Index'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Complaints = lazy(() => import('@/pages/Complaints'))
const Reports = lazy(() => import('@/pages/Reports'))
const Users = lazy(() => import('@/pages/Users'))
const Categories = lazy(() => import('@/pages/Categories'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Forbidden = lazy(() => import('@/pages/Forbidden'))
const Login = lazy(() => import('@/pages/Login'))

type RouteMeta = {
  path: string
  element: React.ReactNode
  public?: boolean
  roles?: Role[]
  permissions?: Permission[]
}

export const appRoutes: RouteMeta[] = [
  { path: '/', element: <Landing />, public: true },
  { path: '/home', element: <Index />, public: true },
  { path: '/login', element: <Login />, public: true },
  { path: '/dashboard', element: <Dashboard />, roles: ['admin', 'officer'] },
  { path: '/complaints', element: <Complaints />, roles: ['admin', 'officer'] },
  { path: '/reports', element: <Reports />, roles: ['admin', 'officer'] },
  { path: '/settings', element: <Settings />, roles: ['admin', 'officer'] },
  { path: '/complaint-forms', element: <ComplaintForms />, roles: ['admin', 'officer'] },
  { path: '/users', element: <Users />, roles: ['admin', 'officer'] },
  { path: '/categories', element: <Categories />, roles: ['admin', 'officer'] },
  { path: '/forms', element: <PublicFormList />, public: true },
  { path: '/forms/:formId', element: <PublicForm />, public: true },
  { path: '/tracking', element: <Tracking />, public: true },
  // { path: '/reports', element: <Reports />, permissions: ['reports.view'] },
  { path: '/403', element: <Forbidden />, public: true },
  { path: '*', element: <NotFound />, public: true },
]