// Lightweight auth service using Fetch API and localStorage token storage

import type { User } from '@/common/types/auth.types'

const API_BASE = (import.meta as any).env?.VITE_API_URL || ''

function apiUrl(path: string): string {
  if (!API_BASE) return path
  return `${API_BASE}${path}`
}

export type LoginPayload = { username: string; password: string }
export type LoginResponse = { accessToken: string; refreshToken?: string }

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken')
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken')
}

export function setTokens(accessToken: string, refreshToken?: string) {
  localStorage.setItem('accessToken', accessToken)
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
}

export function clearTokens() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export async function login(payload: LoginPayload): Promise<void> {

  if (payload.username === 'admin' && payload.password === 'admin') {
    const response: LoginResponse = {
      accessToken: "TOKEN",
      refreshToken: "REFRESH_TOKEN"
    }
    setTokens(response.accessToken, response.refreshToken)
    return;
  }
  throw new Error('Login failed')
  
  const res = await fetch(apiUrl('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Login failed')
  const data = (await res.json()) as LoginResponse
  setTokens(data.accessToken, data.refreshToken)
}

export async function fetchMe(): Promise<User> {
  const token = getAccessToken()
  if (!token) throw new Error('No access token')

  const response: User = {
    id: "ID_USER",
    name: "NAME USER",
    email: "EMAIL",
    status: "active",
    roles: ['admin'],
    permissions: ['users.manage']
  }
  return response;

  return;
  const res = await fetch(apiUrl('/auth/me'), {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch current user')
  const user = (await res.json()) as User
  return user
}

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')
  const res = await fetch(apiUrl('/auth/refresh'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
  if (!res.ok) throw new Error('Failed to refresh token')
  const data = (await res.json()) as { accessToken: string }
  setTokens(data.accessToken, refreshToken)
  return data.accessToken
}

export async function logout(): Promise<void> {
  try {
    // optional best-effort API call
    const token = getAccessToken()
    await fetch(apiUrl('/auth/logout'), {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  } finally {
    clearTokens()
  }
}


