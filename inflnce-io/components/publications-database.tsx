"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

// Define publication data structure
interface Publication {
  name: string
  genres: string[]
  price: number
  da: number
  dr: number
  tat: string
  region: string
  sponsored: string
  indexed: string
  doFollow: string
}

export default function PublicationsDatabase({ publications }: { publications: Publication[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: keyof Publication; direction: "asc" | "desc" } | null>(null)

  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [daRange, setDaRange] = useState<[number, number]>([0, 100])
  const [drRange, setDrRange] = useState<[number, number]>([0, 100])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [sponsoredFilter, setSponsoredFilter] = useState<string[]>([])
  const [indexedFilter, setIndexedFilter] = useState<string[]>([])
  const [doFollowFilter, setDoFollowFilter] = useState<string[]>([])

  // Extract unique values for filters
  const allGenres = Array.from(new Set(publications.flatMap((pub) => pub.genres)))
  const allRegions = Array.from(new Set(publications.map((pub) => pub.region)))
  const sponsoredOptions = Array.from(new Set(publications.map((pub) => pub.sponsored)))
  const indexedOptions = Array.from(new Set(publications.map((pub) => pub.indexed)))
  const doFollowOptions = Array.from(new Set(publications.map((pub) => pub.doFollow)))

  // Get min/max price for range slider
  const maxPrice = Math.max(...publications.map((pub) => pub.price))
  const minPrice = Math.min(...publications.map((pub) => pub.price))

  // Filter publications based on all criteria
  const filterPublications = useCallback(() => {
    let filtered = [...publications]

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (pub) =>
          pub.name.toLowerCase().includes(query) ||
          pub.genres.some((genre) => genre.toLowerCase().includes(query)) ||
          pub.region.toLowerCase().includes(query),
      )
    }

    // Apply price range filter
    filtered = filtered.filter((pub) => pub.price >= priceRange[0] && pub.price <= priceRange[1])

    // Apply DA range filter
    filtered = filtered.filter((pub) => pub.da >= daRange[0] && pub.da <= daRange[1])

    // Apply DR range filter
    filtered = filtered.filter((pub) => pub.dr >= drRange[0] && pub.dr <= drRange[1])

    // Apply genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((pub) => pub.genres.some((genre) => selectedGenres.includes(genre)))
    }

    // Apply region filter
    if (selectedRegions.length > 0) {
      filtered = filtered.filter(
        (pub) => selectedRegions.includes(pub.region) || selectedRegions.some((region) => pub.region.includes(region)),
      )
    }

    // Apply sponsored filter
    if (sponsoredFilter.length > 0) {
      filtered = filtered.filter((pub) => sponsoredFilter.includes(pub.sponsored))
    }

    // Apply indexed filter
    if (indexedFilter.length > 0) {
      filtered = filtered.filter((pub) => indexedFilter.includes(pub.indexed))
    }

    // Apply doFollow filter
    if (doFollowFilter.length > 0) {
      filtered = filtered.filter((pub) => doFollowFilter.includes(pub.doFollow))
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [
    publications,
    searchQuery,
    priceRange,
    daRange,
    drRange,
    selectedGenres,
    selectedRegions,
    sponsoredFilter,
    indexedFilter,
    doFollowFilter,
    sortConfig,
  ])

  // Update filtered publications when filters change
  useEffect(() => {
    const filtered = filterPublications()
    setFilteredPublications(filtered)
    setCurrentPage(1) // Reset to page 1 when filters change
  }, [filterPublications])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredPublications.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPublications = filteredPublications.slice(startIndex, startIndex + itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle sorting
  const requestSort = (key: keyof Publication) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get sort indicator
  const getSortIndicator = (key: keyof Publication) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([minPrice, maxPrice])
    setDaRange([0, 100])
    setDrRange([0, 100])
    setSelectedGenres([])
    setSelectedRegions([])
    setSponsoredFilter([])
    setIndexedFilter([])
    setDoFollowFilter([])
    setSortConfig(null)
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Publication", "Genres", "Price", "DA", "DR", "TAT", "Region", "Sponsored", "Indexed", "Do Follow"]
    const rows = filteredPublications.map((pub) => [
      pub.name,
      pub.genres.join(", "),
      `$${pub.price}`,
      pub.da,
      pub.dr,
      pub.tat,
      pub.region,
      pub.sponsored,
      pub.indexed,
      pub.doFollow,
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "publications.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Publications Database</h1>
        <div className="flex items-center gap-2">
          <Button onClick={resetFilters} variant="outline">
            Reset Filters
          </Button>
          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-4 w-4" />
          <Input
            type="text"
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background-tertiary"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:gap-2">
          {/* Price Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Price</span>
                </div>
                {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                  <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">Active</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Price Range</h4>
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  min={minPrice}
                  max={maxPrice}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* DA Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>DA</span>
                </div>
                {(daRange[0] > 0 || daRange[1] < 100) && (
                  <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">Active</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Domain Authority Range</h4>
                <div className="flex items-center justify-between">
                  <span>{daRange[0]}</span>
                  <span>{daRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  min={0}
                  max={100}
                  step={1}
                  value={daRange}
                  onValueChange={(value) => setDaRange(value as [number, number])}
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* DR Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>DR</span>
                </div>
                {(drRange[0] > 0 || drRange[1] < 100) && (
                  <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">Active</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Domain Rating Range</h4>
                <div className="flex items-center justify-between">
                  <span>{drRange[0]}</span>
                  <span>{drRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[0, 100]}
                  min={0}
                  max={100}
                  step={1}
                  value={drRange}
                  onValueChange={(value) => setDrRange(value as [number, number])}
                />
              </div>
            </PopoverContent>
          </Popover>

          {/* Genres Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Genres</span>
                </div>
                {selectedGenres.length > 0 && (
                  <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">
                    {selectedGenres.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
              <DropdownMenuGroup>
                {allGenres.map((genre) => (
                  <DropdownMenuItem key={genre} onSelect={(e) => e.preventDefault()}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedGenres([...selectedGenres, genre])
                          } else {
                            setSelectedGenres(selectedGenres.filter((g) => g !== genre))
                          }
                        }}
                      />
                      <label htmlFor={`genre-${genre}`} className="text-sm cursor-pointer flex-1">
                        {genre}
                      </label>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Region Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Region</span>
                </div>
                {selectedRegions.length > 0 && (
                  <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">
                    {selectedRegions.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
              <DropdownMenuGroup>
                {allRegions.map((region) => (
                  <DropdownMenuItem key={region} onSelect={(e) => e.preventDefault()}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region}`}
                        checked={selectedRegions.includes(region)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRegions([...selectedRegions, region])
                          } else {
                            setSelectedRegions(selectedRegions.filter((r) => r !== region))
                          }
                        }}
                      />
                      <label htmlFor={`region-${region}`} className="text-sm cursor-pointer flex-1">
                        {region}
                      </label>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Filters Dropdown for mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden w-full">
              <Button variant="outline" className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>More Filters</span>
                </div>
                {(sponsoredFilter.length > 0 || indexedFilter.length > 0 || doFollowFilter.length > 0) && (
                  <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">Active</span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex flex-col w-full gap-2">
                    <h4 className="font-medium">Sponsored</h4>
                    <div className="space-y-2">
                      {sponsoredOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sponsored-mobile-${option}`}
                            checked={sponsoredFilter.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSponsoredFilter([...sponsoredFilter, option])
                              } else {
                                setSponsoredFilter(sponsoredFilter.filter((o) => o !== option))
                              }
                            }}
                          />
                          <label htmlFor={`sponsored-mobile-${option}`} className="text-sm cursor-pointer flex-1">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex flex-col w-full gap-2 mt-2">
                    <h4 className="font-medium">Indexed</h4>
                    <div className="space-y-2">
                      {indexedOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`indexed-mobile-${option}`}
                            checked={indexedFilter.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setIndexedFilter([...indexedFilter, option])
                              } else {
                                setIndexedFilter(indexedFilter.filter((o) => o !== option))
                              }
                            }}
                          />
                          <label htmlFor={`indexed-mobile-${option}`} className="text-sm cursor-pointer flex-1">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex flex-col w-full gap-2 mt-2">
                    <h4 className="font-medium">Do Follow</h4>
                    <div className="space-y-2">
                      {doFollowOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dofollow-mobile-${option}`}
                            checked={doFollowFilter.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setDoFollowFilter([...doFollowFilter, option])
                              } else {
                                setDoFollowFilter(doFollowFilter.filter((o) => o !== option))
                              }
                            }}
                          />
                          <label htmlFor={`dofollow-mobile-${option}`} className="text-sm cursor-pointer flex-1">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Individual filter buttons for desktop */}
          <div className="hidden md:flex md:gap-2">
            {/* Sponsored Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Sponsored</span>
                  {sponsoredFilter.length > 0 && (
                    <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">
                      {sponsoredFilter.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {sponsoredOptions.map((option) => (
                    <DropdownMenuItem key={option} onSelect={(e) => e.preventDefault()}>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`sponsored-${option}`}
                          checked={sponsoredFilter.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSponsoredFilter([...sponsoredFilter, option])
                            } else {
                              setSponsoredFilter(sponsoredFilter.filter((o) => o !== option))
                            }
                          }}
                        />
                        <label htmlFor={`sponsored-${option}`} className="text-sm cursor-pointer flex-1">
                          {option}
                        </label>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Indexed Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Indexed</span>
                  {indexedFilter.length > 0 && (
                    <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">
                      {indexedFilter.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {indexedOptions.map((option) => (
                    <DropdownMenuItem key={option} onSelect={(e) => e.preventDefault()}>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`indexed-${option}`}
                          checked={indexedFilter.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setIndexedFilter([...indexedFilter, option])
                            } else {
                              setIndexedFilter(indexedFilter.filter((o) => o !== option))
                            }
                          }}
                        />
                        <label htmlFor={`indexed-${option}`} className="text-sm cursor-pointer flex-1">
                          {option}
                        </label>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* DoFollow Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>DoFollow</span>
                  {doFollowFilter.length > 0 && (
                    <span className="ml-1 text-xs bg-green-dark text-white rounded-full px-2">
                      {doFollowFilter.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {doFollowOptions.map((option) => (
                    <DropdownMenuItem key={option} onSelect={(e) => e.preventDefault()}>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`dofollow-${option}`}
                          checked={doFollowFilter.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDoFollowFilter([...doFollowFilter, option])
                            } else {
                              setDoFollowFilter(doFollowFilter.filter((o) => o !== option))
                            }
                          }}
                        />
                        <label htmlFor={`dofollow-${option}`} className="text-sm cursor-pointer flex-1">
                          {option}
                        </label>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Active filters */}
      {(selectedGenres.length > 0 ||
        selectedRegions.length > 0 ||
        sponsoredFilter.length > 0 ||
        indexedFilter.length > 0 ||
        doFollowFilter.length > 0 ||
        priceRange[0] > minPrice ||
        priceRange[1] < maxPrice ||
        daRange[0] > 0 ||
        daRange[1] < 100 ||
        drRange[0] > 0 ||
        drRange[1] < 100) && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-text-secondary">Active filters:</span>

          {priceRange[0] > minPrice || priceRange[1] < maxPrice ? (
            <span className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              Price: ${priceRange[0]} - ${priceRange[1]}
            </span>
          ) : null}

          {daRange[0] > 0 || daRange[1] < 100 ? (
            <span className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              DA: {daRange[0]} - {daRange[1]}
            </span>
          ) : null}

          {drRange[0] > 0 || drRange[1] < 100 ? (
            <span className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              DR: {drRange[0]} - {drRange[1]}
            </span>
          ) : null}

          {selectedGenres.map((genre) => (
            <span key={genre} className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              {genre}
            </span>
          ))}

          {selectedRegions.map((region) => (
            <span key={region} className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              {region}
            </span>
          ))}

          {sponsoredFilter.map((option) => (
            <span key={option} className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              Sponsored: {option}
            </span>
          ))}

          {indexedFilter.map((option) => (
            <span key={option} className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              Indexed: {option}
            </span>
          ))}

          {doFollowFilter.map((option) => (
            <span key={option} className="bg-green-dark/20 text-green-light text-xs rounded-full px-3 py-1">
              DoFollow: {option}
            </span>
          ))}

          <Button variant="outline" size="sm" onClick={resetFilters} className="ml-auto">
            Clear All
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-text-secondary">Showing {filteredPublications.length} publications</div>

      {/* Table */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="min-w-[320px] lg:min-w-[1200px]">
          <table className="w-full border-collapse">
            <thead className="hidden md:table-header-group">
              <tr className="bg-background-tertiary">
                <th
                  className="py-3 px-4 text-left text-sm font-medium text-text-secondary cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center gap-1">
                    PUBLICATION
                    {getSortIndicator("name")}
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">GENRES</th>
                <th
                  className="py-3 px-4 text-left text-sm font-medium text-text-secondary cursor-pointer"
                  onClick={() => requestSort("price")}
                >
                  <div className="flex items-center gap-1">
                    PRICE
                    {getSortIndicator("price")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-medium text-text-secondary cursor-pointer"
                  onClick={() => requestSort("da")}
                >
                  <div className="flex items-center gap-1">
                    DA
                    {getSortIndicator("da")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-left text-sm font-medium text-text-secondary cursor-pointer"
                  onClick={() => requestSort("dr")}
                >
                  <div className="flex items-center gap-1">
                    DR
                    {getSortIndicator("dr")}
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">TAT</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">REGION</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">SPONSORED</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">INDEXED</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">DO FOLLOW</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPublications.length > 0 ? (
                paginatedPublications.map((pub, index) => (
                  <tr
                    key={index}
                    className="border-b border-border md:table-row flex flex-col mb-6 bg-background-tertiary md:bg-transparent rounded-lg md:rounded-none overflow-hidden"
                  >
                    <td className="py-4 px-4 md:border-b md:border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-dark/30 rounded-md flex items-center justify-center text-green-light font-bold">
                          {pub.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 2)}
                        </div>
                        <div className="font-medium">{pub.name}</div>
                      </div>

                      {/* Mobile-only price and action */}
                      <div className="flex justify-between items-center mt-3 md:hidden">
                        <div className="text-lg font-bold">${pub.price}</div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#007B01] to-[#4DFF4F] text-white rounded-md hover:opacity-90 transition-opacity"
                        >
                          Buy Now
                        </Button>
                      </div>
                    </td>

                    {/* Mobile-only metrics */}
                    <td className="py-2 px-4 md:hidden">
                      <div className="grid grid-cols-3 gap-2 my-2">
                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-text-tertiary">DA</div>
                          <div className="font-medium">{pub.da}</div>
                        </div>
                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-text-tertiary">DR</div>
                          <div className="font-medium">{pub.dr}</div>
                        </div>
                        <div className="bg-background p-2 rounded-md">
                          <div className="text-xs text-text-tertiary">TAT</div>
                          <div className="font-medium">{pub.tat}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 md:border-b md:border-border">
                      <div className="md:hidden text-sm text-text-tertiary mb-1">Genres</div>
                      <div className="flex flex-wrap gap-1">
                        {pub.genres.map((genre, i) => (
                          <span
                            key={i}
                            className="tag bg-background-tertiary md:bg-background text-text-secondary px-2 py-1 rounded-md text-xs"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Desktop-only cells */}
                    <td className="py-4 px-4 border-b border-border hidden md:table-cell">${pub.price}</td>
                    <td className="py-4 px-4 border-b border-border hidden md:table-cell">{pub.da}</td>
                    <td className="py-4 px-4 border-b border-border hidden md:table-cell">{pub.dr}</td>
                    <td className="py-4 px-4 border-b border-border hidden md:table-cell">{pub.tat}</td>

                    <td className="py-4 px-4 md:border-b md:border-border">
                      <div className="md:hidden text-sm text-text-tertiary mb-1">Region</div>
                      {pub.region}
                    </td>

                    <td className="py-4 px-4 md:border-b md:border-border">
                      <div className="md:hidden text-sm text-text-tertiary mb-1">Sponsored</div>
                      <span
                        className={`tag ${
                          pub.sponsored === "Yes" || pub.sponsored === "Discrete"
                            ? "bg-green-dark/30 text-green-light"
                            : "bg-red-500/30 text-red-400"
                        } px-2 py-1 rounded-md text-xs`}
                      >
                        {pub.sponsored}
                      </span>
                    </td>

                    <td className="py-4 px-4 md:border-b md:border-border">
                      <div className="md:hidden text-sm text-text-tertiary mb-1">Indexed</div>
                      <span
                        className={`tag ${
                          pub.indexed === "Yes" ? "bg-green-dark/30 text-green-light" : "bg-red-500/30 text-red-400"
                        } px-2 py-1 rounded-md text-xs`}
                      >
                        {pub.indexed}
                      </span>
                    </td>

                    <td className="py-4 px-4 md:border-b md:border-border">
                      <div className="md:hidden text-sm text-text-tertiary mb-1">Do Follow</div>
                      <span
                        className={`tag ${
                          pub.doFollow === "Yes" ? "bg-green-dark/30 text-green-light" : "bg-red-500/30 text-red-400"
                        } px-2 py-1 rounded-md text-xs`}
                      >
                        {pub.doFollow}
                      </span>
                    </td>

                    <td className="py-4 px-4 border-b border-border hidden md:table-cell">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#007B01] to-[#4DFF4F] text-white rounded-md hover:opacity-90 transition-opacity"
                      >
                        Buy Now
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-text-secondary">
                    No publications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredPublications.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-text-secondary order-2 md:order-1">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPublications.length)} of{" "}
            {filteredPublications.length} publications
          </div>

          <div className="flex flex-wrap items-center gap-4 order-1 md:order-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers - simplified for mobile */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  // Calculate which page numbers to show
                  let pageNum: number
                  if (totalPages <= 3) {
                    pageNum = i + 1
                  } else if (currentPage <= 2) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + i
                  } else {
                    pageNum = currentPage - 1 + i
                  }

                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => handlePageChange(pageNum)}
                      aria-label={`Page ${pageNum}`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary hidden md:inline">Items per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-background-tertiary border border-border rounded-md py-1 px-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-green-medium"
                aria-label="Select number of items per page"
              >
                {[10, 20, 50, 100].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
