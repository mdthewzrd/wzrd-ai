// Development queries that return mock data

export async function getAdminStats() {
  return {
    tenants: 5,
    users: 247,
    services: 12,
    monthlyRevenue: 45600
  }
}

export async function getResellerStats(tenantId?: string) {
  return {
    totalClients: 24,
    activeServices: 45,
    monthlyRevenue: 15400,
    avgClientValue: 642
  }
}

export async function getResellerClients(tenantId?: string) {
  return [
    {
      id: '1',
      email: 'john@smithenterprises.com',
      full_name: 'John Smith',
      company: 'Smith Enterprises',
      phone: '+1 (555) 123-4567',
      monthly_value: 899,
      total_spent: 8990,
      services_count: 3,
      status: 'active',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      email: 'sarah@techcorp.com',
      full_name: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      phone: '+1 (555) 987-6543',
      monthly_value: 598,
      total_spent: 5380,
      services_count: 2,
      status: 'active',
      created_at: '2024-02-20'
    }
  ]
}

export async function getResellerServices(tenantId?: string) {
  return [
    {
      id: '1',
      name: 'Instagram Management',
      description: 'Complete Instagram account management',
      price: 299,
      billing_cycle: 'monthly',
      category: 'Social Media',
      active_clients: 12,
      total_revenue: 3588,
      status: 'active',
      is_active: true
    },
    {
      id: '2',
      name: 'Facebook Advertising',
      description: 'Facebook ad campaign management',
      price: 499,
      billing_cycle: 'monthly',
      category: 'Advertising',
      active_clients: 8,
      total_revenue: 3992,
      status: 'active',
      is_active: true
    }
  ]
}

export async function getResellerOrders(tenantId?: string) {
  return [
    {
      id: 'ORD-001',
      client_name: 'John Smith',
      client_company: 'Smith Enterprises',
      service: 'Instagram Management',
      amount: 299,
      status: 'active',
      created_at: '2024-12-01',
      next_billing_date: '2025-01-01',
      user: { full_name: 'John Smith', email: 'john@smithenterprises.com' }
    },
    {
      id: 'ORD-002',
      client_name: 'Sarah Johnson',
      client_company: 'TechCorp Solutions',
      service: 'Facebook Advertising',
      amount: 499,
      status: 'pending',
      created_at: '2024-12-15',
      next_billing_date: '2025-01-01',
      user: { full_name: 'Sarah Johnson', email: 'sarah@techcorp.com' }
    }
  ]
}

export async function getClientData(userId: string) {
  return {
    services: [
      {
        id: '1',
        name: 'Instagram Management',
        status: 'active',
        monthly_fee: 299,
        next_billing: '2025-01-15'
      },
      {
        id: '2',
        name: 'Facebook Advertising',
        status: 'active',
        monthly_fee: 499,
        next_billing: '2025-01-15'
      }
    ],
    billing: {
      current_balance: 0,
      next_payment_date: '2025-01-15',
      total_monthly: 798,
      ytd_spent: 9576
    }
  }
}