"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, DollarSign, Clock, Video } from "lucide-react";

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

// TV Station data for specialty publications
interface TVStation {
  callSign: string;
  station: string;
  rate: number;
  tat: string;
  sponsored: boolean;
  indexed: boolean;
  segmentLength: string;
  location: string;
  programName: string;
  interviewType: string;
  example: string;
}

const tvStationsData: TVStation[] = [
  { callSign: "KDAF", station: "Dallas Area Fox", rate: 1000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Texas", programName: "Innovator's Journey", interviewType: "Video Call", example: "" },
  { callSign: "KSWB", station: "Fox 5 San Diego", rate: 1000, tat: "1 Week", sponsored: true, indexed: false, segmentLength: "5-10 Minutes", location: "California", programName: "Innovator's Journey", interviewType: "Video Call", example: "" },
  { callSign: "USA Today TV", station: "USA Today", rate: 5000, tat: "1-2 Weeks", sponsored: false, indexed: true, segmentLength: "3-5 Minutes", location: "United States", programName: "Contributor Content", interviewType: "Video Call", example: "" },
  { callSign: "PIX11", station: "WPIX-TV", rate: 1000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "New York", programName: "Innovator's Journey", interviewType: "Video Call", example: "" },
  { callSign: "WNCT", station: "CBS", rate: 1600, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "North Carolina", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WCMH", station: "NBC", rate: 3000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Ohio", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KWBQ", station: "CW", rate: 2000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "New Mexico", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WHO", station: "NBC", rate: 2000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Iowa", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WKRN", station: "ABC", rate: 4000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Tennessee", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KIAH", station: "CW", rate: 3500, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Texas", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KHON", station: "Fox", rate: 5000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Hawaii", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KTVI", station: "Fox", rate: 3000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Missouri", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WHBF", station: "CBS", rate: 800, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Illinois", programName: "LifeStyle Segment", interviewType: "Zoom", example: "" },
  { callSign: "KLBK", station: "CBS", rate: 1500, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Texas", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WBTW", station: "CBS", rate: 1000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "SC-NC", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KTLA", station: "CW", rate: 31000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "California", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WQRF", station: "Fox", rate: 2000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Illinois", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "WJW", station: "Fox", rate: 10000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Ohio", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KTVX", station: "ABC", rate: 6000, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "Utah", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
  { callSign: "KGET", station: "NBC", rate: 800, tat: "1 Week", sponsored: true, indexed: true, segmentLength: "5-10 Minutes", location: "California", programName: "LifeStyle Segment", interviewType: "Satellite, Studio", example: "" },
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
  
  // TV Station specific filters
  const [networkFilter, setNetworkFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rate");

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

  const getNetworkColor = (station: string) => {
    if (station.includes("Fox")) return "bg-orange-500";
    if (station.includes("NBC")) return "bg-red-500";
    if (station.includes("CBS")) return "bg-blue-500";
    if (station.includes("ABC")) return "bg-green-500";
    if (station.includes("CW")) return "bg-purple-500";
    return "bg-gray-500";
  };

  const networks = Array.from(new Set(tvStationsData.map(station => station.station)));
  const locations = Array.from(new Set(tvStationsData.map(station => station.location)));

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

  // Filter TV stations for specialty publications
  const filteredTVStations = useMemo(() => {
    if (activeCategory !== "specialty") return [];
    
    const filtered = tvStationsData.filter(station => {
      const matchesSearch = 
        station.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.programName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesNetwork = networkFilter === "all" || station.station === networkFilter;
      const matchesLocation = locationFilter === "all" || station.location === locationFilter;
      const priceInRange = station.rate >= priceRange[0] && station.rate <= priceRange[1] * 100; // Convert to match TV station rates

      return matchesSearch && matchesNetwork && matchesLocation && priceInRange;
    });

    // Sort stations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rate":
          return b.rate - a.rate;
        case "location":
          return a.location.localeCompare(b.location);
        case "station":
          return a.station.localeCompare(b.station);
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeCategory, searchTerm, networkFilter, locationFilter, priceRange, sortBy]);

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
          placeholder={activeCategory === "specialty" ? "Search TV stations, locations..." : "Search publications..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 max-w-md"
        />
      </div>

      {/* TV Station specific filters - only show for specialty */}
      {activeCategory === "specialty" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select value={networkFilter} onValueChange={setNetworkFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="All Networks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Networks</SelectItem>
              {networks.map((network) => (
                <SelectItem key={network} value={network}>
                  {network}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rate">Rate (High to Low)</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="station">Network</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Price Filter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-white font-medium">Price Filter</label>
          <span className="text-green-400">
            {activeCategory === "specialty" ? 
              `$${(priceRange[0] * 100).toLocaleString()} - $${(priceRange[1] * 100).toLocaleString()}` :
              `$${priceRange[0]} - $${priceRange[1]}`
            }
          </span>
        </div>
        <div className="max-w-md">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={activeCategory === "specialty" ? 310 : 300}
            min={0}
            step={activeCategory === "specialty" ? 10 : 5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>{activeCategory === "specialty" ? "$0" : "$0"}</span>
            <span>{activeCategory === "specialty" ? "$15,000" : "$150"}</span>
            <span>{activeCategory === "specialty" ? "$31,000" : "$300"}</span>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-400">
          {activeCategory === "specialty" ? 
            `Showing ${filteredTVStations.length} of ${tvStationsData.length} TV stations` :
            `Showing ${filteredPublications.length} of ${publicationsData.length} publications`
          }
        </p>
      </div>

      {/* Publications/TV Stations Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          {activeCategory === "specialty" ? (
            /* TV Stations Table */
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Call Sign</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>TAT</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Interview Type</TableHead>
                      <TableHead>Segment Length</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTVStations.map((station, index) => (
                      <TableRow key={`${station.callSign}-${index}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getNetworkColor(station.station)}`} />
                            {station.callSign}
                          </div>
                        </TableCell>
                        <TableCell>{station.station}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {station.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-500" />
                            {station.rate.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {station.tat}
                          </div>
                        </TableCell>
                        <TableCell>{station.programName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Video className="h-3 w-3 text-muted-foreground" />
                            {station.interviewType}
                          </div>
                        </TableCell>
                        <TableCell>{station.segmentLength}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Badge variant={station.sponsored ? "default" : "secondary"} className="text-xs">
                              {station.sponsored ? "Sponsored" : "Editorial"}
                            </Badge>
                            {station.indexed && (
                              <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                                Indexed
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Book Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            /* Publications Table */
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
          )}
        </div>
      </div>
    </div>
  );
}