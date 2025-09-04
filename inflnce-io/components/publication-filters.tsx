"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import PriceRangeSlider from "./price-range-slider"

type Genre = {
  id: string
  name: string
}

type Region = {
  id: string
  name: string
}

const genres: Genre[] = [
  { id: "all", name: "All" },
  { id: "news", name: "News" },
  { id: "business", name: "Business" },
  { id: "tech", name: "Tech" },
  { id: "entertainment", name: "Entertainment" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "music", name: "Music" },
  { id: "fashion", name: "Fashion" },
  { id: "sports", name: "Sports" },
  { id: "luxury", name: "Luxury" },
  { id: "web3", name: "Web 3" },
]

const regions: Region[] = [
  { id: "all", name: "All Regions" },
  { id: "us", name: "United States" },
  { id: "europe", name: "Europe" },
  { id: "asia", name: "Asia" },
  { id: "australia", name: "Australia" },
  { id: "africa", name: "Africa" },
]

export default function PublicationFilters() {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [priceRange, setPriceRange] = useState(300)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filter Publications</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-background-tertiary hover:bg-background-secondary text-text-primary font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>{isOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      {isOpen && (
        <div className="bg-background-secondary rounded-lg p-6 border border-border mb-6">
          <div className="space-y-6">
            {/* Genres */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => setSelectedGenre(genre.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedGenre === genre.id
                        ? "bg-green-dark text-white"
                        : "bg-background-tertiary text-text-secondary hover:bg-background"
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Region */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Region</h3>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-background-tertiary border border-border rounded-md py-2 px-3 text-text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-green-medium"
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">Price Range</h3>
              <PriceRangeSlider min={0} max={5000} defaultValue={300} onChange={setPriceRange} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
