"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageCircle, Clock, CheckCircle, AlertCircle, Phone, Mail } from "lucide-react"

export default function SupportPage() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  })

  const supportTickets = [
    {
      id: "TICK-001",
      subject: "Instagram followers not delivered",
      status: "in_progress",
      priority: "high",
      created: "2h ago",
      lastUpdate: "1h ago"
    },
    {
      id: "TICK-002", 
      subject: "Billing inquiry",
      status: "resolved",
      priority: "medium",
      created: "1d ago",
      lastUpdate: "4h ago"
    },
    {
      id: "TICK-003",
      subject: "Account setup assistance",
      status: "pending",
      priority: "low",
      created: "2d ago",
      lastUpdate: "2d ago"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500">Resolved</Badge>
      case "in_progress":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500">Pending</Badge>
      default:
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500">Unknown</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-400"
      case "medium": return "text-yellow-400" 
      case "low": return "text-green-400"
      default: return "text-gray-400"
    }
  }

  const handleSubmitTicket = () => {
    // Here you would submit the ticket to your backend
    alert("Support ticket submitted! We'll get back to you soon.")
    setTicketForm({ subject: "", category: "", priority: "", description: "" })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Support Center</h1>
          <p className="text-gray-400">Get help and manage your support tickets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Options */}
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Support</CardTitle>
              <CardDescription>Choose how you'd like to get help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Button className="bg-green-600 hover:bg-green-700 h-16 justify-start">
                  <MessageCircle className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-xs text-green-100">Available 24/7</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 h-16 justify-start">
                  <Mail className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Email Support</div>
                    <div className="text-xs text-gray-400">Response within 4 hours</div>
                  </div>
                </Button>

                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 h-16 justify-start">
                  <Phone className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Phone Support</div>
                    <div className="text-xs text-gray-400">Business hours only</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Ticket Form */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Submit a Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll help resolve it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Ticket subject"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select value={ticketForm.category} onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="service">Service Question</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Describe your issue in detail..."
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                rows={4}
              />

              <Button 
                onClick={handleSubmitTicket}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Documentation & Tickets */}
        <div className="space-y-6">
          {/* Quick Access Documentation */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Access</CardTitle>
              <CardDescription>Frequently accessed documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {documentationSections.map((section, index) => (
                <div key={index} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${section.color}`}>
                      <section.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{section.title}</div>
                      <div className="text-xs text-gray-400">{section.articles.length} articles</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Tickets */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Your Support Tickets</CardTitle>
              <CardDescription>Recent support requests and their status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">#{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm mb-2">{ticket.subject}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Created: {ticket.created}</span>
                    <span>Updated: {ticket.lastUpdate}</span>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                View All Tickets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-blue-600/20 rounded-full">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">&lt; 2 hours</div>
              <div className="text-sm text-gray-400">Average Response Time</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-green-600/20 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-gray-400">Resolution Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-purple-600/20 rounded-full">
              <AlertCircle className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}