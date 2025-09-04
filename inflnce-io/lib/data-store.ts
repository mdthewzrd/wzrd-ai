// Development data store - simulates database operations
import { UserProfile, UserRole } from './auth-dev'

// Mock users database
let users: UserProfile[] = [
  {
    id: 'admin-1',
    email: 'admin@inflnce.io',
    name: 'System Administrator',
    avatar_url: null,
    role: 'admin',
    created_at: '2025-01-01',
    tenant_id: 'inflnce-main',
    permissions: ['manage_users', 'manage_services', 'view_analytics']
  },
  {
    id: 'reseller-1',
    email: 'reseller@example.com',
    name: 'John Reseller',
    avatar_url: null,
    role: 'reseller',
    created_at: '2025-01-02',
    tenant_id: 'inflnce-main',
    permissions: ['manage_clients', 'view_services']
  },
  {
    id: 'client-1',
    email: 'client@example.com',
    name: 'Jane Client',
    avatar_url: null,
    role: 'client',
    created_at: '2025-01-03',
    tenant_id: 'inflnce-main',
    permissions: ['view_services']
  }
]

// Mock services database
export interface Service {
  id: string
  name: string
  description: string
  price: number
  category: string
  platform?: string
  active: boolean
  stripe_link?: string
  service_type: 'tools' | 'campaigns' | 'subscriptions' | 'social'
  created_at: string
}

let services: Service[] = [
  {
    id: 'tiktok-followers-1k',
    name: '1,000 TikTok Followers',
    description: 'High-quality TikTok followers to boost your profile',
    price: 25.99,
    category: 'followers',
    platform: 'tiktok',
    active: true,
    service_type: 'social',
    stripe_link: 'https://buy.stripe.com/tiktok-followers-1k',
    created_at: '2025-01-01'
  },
  {
    id: 'instagram-likes-500',
    name: '500 Instagram Likes',
    description: 'Premium Instagram likes for your posts',
    price: 12.99,
    category: 'likes',
    platform: 'instagram',
    active: true,
    service_type: 'social',
    stripe_link: 'https://buy.stripe.com/instagram-likes-500',
    created_at: '2025-01-01'
  }
]

// User management functions
export async function getAllUsers(): Promise<UserProfile[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...users]
}

export async function createUser(userData: Omit<UserProfile, 'id' | 'created_at'>): Promise<UserProfile> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newUser: UserProfile = {
    ...userData,
    id: `user-${Date.now()}`,
    created_at: new Date().toISOString().split('T')[0]
  }
  
  users.push(newUser)
  return newUser
}

export async function updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex === -1) return null
  
  users[userIndex] = { ...users[userIndex], ...updates }
  return users[userIndex]
}

export async function deleteUser(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userIndex = users.findIndex(user => user.id === id)
  if (userIndex === -1) return false
  
  users.splice(userIndex, 1)
  return true
}

// Service management functions
export async function getAllServices(): Promise<Service[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...services]
}

export async function createService(serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newService: Service = {
    ...serviceData,
    id: `service-${Date.now()}`,
    created_at: new Date().toISOString().split('T')[0]
  }
  
  services.push(newService)
  return newService
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const serviceIndex = services.findIndex(service => service.id === id)
  if (serviceIndex === -1) return null
  
  services[serviceIndex] = { ...services[serviceIndex], ...updates }
  return services[serviceIndex]
}

export async function deleteService(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const serviceIndex = services.findIndex(service => service.id === id)
  if (serviceIndex === -1) return false
  
  services.splice(serviceIndex, 1)
  return true
}

export async function getServicesByPlatform(platform: string): Promise<Service[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return services.filter(service => service.platform === platform)
}