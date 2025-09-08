"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, Search, Settings, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

const mainNavItems = [
  { name: "Social Media", href: "/services/social-media" },
  { name: "Publications", href: "/services/publications" },
  { name: "Tools", href: "/services/tools" },
];

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // TODO: Check if user is admin from database
  const isAdmin = false;
  
  // Determine active section
  const isActive = (path: string) => {
    if (path === "/services/social-media" && pathname?.startsWith("/services/social-media")) return true;
    if (path === "/services/publications" && pathname?.startsWith("/services/publications")) return true;
    if (path === "/services/tools" && pathname?.startsWith("/services/tools")) return true;
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 md:h-20 items-center">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center pl-2 pr-4 md:pl-8 md:pr-12">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent logo-hover-effect">
              inflnce.io
            </span>
          </Link>
        </div>
        
        {/* Center section: Main Navigation - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex">
            <div className="flex space-x-9">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-5 px-1 border-b-2 font-medium text-base transition-colors ${
                    isActive(item.href)
                      ? "border-green-500 text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-green-500/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isSignedIn && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
                        <Link href="/dashboard/orders">
                          <ShoppingBag className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>My Orders</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {isAdmin && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-muted-foreground" asChild>
                          <Link href="/admin">
                            <Settings className="h-5 w-5" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Admin Settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
          
          {/* User account section */}
          <div className="hidden md:flex items-center">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10"
                    }
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
                <Button size="sm" className="green-gradient-bg" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-muted-foreground h-10 w-10"
          >
            <Search className="h-5 w-5" />
          </Button>

          {isSignedIn && <UserButton afterSignOutUrl="/" />}

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-2 mt-8">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-primary py-3 px-2 rounded-md hover:bg-gray-900/50 ${
                      isActive(item.href) ? "text-primary bg-gray-900/30" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isSignedIn ? (
                  <>
                    <hr className="border-border my-2" />
                    <Link 
                      href="/dashboard" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-primary py-3 px-2 rounded-md hover:bg-gray-900/50"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/dashboard/orders" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-primary py-3 px-2 rounded-md hover:bg-gray-900/50"
                    >
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link 
                        href="/admin" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-muted-foreground hover:text-primary py-3 px-2 rounded-md hover:bg-gray-900/50"
                      >
                        Admin Panel
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <hr className="border-border my-2" />
                    <div className="flex flex-col gap-3 mt-4">
                      <Link 
                        href="/contact" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-muted-foreground hover:text-primary py-3 px-2 rounded-md hover:bg-gray-900/50"
                      >
                        Contact
                      </Link>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 h-12"
                        asChild
                      >
                        <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button 
                        size="lg" 
                        className="w-full green-gradient-bg h-12"
                        asChild
                      >
                        <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile search bar */}
        {searchOpen && (
          <div className="absolute top-16 left-0 right-0 p-4 bg-background border-b border-border z-50 lg:hidden">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search services, tools..."
                className="w-full pl-10 h-12 text-base"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}