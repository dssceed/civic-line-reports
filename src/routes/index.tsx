// src/routes/index.tsx
import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { appRoutes } from './config'
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.public ? (
                route.element
              ) : (
                <ProtectedRoute roles={route.roles} permissions={route.permissions}>
                  {route.element}
                </ProtectedRoute>
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  )
}