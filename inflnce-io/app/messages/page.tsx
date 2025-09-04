"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Send, Reply, Archive, Star, Search } from "lucide-react"

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const messages = [
    {
      id: "1",
      from: "john@example.com",
      subject: "Service inquiry",
      preview: "Hi, I'm interested in your Instagram growth package...",
      time: "2h ago",
      unread: true,
      important: false
    },
    {
      id: "2", 
      from: "support@inflnce.io",
      subject: "Welcome to inflnce",
      preview: "Thank you for joining inflnce! Here's how to get started...",
      time: "1d ago",
      unread: false,
      important: true
    },
    {
      id: "3",
      from: "billing@inflnce.io",
      subject: "Payment confirmation",
      preview: "Your payment of $199.00 has been successfully processed...",
      time: "2d ago",
      unread: false,
      important: false
    }
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <p className="text-gray-400">Manage your communications</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Inbox</CardTitle>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  {messages.filter(m => m.unread).length} new
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="bg-gray-800 border-gray-700 pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage === message.id
                      ? "bg-green-600/20 border border-green-600/30"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-600 text-white text-xs">
                        {message.from.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${
                          message.unread ? "text-white" : "text-gray-300"
                        }`}>
                          {message.from}
                        </p>
                        {message.important && (
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className={`text-xs truncate ${
                        message.unread ? "text-gray-200" : "text-gray-400"
                      }`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Message View */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {messages.find(m => m.id === selectedMessage)?.subject}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  From: {messages.find(m => m.id === selectedMessage)?.from}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-200">
                    This is the full message content. In a real implementation, 
                    this would show the complete message body with proper formatting
                    and any attachments.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-medium">Reply</h4>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Mail className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-400 mb-2">No message selected</h3>
                  <p className="text-gray-500">Choose a message from the list to view its content</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}