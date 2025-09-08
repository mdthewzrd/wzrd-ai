"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { publicationsData } from "@/lib/publications-data";
import Image from "next/image";

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
  { id: "web3", label: "Web3", active: false },
  { id: "health", label: "Health", active: false },
  { id: "realestate", label: "Real Estate", active: false },
  { id: "travel", label: "Travel", active: false },
  { id: "food", label: "Food", active: false },
  { id: "all_publications", label: "All Publications", active: false }
];

// Get favicon URL for a publication
const getFaviconUrl = (publicationName: string) => {
  // Clean the publication name for URL
  const cleanName = publicationName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/magazine|news|post|weekly|daily/g, '');
  
  // Use Google's favicon service
  return `https://www.google.com/s2/favicons?domain=${cleanName}.com&sz=32`;
};

// Get initials for fallback when favicon fails
const getInitials = (name: string) => {
  const words = name.split(' ');
  if (words.length >= 2) {
    return words[0][0] + words[1][0];
  }
  return name.substring(0, 2);
};

export default function PublicationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleGenre = (genreId: string) => {
    if (genreId === "all_publications") {
      setSelectedGenres([]);
    } else {
      setSelectedGenres(prev => 
        prev.includes(genreId) 
          ? prev.filter(g => g !== genreId)
          : [...prev, genreId]
      );
    }
  };

  const filteredPublications = useMemo(() => {
    return publicationsData.filter(pub => {
      // Search filter
      if (searchTerm && !pub.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Genre filter
      if (selectedGenres.length > 0) {
        const pubGenresLower = pub.genres.map(g => g.toLowerCase());
        const hasMatchingGenre = selectedGenres.some(selectedGenre => {
          const genreLower = selectedGenre.toLowerCase();
          return pubGenresLower.some(pubGenre => 
            pubGenre.includes(genreLower) || genreLower.includes(pubGenre)
          );
        });
        if (!hasMatchingGenre) return false;
      }

      // Price filter - handle $2000+ case
      const maxPrice = priceRange[1] === 2000 ? Infinity : priceRange[1];
      if (pub.price < priceRange[0] || pub.price > maxPrice) {
        return false;
      }

      // Category filter (specialty publications are those > $1000)
      if (selectedCategory === "specialty" && pub.price <= 1000) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedGenres, priceRange, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Categories */}
      <div className="flex gap-4 mb-6">
        {publicationCategories.map(cat => (
          <Button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            className={selectedCategory === cat.id ? "green-gradient-bg" : ""}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <Input
          type="search"
          placeholder="Search publications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        {/* Genre Filters */}
        <div className="flex flex-wrap gap-2">
          {genreFilters.map(genre => (
            <Badge
              key={genre.id}
              variant={selectedGenres.includes(genre.id) || (genre.id === "all_publications" && selectedGenres.length === 0) ? "default" : "outline"}
              className={`cursor-pointer ${selectedGenres.includes(genre.id) || (genre.id === "all_publications" && selectedGenres.length === 0) ? 'bg-green-500' : ''}`}
              onClick={() => toggleGenre(genre.id)}
            >
              {genre.label}
            </Badge>
          ))}
        </div>

        {/* Price Range Slider */}
        <div className="max-w-md space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Price Range</span>
            <span>
              ${priceRange[0]} - {priceRange[1] === 2000 ? '$2000+' : `$${priceRange[1]}`}
            </span>
          </div>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={2000}
            step={50}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-400">
        Showing {filteredPublications.length} of {publicationsData.length} publications
      </div>

      {/* Publications Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-4 text-sm font-medium text-gray-400">Publication</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Genres</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Price</th>
              <th className="text-center p-4 text-sm font-medium text-gray-400">DA</th>
              <th className="text-center p-4 text-sm font-medium text-gray-400">DR</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">TAT</th>
              <th className="text-left p-4 text-sm font-medium text-gray-400">Region</th>
              <th className="text-center p-4 text-sm font-medium text-gray-400">Features</th>
              <th className="text-center p-4 text-sm font-medium text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPublications.map((pub) => (
              <tr key={pub.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-xs font-bold text-white relative overflow-hidden">
                      <img 
                        src={getFaviconUrl(pub.name)} 
                        alt=""
                        className="w-full h-full object-contain absolute inset-0 bg-white rounded"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                      <span className="uppercase z-10">{getInitials(pub.name)}</span>
                    </div>
                    <span className="font-medium text-white">{pub.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {pub.genres.slice(0, 2).map((genre, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                    {pub.genres.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{pub.genres.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-green-400 font-semibold">${pub.price.toLocaleString()}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm">{pub.da}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="text-sm">{pub.dr}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-400">{pub.tat}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-400">
                    {pub.region.length > 20 ? pub.region.substring(0, 20) + '...' : pub.region}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    {pub.indexed && (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30">
                        Indexed
                      </Badge>
                    )}
                    {pub.doFollow && (
                      <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30">
                        DoFollow
                      </Badge>
                    )}
                    {pub.sponsored && (
                      <Badge variant="outline" className="text-xs bg-yellow-500/10 border-yellow-500/30">
                        Sponsored
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <Button size="sm" className="green-gradient-bg">
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No publications found matching your criteria
        </div>
      )}
    </div>
  );
}