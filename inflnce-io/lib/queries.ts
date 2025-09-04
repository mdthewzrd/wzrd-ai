import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getServerAuth } from './auth'

// Admin queries
export async function getAdminStats() {
  const { profile } = await getServerAuth()
  if (!profile || profile.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Get tenant count
  const { count: tenantCount } = await supabase
    .from('tenants')
    .select('*', { count: 'exact', head: true })

  // Get user count
  const { count: userCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  // Get service count
  const { count: serviceCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })

  // Get recent orders for revenue calculation
  const { data: orders } = await supabase
    .from('orders')
    .select('amount, created_at')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days

  const monthlyRevenue = orders?.reduce((sum, order) => sum + order.amount, 0) || 0

  return {
    tenants: tenantCount || 0,
    users: userCount || 0,
    services: serviceCount || 0,
    monthlyRevenue
  }
}

// Reseller queries
export async function getResellerStats(tenantId?: string) {
  const { profile } = await getServerAuth()
  if (!profile || (profile.role !== 'reseller' && profile.role !== 'admin')) {
    throw new Error('Unauthorized')
  }

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const targetTenantId = tenantId || profile.tenant_id

  // Get client count for this reseller's tenant
  const { count: clientCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'client')
    .eq('tenant_id', targetTenantId)

  // Get active orders for revenue calculation
  const { data: orders } = await supabase
    .from('orders')
    .select('amount, status, created_at')
    .eq('tenant_id', targetTenantId)
    .in('status', ['active', 'trial'])

  const monthlyRevenue = orders?.reduce((sum, order) => sum + order.amount, 0) || 0
  const activeServices = orders?.length || 0

  return {
    totalClients: clientCount || 0,
    activeServices,
    monthlyRevenue,
    avgClientValue: clientCount ? Math.round(monthlyRevenue / clientCount) : 0
  }
}

export async function getResellerClients(tenantId?: string) {
  const { profile } = await getServerAuth()
  if (!profile || (profile.role !== 'reseller' && profile.role !== 'admin')) {
    throw new Error('Unauthorized')
  }

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const targetTenantId = tenantId || profile.tenant_id

  const { data: clients, error } = await supabase
    .from('users')
    .select(`
      id,
      email,
      full_name,
      is_active,
      created_at,
      metadata
    `)
    .eq('role', 'client')
    .eq('tenant_id', targetTenantId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  // Get order data for each client
  const clientsWithOrders = await Promise.all(
    (clients || []).map(async (client) => {
      const { data: orders } = await supabase
        .from('orders')
        .select('amount, status')
        .eq('user_id', client.id)

      const totalSpent = orders?.reduce((sum, order) => sum + order.amount, 0) || 0
      const activeOrders = orders?.filter(order => order.status === 'active') || []
      const monthlyValue = activeOrders.reduce((sum, order) => sum + order.amount, 0)

      return {
        ...client,
        company: client.metadata?.company || 'Unknown Company',
        phone: client.metadata?.phone || '',
        monthly_value: monthlyValue,
        total_spent: totalSpent,
        services_count: activeOrders.length,
        status: client.is_active ? 'active' : 'suspended'
      }
    })
  )

  return clientsWithOrders
}

export async function getResellerServices(tenantId?: string) {
  const { profile } = await getServerAuth()
  if (!profile || (profile.role !== 'reseller' && profile.role !== 'admin')) {
    throw new Error('Unauthorized')
  }

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const targetTenantId = tenantId || profile.tenant_id

  const { data: services, error } = await supabase
    .from('services')
    .select(`
      *,
      orders!inner(
        user_id,
        amount,
        status,
        users!inner(tenant_id)
      )
    `)
    .eq('orders.users.tenant_id', targetTenantId)

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  // Process services with order data
  return (services || []).map(service => {
    const serviceOrders = service.orders || []
    const activeOrders = serviceOrders.filter((order: any) => order.status === 'active')
    const totalRevenue = serviceOrders.reduce((sum: number, order: any) => sum + order.amount, 0)

    return {
      ...service,
      active_clients: activeOrders.length,
      total_revenue: totalRevenue,
      status: service.is_active ? 'active' : 'paused'
    }
  })
}

export async function getResellerOrders(tenantId?: string) {
  const { profile } = await getServerAuth()
  if (!profile || (profile.role !== 'reseller' && profile.role !== 'admin')) {
    throw new Error('Unauthorized')
  }

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const targetTenantId = tenantId || profile.tenant_id

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:users(full_name, email, metadata),
      service:services(name, description)
    `)
    .eq('tenant_id', targetTenantId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return (orders || []).map(order => ({
    ...order,
    client_name: order.user?.full_name || order.user?.email || 'Unknown Client',
    client_company: order.user?.metadata?.company || 'Unknown Company',
    service: order.service?.name || 'Unknown Service'
  }))
}

// Client queries
export async function getClientData(userId: string) {
  const { profile } = await getServerAuth()
  if (!profile) {
    throw new Error('Unauthorized')
  }

  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  // Get user's orders and services
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      service:services(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching client orders:', error)
    return {
      services: [],
      billing: {
        current_balance: 0,
        next_payment_date: null,
        total_monthly: 0,
        ytd_spent: 0
      }
    }
  }

  const services = (orders || []).map(order => ({
    id: order.id,
    name: order.service?.name || 'Unknown Service',
    status: order.status,
    monthly_fee: order.amount,
    next_billing: order.next_billing_date,
    performance: {
      // This would be populated from actual performance tracking
      // For now, using placeholder data
    }
  }))

  const totalMonthly = orders?.filter(o => o.status === 'active').reduce((sum, o) => sum + o.amount, 0) || 0
  const ytdSpent = orders?.reduce((sum, o) => sum + o.amount, 0) || 0

  return {
    services,
    billing: {
      current_balance: 0, // Would come from Stripe or billing system
      next_payment_date: orders?.find(o => o.status === 'active')?.next_billing_date,
      total_monthly: totalMonthly,
      ytd_spent: ytdSpent
    }
  }
}