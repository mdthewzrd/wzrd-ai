-- Create tenants table
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_url text,
  brand_color text,
  font_family text,
  stripe_public_key text,
  domain text unique
);

-- Create users table (profile mirror of auth)
create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  role text check (role in ('admin','reseller','client')) not null,
  tenant_id uuid references public.tenants(id) on delete cascade
);

-- Create services table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  name text not null,
  image_url text,
  description text,
  price_display text,
  stripe_checkout_url text not null,
  is_active boolean default true
);

-- Create orders table (for v2)
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  service_id uuid references public.services(id) on delete cascade not null,
  email text not null,
  stripe_session_id text unique not null,
  amount integer not null,
  currency text not null,
  status text not null,
  created_at timestamptz default now()
);

-- Create support_tickets table (optional)
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on all tables
alter table public.tenants enable row level security;
alter table public.users enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.support_tickets enable row level security;

-- Create indexes for better performance
create index idx_users_tenant_id on public.users(tenant_id);
create index idx_services_tenant_id on public.services(tenant_id);
create index idx_orders_tenant_id on public.orders(tenant_id);
create index idx_orders_stripe_session_id on public.orders(stripe_session_id);
create index idx_support_tickets_tenant_id on public.support_tickets(tenant_id);

-- RLS Policies for tenants table
create policy "Admin can view all tenants" on public.tenants
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Admin can create tenants" on public.tenants
  for insert with check (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Admin can update tenants" on public.tenants
  for update using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Reseller can view own tenant" on public.tenants
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'reseller' 
      and u.tenant_id = tenants.id
    )
  );

create policy "Reseller can update own tenant" on public.tenants
  for update using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'reseller' 
      and u.tenant_id = tenants.id
    )
  );

create policy "Client can view own tenant" on public.tenants
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'client' 
      and u.tenant_id = tenants.id
    )
  );

-- RLS Policies for users table
create policy "Admin can manage all users" on public.users
  for all using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Reseller can view users in same tenant" on public.users
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'reseller' 
      and u.tenant_id = users.tenant_id
    )
  );

create policy "Reseller can create client users" on public.users
  for insert with check (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'reseller' 
      and u.tenant_id = users.tenant_id
    )
    and users.role = 'client'
  );

create policy "Users can view their own profile" on public.users
  for select using (auth.uid() = users.id);

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = users.id);

-- RLS Policies for services table
create policy "Admin can manage all services" on public.services
  for all using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Reseller can manage own tenant services" on public.services
  for all using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'reseller' 
      and u.tenant_id = services.tenant_id
    )
  );

create policy "Client can view active services in their tenant" on public.services
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'client' 
      and u.tenant_id = services.tenant_id
    )
    and services.is_active = true
  );

-- RLS Policies for orders table
create policy "Admin can view all orders" on public.orders
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Reseller can view tenant orders" on public.orders
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'reseller' 
      and u.tenant_id = orders.tenant_id
    )
  );

create policy "Client can view own orders" on public.orders
  for select using (
    exists (
      select 1 from public.users u 
      where u.id = auth.uid() 
      and u.role = 'client' 
      and u.tenant_id = orders.tenant_id
      and orders.email = u.email
    )
  );

-- Function to handle user profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, role, tenant_id)
  values (new.id, new.email, 'client', null);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();