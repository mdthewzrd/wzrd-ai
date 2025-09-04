"use client"

import Link from "next/link"
import { Menu, Search, Settings, ShoppingBag } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Logo } from "@/components/logo"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<string | null>(null)

  // Determine active section
  const isActive = (path: string) => {
    if (path === "/social-media" && pathname === "/social-media") return true
    if (path === "/publications" && pathname === "/publications") return true
    if (path === "/tools" && pathname === "/tools") return true

    if (path === "/social-media" && pathname?.startsWith("/social-media/")) return true
    if (path === "/publications" && pathname?.startsWith("/publications/")) return true
    if (path === "/tools" && pathname?.startsWith("/tools/")) return true

    return false
  }

  useEffect(() => {
    // Check for user cookie
    const checkUserCookie = () => {
      const cookies = document.cookie.split(";")
      const userCookie = cookies.find((cookie) => cookie.trim().startsWith("user="))
      if (userCookie) {
        const userEmail = decodeURIComponent(userCookie.split("=")[1])
        setUser(userEmail)
      } else {
        setUser(null)
      }
    }

    // Check immediately
    checkUserCookie()

    // Set up interval to check periodically
    const interval = setInterval(checkUserCookie, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setUser(null)
    router.push("/login")
  }

  // Search data
  const searchItems = [
    {
      category: "Social Media",
      items: [
        { name: "Instagram", href: "/social-media/instagram" },
        { name: "YouTube", href: "/social-media/youtube" },
        { name: "TikTok", href: "/social-media/tiktok" },
        { name: "Twitter/X", href: "/social-media/twitter" },
        { name: "Spotify", href: "/social-media/spotify" },
        { name: "LinkedIn", href: "/social-media/linkedin" },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "SEO Tools", href: "/tools/seo" },
        { name: "Web Development", href: "/tools/web-development" },
        { name: "Automation", href: "/tools/automation" },
        { name: "Knowledge Panel", href: "/tools/knowledge-panel" },
      ],
    },
    {
      category: "Publications",
      items: [
        { name: "All Publications", href: "/publications" },
        { name: "Specialty Publications", href: "/publications/specialty" },
      ],
    },
  ]

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results: any[] = []

    searchItems.forEach((category) => {
      const matchingItems = category.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

      if (matchingItems.length > 0) {
        results.push({
          category: category.category,
          items: matchingItems,
        })
      }
    })

    setSearchResults(results)
  }

  // Navigate to search result
  const navigateToResult = (href: string) => {
    setSearchQuery("")
    setSearchResults([])
    router.push(href)
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center h-20">
        {/* Left section: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Logo className="transition-transform duration-300 hover:scale-105" />
          </Link>
        </div>

        {/* Center section: Main Navigation - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          {/* Main Navigation */}
          <nav className="flex">
            <div className="flex space-x-9">
              <Link
                href="/social-media"
                className={`py-5 px-1 border-b-2 font-medium text-base transition-colors ${
                  isActive("/social-media")
                    ? "border-green-medium text-text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-green-medium/50"
                }`}
              >
                Social Media
              </Link>
              <Link
                href="/publications"
                className={`py-5 px-1 border-b-2 font-medium text-base transition-colors ${
                  isActive("/publications")
                    ? "border-green-medium text-text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-green-medium/50"
                }`}
              >
                Publications
              </Link>
              <Link
                href="/tools"
                className={`py-5 px-1 border-b-2 font-medium text-base transition-colors ${
                  isActive("/tools")
                    ? "border-green-medium text-text-primary"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-green-medium/50"
                }`}
              >
                Tools
              </Link>
            </div>
          </nav>
        </div>

        {/* Right section with search and user controls */}
        <div className="flex items-center ml-auto gap-6">
          {/* Search bar */}
          <div className="hidden md:block relative">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-44 h-8 pl-8 text-xs bg-background border-muted-foreground/20 rounded-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && searchQuery && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.map((category, index) => (
                  <div key={index} className="p-2">
                    <h3 className="text-xs font-semibold text-muted-foreground mb-1">{category.category}</h3>
                    <ul>
                      {category.items.map((item: any, itemIndex: number) => (
                        <li key={itemIndex}>
                          <button
                            onClick={() => navigateToResult(item.href)}
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* My Orders Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
                    <Link href="/orders">
                      <ShoppingBag className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My Orders</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Settings Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-muted-foreground ${pathname.startsWith("/settings") ? "bg-background-secondary" : ""}`}
                    asChild
                  >
                    <Link href="/settings">
                      <Settings className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Favorites Button - Only show when logged in */}
            {/*user && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
                      <Link href="/favorites">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star text-yellow-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Favorites</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )*/}
          </div>

          {/* User account section */}
          <div className="hidden md:flex items-center">
            {/*user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 bg-green-900/20 text-green-400 px-3 py-1 h-auto">
                    <User className="h-4 w-4 text-green-500" />
                    <span>{user.split("@")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center">
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm px-4 py-2"
                >
                  Login
                </Link>
              </div>
            )*/}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile search toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="text-muted-foreground"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Mobile menu button */}
            <button
              className="text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="absolute top-20 left-0 right-0 p-4 bg-background border-b border-border z-50 md:hidden">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search services, tools..."
                className="w-full pl-9"
                autoFocus
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Mobile Search Results */}
            {searchResults.length > 0 && searchQuery && (
              <div className="mt-2 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((category, index) => (
                  <div key={index} className="p-2">
                    <h3 className="text-xs font-semibold text-muted-foreground mb-1">{category.category}</h3>
                    <ul>
                      {category.items.map((item: any, itemIndex: number) => (
                        <li key={itemIndex}>
                          <button
                            onClick={() => {
                              navigateToResult(item.href)
                              setSearchOpen(false)
                            }}
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-sm"
                          >
                            {item.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 right-0 left-0 bg-background border-b border-border py-4 z-50 md:hidden">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {/*user ? (
                <>
                  <div className="flex items-center gap-2 py-2 bg-green-900/20 px-3 rounded-md">
                    <User className="h-4 w-4 text-green-500" />
                    <span className="text-green-400">{user.split("@")[0]}</span>
                  </div>
                  <Link
                    href="/social-media"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Social Media
                  </Link>
                  <Link
                    href="/publications"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Publications
                  </Link>
                  <Link
                    href="/tools"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tools
                  </Link>
                  <Link
                    href="/orders"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/settings"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/favorites"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 py-2 pl-2 text-base"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-text-secondary hover:text-text-primary hover:border-l-2 hover:border-green-medium transition-colors py-2 pl-2 text-base"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )*/}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
