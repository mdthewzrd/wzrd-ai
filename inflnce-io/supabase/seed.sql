-- Seed data for Inflnce.io demo

-- Insert demo tenants
INSERT INTO public.tenants (id, slug, name, logo_url, brand_color, font_family, domain) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'acme-agency', 'ACME Agency', 
   'https://via.placeholder.com/200x50/4F46E5/ffffff?text=ACME', 
   '#4F46E5', 'Inter, sans-serif', 'acme.localhost:3000'),
  ('b2c3d4e5-f678-90ab-cdef-123456789012', 'bluebird-digital', 'Bluebird Digital', 
   'https://via.placeholder.com/200x50/0EA5E9/ffffff?text=Bluebird', 
   '#0EA5E9', 'Poppins, sans-serif', 'bluebird.localhost:3000'),
  ('c3d4e5f6-7890-abcd-ef12-345678901234', 'demo-reseller', 'Demo Reseller', 
   'https://via.placeholder.com/200x50/10B981/ffffff?text=Demo', 
   '#10B981', 'Roboto, sans-serif', null);

-- Note: Users should be created through Supabase Auth first
-- Then update their roles in the users table

-- Insert demo services for ACME Agency
INSERT INTO public.services (tenant_id, name, image_url, description, price_display, stripe_checkout_url, is_active) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
   'Professional Website Design', 
   'https://via.placeholder.com/400x300/4F46E5/ffffff?text=Web+Design',
   'Custom responsive website design with modern UI/UX principles',
   '$2,999',
   'https://checkout.stripe.com/c/pay/cs_test_example1',
   true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
   'SEO Optimization Package', 
   'https://via.placeholder.com/400x300/4F46E5/ffffff?text=SEO',
   'Complete SEO audit and optimization for better rankings',
   '$999/mo',
   'https://checkout.stripe.com/c/pay/cs_test_example2',
   true),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 
   'Social Media Management', 
   'https://via.placeholder.com/400x300/4F46E5/ffffff?text=Social+Media',
   'Full social media management across all platforms',
   '$1,499/mo',
   'https://checkout.stripe.com/c/pay/cs_test_example3',
   true);

-- Insert demo services for Bluebird Digital
INSERT INTO public.services (tenant_id, name, image_url, description, price_display, stripe_checkout_url, is_active) VALUES
  ('b2c3d4e5-f678-90ab-cdef-123456789012', 
   'E-commerce Development', 
   'https://via.placeholder.com/400x300/0EA5E9/ffffff?text=E-commerce',
   'Full e-commerce solution with payment integration',
   '$4,999',
   'https://checkout.stripe.com/c/pay/cs_test_example4',
   true),
  ('b2c3d4e5-f678-90ab-cdef-123456789012', 
   'Mobile App Development', 
   'https://via.placeholder.com/400x300/0EA5E9/ffffff?text=Mobile+App',
   'Native iOS and Android app development',
   '$9,999',
   'https://checkout.stripe.com/c/pay/cs_test_example5',
   true),
  ('b2c3d4e5-f678-90ab-cdef-123456789012', 
   'Cloud Infrastructure Setup', 
   'https://via.placeholder.com/400x300/0EA5E9/ffffff?text=Cloud',
   'AWS/Azure cloud infrastructure setup and optimization',
   '$3,499',
   'https://checkout.stripe.com/c/pay/cs_test_example6',
   true);

-- Insert demo services for Demo Reseller
INSERT INTO public.services (tenant_id, name, image_url, description, price_display, stripe_checkout_url, is_active) VALUES
  ('c3d4e5f6-7890-abcd-ef12-345678901234', 
   'Basic Website Package', 
   'https://via.placeholder.com/400x300/10B981/ffffff?text=Basic+Web',
   '5-page responsive website with contact form',
   '$999',
   'https://checkout.stripe.com/c/pay/cs_test_example7',
   true),
  ('c3d4e5f6-7890-abcd-ef12-345678901234', 
   'Logo Design Service', 
   'https://via.placeholder.com/400x300/10B981/ffffff?text=Logo+Design',
   'Professional logo design with 3 concepts and revisions',
   '$499',
   'https://checkout.stripe.com/c/pay/cs_test_example8',
   true);

-- Create a function to handle admin user creation (to be called after auth setup)
CREATE OR REPLACE FUNCTION create_admin_user(user_email text, user_id uuid)
RETURNS void AS $$
BEGIN
  INSERT INTO public.users (id, email, role, tenant_id)
  VALUES (user_id, user_email, 'admin', null)
  ON CONFLICT (id) DO UPDATE SET role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to assign user to tenant
CREATE OR REPLACE FUNCTION assign_user_to_tenant(user_id uuid, tenant_slug text, user_role text)
RETURNS void AS $$
DECLARE
  tenant_uuid uuid;
BEGIN
  SELECT id INTO tenant_uuid FROM public.tenants WHERE slug = tenant_slug;
  
  IF tenant_uuid IS NOT NULL THEN
    UPDATE public.users 
    SET tenant_id = tenant_uuid, role = user_role
    WHERE id = user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;