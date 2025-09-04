import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { requireReseller } from "@/lib/auth-dev"
import Link from "next/link"
import {
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package
} from "lucide-react"

export default async function AddClientPage() {
  const { profile } = await requireReseller()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/reseller/clients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-green-500">Add New Client</h1>
          <p className="text-gray-400 mt-2">Create a new client account and setup</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-500">
              <User className="h-5 w-5 mr-2" />
              Client Information
            </CardTitle>
            <CardDescription>Basic client contact and company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name *</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name *</Label>
                <Input id="last-name" placeholder="Smith" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="john@company.com" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="company" placeholder="Company LLC" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea 
                  id="address" 
                  placeholder="123 Main St, City, State 12345" 
                  className="pl-10 min-h-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-500">
              <Package className="h-5 w-5 mr-2" />
              Service Configuration
            </CardTitle>
            <CardDescription>Initial service setup and billing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client-tier">Client Tier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter ($299/mo)</SelectItem>
                    <SelectItem value="professional">Professional ($599/mo)</SelectItem>
                    <SelectItem value="enterprise">Enterprise ($999/mo)</SelectItem>
                    <SelectItem value="custom">Custom Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-cycle">Billing Cycle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly (5% off)</SelectItem>
                    <SelectItem value="annual">Annual (10% off)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Initial Services</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Instagram Management',
                  'Facebook Advertising', 
                  'Google Ads',
                  'Content Creation',
                  'SEO Optimization',
                  'YouTube Management',
                  'TikTok Management',
                  'LinkedIn Management',
                  'Email Marketing',
                  'Website Development',
                  'Brand Strategy',
                  'Analytics & Reporting'
                ].map((service) => (
                  <label key={service} className="flex items-center space-x-2 p-2 border border-gray-700 rounded-md hover:bg-gray-800 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-500">
              <CreditCard className="h-5 w-5 mr-2" />
              Billing & Payment
            </CardTitle>
            <CardDescription>Payment method and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-method">Preferred Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stripe">Credit/Debit Card (Stripe)</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="invoice">Send Invoice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billing-email">Billing Email</Label>
                <Input id="billing-email" type="email" placeholder="billing@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-contact">Billing Contact</Label>
                <Input id="billing-contact" placeholder="Finance Manager" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special-instructions">Special Instructions</Label>
              <Textarea 
                id="special-instructions" 
                placeholder="Any special billing requirements, payment terms, or client preferences..."
                className="min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pt-4">
          <Button asChild variant="outline">
            <Link href="/reseller/clients">
              Cancel
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Create Client Account
          </Button>
        </div>
      </div>
    </div>
  )
}