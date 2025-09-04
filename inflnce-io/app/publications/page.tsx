"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SectionDropdown from "@/components/section-dropdown"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

// Define publication data structure
interface Publication {
  name: string
  initials: string
  genres: string[]
  price: number
  da: number
  dr: number
  tat: string
  region: string
  sponsored: "Yes" | "No" | "Discrete"
  indexed: "Yes" | "No"
  doFollow: "Yes" | "No"
}

// Sample publications data
const allPublications: Publication[] = [
  {
    name: "Tech Bullion",
    initials: "TB",
    genres: ["Tech", "Business"],
    price: 200,
    da: 63,
    dr: 79,
    tat: "1 Week",
    region: "United States",
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes"
  },
  {
    name: "CEO Weekly",
    initials: "CW",
    genres: ["Business", "Finance", "Leadership"],
    price: 250,
    da: 60,
    dr: 71,
    tat: "3-5 Days",
    region: "United States",
    sponsored: "Discrete",
    indexed: "Yes",
    doFollow: "Yes"
  },
  {
    name: "Elite Luxury News",
    initials: "EL",
    genres: ["Luxury", "Fashion", "Lifestyle"],
    price: 200,
    da: 62,
    dr: 61,
    tat: "1-3 Days",
    region: "Global",
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes"
  },
  {
    name: "Daily Scanner",
    initials: "DS",
    genres: ["News", "Tech", "Business"],
    price: 150,
    da: 67,
    dr: 61,
    tat: "1 Day",
    region: "United States",
    sponsored: "No",
    indexed: "Yes",
    doFollow: "No"
  },
  {
    name: "Medium",
    initials: "MD",
    genres: ["News", "Tech"],
    price: 150,
    da: 95,
    dr: 94,
    tat: "1 Day",
    region: "Global",
    sponsored: "No",
    indexed: "Yes",
    doFollow: "No"
  },
  {
    name: "Business Insider Pro",
    initials: "BI",
    genres: ["Business", "Finance"],
    price: 300,
    da: 85,
    dr: 82,
    tat: "5-7 Days",
    region: "Global",
    sponsored: "Discrete",
    indexed: "Yes",
    doFollow: "Yes"
  },
  {
    name: "Fashion Forward",
    initials: "FF",
    genres: ["Fashion", "Lifestyle"],
    price: 220,
    da: 68,
    dr: 65,
    tat: "3-5 Days",
    region: "United States, Europe",
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes"
  },
  {
    name: "Sports Chronicle",
    initials: "SC",
    genres: ["Sports", "News"],
    price: 190,
    da: 59,
    dr: 61,
    tat: "2-4 Days",
    region: "United States",
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes"
  }
]

const categories = [
  { id: "all", name: "All Publications" },
  { id: "news", name: "News" },
  { id: "business", name: "Business" },
  { id: "tech", name: "Tech" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "fashion", name: "Fashion" },
  { id: "sports", name: "Sports" },
  { id: "luxury", name: "Luxury" }
]

const itemsPerPageOptions = [5, 10, 20]

export default function PublicationsPage() {
  return (
    <ProtectedRoute>
      <PublicationsContent />
    </ProtectedRoute>
  )
}

function PublicationsContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceFilter, setPriceFilter] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])

  // Filter publications based on active category, price filter, and search query
  const filterPublications = useCallback(() => {
    let filtered: Publication[] = [...allPublications]

    if (activeCategory !== "all") {
      filtered = allPublications.filter((pub) => 
        pub.genres.some((genre) => genre.toLowerCase() === activeCategory)
      )
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (pub) =>
          pub.name.toLowerCase().includes(query) ||
          pub.genres.some((genre) => genre.toLowerCase().includes(query)) ||
          pub.region.toLowerCase().includes(query)
      )
    }

    // Apply price filter
    if (priceFilter > 0) {
      filtered = filtered.filter((pub) => pub.price <= priceFilter)
    }

    return filtered
  }, [activeCategory, searchQuery, priceFilter])

  // Update filtered publications when filters change
  useEffect(() => {
    const filtered = filterPublications()
    setFilteredPublications(filtered)
    setCurrentPage(1)
  }, [activeCategory, searchQuery, priceFilter, filterPublications])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredPublications.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPublications = filteredPublications.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <AnimatedPageWrapper className="container mx-auto px-4 py-8">
      {/* Header */}
      <FadeInSection>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Publication Services</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Get featured in top publications and build your industry authority with our comprehensive publication network.
          </p>
        </div>
      </FadeInSection>

      {/* Premium Services */}
      <FadeInSection delay={0.2}>
        <SectionDropdown title="Premium Publication Services" defaultOpen={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ScaleOnHover>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <h3 className="text-xl font-bold text-white mb-2">Press Release Distribution</h3>
                <p className="text-gray-400 mb-4">Professional press release writing and distribution to 500+ outlets</p>
                <div className="text-2xl font-bold text-green-400 mb-4">$299</div>
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200">Get Started</Button>
              </div>
            </ScaleOnHover>
            <ScaleOnHover>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <h3 className="text-xl font-bold text-white mb-2">Guaranteed Publication</h3>
                <p className="text-gray-400 mb-4">100% guaranteed placement in tier-1 publications</p>
                <div className="text-2xl font-bold text-blue-400 mb-4">$499</div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200">Learn More</Button>
              </div>
            </ScaleOnHover>
        </div>
      </SectionDropdown>
      </FadeInSection>

      {/* Publication Database */}
      <FadeInSection delay={0.3}>
        <SectionDropdown title="Publication Database" defaultOpen={true}>
        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search and Price Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Max Price:</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm text-green-400 min-w-[60px]">
                {priceFilter === 0 ? "Any" : `$${priceFilter}`}
              </span>
            </div>
          </div>
        </div>

        {/* Publications Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">PUBLICATION</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">GENRES</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">PRICE</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">DA</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">DR</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">TAT</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">REGION</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPublications.length > 0 ? (
                paginatedPublications.map((pub, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600/30 rounded-md flex items-center justify-center text-green-400 font-bold text-sm">
                          {pub.initials}
                        </div>
                        <div className="text-white font-medium">{pub.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {pub.genres.map((genre, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-green-400 font-bold">${pub.price}</td>
                    <td className="py-4 px-4 text-blue-400">{pub.da}</td>
                    <td className="py-4 px-4 text-purple-400">{pub.dr}</td>
                    <td className="py-4 px-4 text-gray-300">{pub.tat}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{pub.region}</td>
                    <td className="py-4 px-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Order
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No publications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredPublications.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPublications.length)} of{" "}
              {filteredPublications.length} publications
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md bg-gray-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${
                          currentPage === pageNum
                            ? "bg-green-600 text-white"
                            : "bg-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md bg-gray-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 rounded-md py-1 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </SectionDropdown>

      {/* Publication Types */}
      <SectionDropdown title="Publication Types">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-blue-400 mb-2">News Publications</h3>
            <p className="text-gray-400 mb-4">Major news outlets and daily publications</p>
            <div className="text-sm text-gray-500">Average Price: $180-$250</div>
          </div>
          <div className="bg-green-600/10 border border-green-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-green-400 mb-2">Business Publications</h3>
            <p className="text-gray-400 mb-4">Industry magazines and business journals</p>
            <div className="text-sm text-gray-500">Average Price: $200-$300</div>
          </div>
          <div className="bg-purple-600/10 border border-purple-500/20 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-purple-400 mb-2">Lifestyle Publications</h3>
            <p className="text-gray-400 mb-4">Fashion, luxury, and lifestyle magazines</p>
            <div className="text-sm text-gray-500">Average Price: $150-$220</div>
          </div>
        </div>
      </SectionDropdown>

      {/* Publication Benefits */}
      <SectionDropdown title="Why Publication Services Matter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">Build Authority</h3>
            <p className="text-gray-400">Establish credibility and thought leadership in your industry</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">SEO Benefits</h3>
            <p className="text-gray-400">High-quality backlinks from authoritative domains</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">Brand Visibility</h3>
            <p className="text-gray-400">Reach new audiences and expand your market presence</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-2">Media Relations</h3>
            <p className="text-gray-400">Build relationships with journalists and editors</p>
          </div>
        </div>
      </SectionDropdown>
      </FadeInSection>
    </AnimatedPageWrapper>
  )
}