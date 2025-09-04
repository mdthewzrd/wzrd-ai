"use client"
import Link from "next/link"
import { Database, Search, Filter, BarChart3, Globe, Clock } from "lucide-react"

export default function PublicationsDatabasePage() {
  const databaseFeatures = [
    {
      id: 1,
      title: "Publication Database Access",
      icon: Database,
      description: "Access our comprehensive database of 1000+ verified publications across all industries and regions.",
      features: ["1000+ publications", "Verified contacts", "Industry categories", "Regular updates"],
      price: "$500/month",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Advanced Search & Filtering",
      icon: Search,
      description: "Find the perfect publications using advanced search filters including DA/DR, pricing, region, and industry.",
      features: ["DA/DR metrics", "Price filtering", "Geographic targeting", "Industry focus"],
      price: "Included",
      color: "bg-slate-600"
    },
    {
      id: 3,
      title: "Custom Publication Lists",
      icon: Filter,
      description: "Create custom publication lists tailored to your specific campaign goals and target audiences.",
      features: ["Custom lists", "Campaign targeting", "Saved searches", "Export options"],
      price: "$200/month",
      color: "bg-gray-600"
    },
    {
      id: 4,
      title: "Analytics & Reporting",
      icon: BarChart3,
      description: "Track performance metrics, placement success rates, and campaign effectiveness across publications.",
      features: ["Performance tracking", "Success rates", "Campaign analytics", "ROI reporting"],
      price: "$300/month",
      color: "bg-indigo-600"
    }
  ]

  const publicationStats = [
    { label: "Total Publications", value: "1,000+", icon: Globe },
    { label: "Industries Covered", value: "50+", icon: BarChart3 },
    { label: "Countries", value: "25+", icon: Globe },
    { label: "Daily Updates", value: "100+", icon: Clock }
  ]

  const samplePublications = [
    {
      name: "Tech Bullion",
      category: "Technology",
      da: 63,
      dr: 79,
      region: "Global",
      price: "$200"
    },
    {
      name: "CEO Weekly",
      category: "Business",
      da: 60,
      dr: 71,
      region: "United States",
      price: "$250"
    },
    {
      name: "Elite Luxury News",
      category: "Luxury/Lifestyle",
      da: 62,
      dr: 61,
      region: "Global",
      price: "$200"
    },
    {
      name: "Vents Magazine",
      category: "Music/Entertainment",
      da: 64,
      dr: 78,
      region: "United States",
      price: "$160"
    },
    {
      name: "Crypto Daily",
      category: "Finance/Crypto",
      da: 64,
      dr: 67,
      region: "Global",
      price: "$230"
    },
    {
      name: "Forbes Technology",
      category: "Technology",
      da: 95,
      dr: 91,
      region: "Global",
      price: "$800"
    },
    {
      name: "Business Insider",
      category: "Business",
      da: 92,
      dr: 88,
      region: "Global",
      price: "$750"
    },
    {
      name: "TechCrunch",
      category: "Technology",
      da: 94,
      dr: 90,
      region: "Global",
      price: "$900"
    },
    {
      name: "Entrepreneur Magazine",
      category: "Business",
      da: 88,
      dr: 85,
      region: "United States",
      price: "$650"
    },
    {
      name: "The Next Web",
      category: "Technology",
      da: 85,
      dr: 82,
      region: "Europe",
      price: "$450"
    },
    {
      name: "MarketWatch",
      category: "Finance",
      da: 91,
      dr: 87,
      region: "United States",
      price: "$700"
    },
    {
      name: "Mashable",
      category: "Technology",
      da: 90,
      dr: 86,
      region: "Global",
      price: "$600"
    },
    {
      name: "VentureBeat",
      category: "Technology",
      da: 89,
      dr: 84,
      region: "United States",
      price: "$550"
    },
    {
      name: "Fast Company",
      category: "Business",
      da: 87,
      dr: 83,
      region: "United States",
      price: "$500"
    },
    {
      name: "Digital Trends",
      category: "Technology",
      da: 86,
      dr: 81,
      region: "Global",
      price: "$425"
    },
    {
      name: "Health News Digest",
      category: "Health/Wellness",
      da: 72,
      dr: 68,
      region: "United States",
      price: "$300"
    },
    {
      name: "Fashion Week Daily",
      category: "Fashion/Beauty",
      da: 68,
      dr: 64,
      region: "Global",
      price: "$275"
    },
    {
      name: "Sports Business Journal",
      category: "Sports",
      da: 76,
      dr: 72,
      region: "United States",
      price: "$350"
    },
    {
      name: "Travel Industry Today",
      category: "Travel/Tourism",
      da: 71,
      dr: 67,
      region: "Global",
      price: "$280"
    },
    {
      name: "Green Tech Review",
      category: "Environment/Tech",
      da: 74,
      dr: 70,
      region: "Europe",
      price: "$320"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-700 to-blue-800 py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Publications Database</h1>
          <p className="text-blue-100 max-w-3xl">
            Access our comprehensive database of verified publications worldwide. Search, filter, and discover the perfect media outlets for your campaigns.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {publicationStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-background-secondary rounded-xl p-6 text-center border border-border">
                <IconComponent className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Database Features */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Database Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {databaseFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div key={feature.id} className="bg-background-secondary rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-text-primary">Features:</h4>
                  <ul className="text-sm text-text-secondary space-y-1">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-text-primary">{feature.price}</div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Sample Publications */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Sample Publications</h2>
        <div className="bg-background-secondary rounded-xl overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">Publication</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">DA</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">DR</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">Region</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {samplePublications.map((pub, index) => (
                  <tr key={index} className="hover:bg-background-tertiary">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600/20 rounded-md flex items-center justify-center text-blue-500 font-bold text-sm">
                          {pub.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                        </div>
                        <div className="font-medium text-text-primary">{pub.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-600/10 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                        {pub.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-primary font-medium">{pub.da}</td>
                    <td className="px-6 py-4 text-text-primary font-medium">{pub.dr}</td>
                    <td className="px-6 py-4 text-text-secondary">{pub.region}</td>
                    <td className="px-6 py-4 text-text-primary font-medium">{pub.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Request Full Database Access
          </Link>
        </div>
      </div>

      {/* Database Benefits */}
      <div className="bg-gradient-to-br from-slate-100 to-blue-50 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Database Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Verified Data</h3>
              <p className="text-gray-600">
                All publications are manually verified with accurate contact information and current metrics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-slate-600/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Smart Search</h3>
              <p className="text-gray-600">
                Advanced filtering capabilities help you find publications that match your exact criteria.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-600/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Regular Updates</h3>
              <p className="text-gray-600">
                Database is continuously updated with new publications and refreshed contact information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Access Our Publications Database?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get instant access to 1000+ verified publications and start building your media campaigns with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/publications" 
              className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}