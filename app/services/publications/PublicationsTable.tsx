"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const publicationCategories = [
  { id: "all", label: "All Publications", active: true },
  { id: "specialty", label: "Specialty Publications", active: false }
];

const genreFilters = [
  { id: "bestsellers", label: "Best Sellers", active: false },
  { id: "news", label: "News", active: false },
  { id: "business", label: "Business", active: false },
  { id: "tech", label: "Tech", active: false },
  { id: "entertainment", label: "Entertainment", active: false },
  { id: "lifestyle", label: "Lifestyle", active: false },
  { id: "music", label: "Music", active: false },
  { id: "fashion", label: "Fashion", active: false },
  { id: "sports", label: "Sports", active: false },
  { id: "luxury", label: "Luxury", active: false },
  { id: "web3", label: "Web 3", active: false },
  { id: "all_publications", label: "All Publications", active: false }
];

const publicationsData = [
  {
    id: "hc",
    name: "Hood Critic",
    genres: ["Music"],
    price: 150,
    da: 11,
    dr: 24,
    tat: "1-3 Days",
    region: "United States, Utah",
    sponsored: false,
    indexed: true,
    doFollow: true
  },
  {
    id: "ds",
    name: "Daily Scanner",
    genres: ["News", "Tech", "Business", "Entertainment", "Lifestyle"],
    price: 150,
    da: 67,
    dr: 61,
    tat: "1 Day",
    region: "United States",
    sponsored: false,
    indexed: true,
    doFollow: false
  },
  {
    id: "md",
    name: "Medium",
    genres: ["News"],
    price: 150,
    da: 95,
    dr: 94,
    tat: "1 Day",
    region: "Global",
    sponsored: false,
    indexed: true,
    doFollow: false
  },
  {
    id: "vm",
    name: "Vents Magazine",
    genres: ["Music", "Entertainment", "Culture"],
    price: 160,
    da: 64,
    dr: 78,
    tat: "1-3 Days",
    region: "United States",
    sponsored: false,
    indexed: true,
    doFollow: true
  },
  {
    id: "tt",
    name: "Tech Today",
    genres: ["Tech", "News"],
    price: 180,
    da: 62,
    dr: 58,
    tat: "2-4 Days",
    region: "United States",
    sponsored: false,
    indexed: true,
    doFollow: true
  },
  {
    id: "hw",
    name: "Health & Wellness",
    genres: ["Health", "Lifestyle"],
    price: 175,
    da: 58,
    dr: 55,
    tat: "2-4 Days",
    region: "United States",
    sponsored: false,
    indexed: true,
    doFollow: true
  }
];

export default function PublicationsTable() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);

  const toggleGenre = (genreId: string) => {
    if (activeGenres.includes(genreId)) {
      setActiveGenres(activeGenres.filter(g => g !== genreId));
    } else {
      setActiveGenres([...activeGenres, genreId]);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  // Filter publications based on active filters
  const filteredPublications = useMemo(() => {
    return publicationsData.filter((pub) => {
      // Price filter
      const priceInRange = pub.price >= priceRange[0] && pub.price <= priceRange[1];
      
      // Search filter
      const matchesSearch = searchTerm === "" || 
        pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Genre filter
      const matchesGenre = activeGenres.includes("all_publications") || 
        activeGenres.length === 0 || 
        activeGenres.some(activeGenre => {
          if (activeGenre === "bestsellers") return pub.da >= 80; // High DA publications
          return pub.genres.some(pubGenre => 
            pubGenre.toLowerCase().includes(activeGenre.toLowerCase()) ||
            activeGenre.toLowerCase().includes(pubGenre.toLowerCase())
          );
        });
      
      // Category filter
      const matchesCategory = activeCategory === "all" || 
        (activeCategory === "specialty" && pub.da >= 60); // Specialty = high authority
      
      return priceInRange && matchesSearch && matchesGenre && matchesCategory;
    });
  }, [priceRange, searchTerm, activeGenres, activeCategory]);

  return (
    <div className="container mx-auto px-4 pb-8">
      {/* Category Tabs */}
      <div className="flex gap-4 mb-6">
        {publicationCategories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`${
              activeCategory === category.id
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            } px-6 py-2 rounded-full`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Genre Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {genreFilters.map((genre) => (
          <Button
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            size="sm"
            className={`${
              activeGenres.includes(genre.id)
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            } rounded-full`}
          >
            {genre.label}
          </Button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search publications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 max-w-md"
        />
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-white font-medium">Price Filter</label>
          <span className="text-green-400">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <div className="max-w-md">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>$0</span>
            <span>$150</span>
            <span>$300</span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {filteredPublications.length} of {publicationsData.length} publications
        </p>
      </div>

      {/* Publications Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-white font-medium">PUBLICATION</th>
                <th className="px-4 py-3 text-left text-white font-medium">GENRES</th>
                <th className="px-4 py-3 text-left text-white font-medium">PRICE</th>
                <th className="px-4 py-3 text-left text-white font-medium">DA</th>
                <th className="px-4 py-3 text-left text-white font-medium">DR</th>
                <th className="px-4 py-3 text-left text-white font-medium">TAT</th>
                <th className="px-4 py-3 text-left text-white font-medium">REGION</th>
                <th className="px-4 py-3 text-left text-white font-medium">SPONSORED</th>
                <th className="px-4 py-3 text-left text-white font-medium">INDEXED</th>
                <th className="px-4 py-3 text-left text-white font-medium">DO FOLLOW</th>
                <th className="px-4 py-3 text-left text-white font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublications.map((pub) => (
                <tr key={pub.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                        {getInitials(pub.name)}
                      </div>
                      <span className="text-white font-medium">{pub.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pub.genres.map((genre, idx) => (
                        <span key={idx} className="text-gray-400 text-sm">
                          {genre}{idx < pub.genres.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white font-semibold">${pub.price}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white">{pub.da}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white">{pub.dr}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white">{pub.tat}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white">{pub.region}</span>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={pub.sponsored ? "bg-green-500" : "bg-red-500"}>
                      {pub.sponsored ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={pub.indexed ? "bg-green-500" : "bg-red-500"}>
                      {pub.indexed ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={pub.doFollow ? "bg-green-500" : "bg-red-500"}>
                      {pub.doFollow ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      Buy Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}