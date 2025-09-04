"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

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

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-md text-sm text-muted-foreground sm:pr-12 md:w-64 lg:w-80"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search services, tools...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search services, tools..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchItems.map((group) => (
            <CommandGroup key={group.category} heading={group.category}>
              {group.items.map((item) => (
                <CommandItem key={item.href} onSelect={() => handleSelect(item.href)}>
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
