"use client"
import Link from "next/link"
import { FileText, Award, Star, Zap, Target, TrendingUp } from "lucide-react"

export default function SpecialtyPublicationsPage() {
  const specialtyServices = [
    {
      id: 1,
      title: "Premium Press Releases",
      icon: FileText,
      description: "Professional press release writing and distribution to tier-1 publications with guaranteed placement.",
      features: ["Professional writing", "Tier-1 outlets", "Guaranteed placement", "SEO optimization"],
      price: "$1,500",
      turnaround: "3-5 business days",
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Industry Authority Features",
      icon: Award,
      description: "Get featured as an industry expert in specialized trade publications and niche magazines.",
      features: ["Expert positioning", "Trade publications", "Byline articles", "Industry credibility"],
      price: "$2,000",
      turnaround: "1-2 weeks",
      color: "bg-slate-600"
    },
    {
      id: 3,
      title: "Executive Thought Leadership",
      icon: Star,
      description: "Position your executives as thought leaders through strategic bylined articles and interviews.",
      features: ["Executive interviews", "Bylined articles", "Thought leadership", "Media training"],
      price: "$2,500",
      turnaround: "2-3 weeks",
      color: "bg-gray-600"
    },
    {
      id: 4,
      title: "Crisis Communication",
      icon: Zap,
      description: "Rapid response publication services for crisis management and reputation recovery.",
      features: ["24/7 availability", "Rapid deployment", "Crisis messaging", "Reputation management"],
      price: "$3,000",
      turnaround: "24-48 hours",
      color: "bg-red-600"
    },
    {
      id: 5,
      title: "Targeted Media Campaigns",
      icon: Target,
      description: "Multi-publication campaigns targeting specific demographics, industries, or geographical regions.",
      features: ["Multi-outlet placement", "Demographic targeting", "Campaign strategy", "Performance tracking"],
      price: "$4,000",
      turnaround: "2-4 weeks",
      color: "bg-indigo-600"
    },
    {
      id: 6,
      title: "IPO & Major Announcements",
      icon: TrendingUp,
      description: "Comprehensive media coverage for major corporate announcements, IPOs, and milestone events.",
      features: ["Major outlet placement", "Investor relations", "Market coverage", "Timeline coordination"],
      price: "$5,000+",
      turnaround: "1-3 weeks",
      color: "bg-emerald-600"
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-700 to-blue-800 py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Specialty Publication Services</h1>
          <p className="text-blue-100 max-w-3xl">
            Premium publication services for high-impact media coverage. Our specialty offerings provide enhanced placement, expert positioning, and strategic communication solutions.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialtyServices.map((service) => {
            const IconComponent = service.icon
            return (
              <div key={service.id} className="bg-background-secondary rounded-xl p-6 border border-border hover:border-blue-400 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${service.color}/20 rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-blue-500`} />
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </div>
                
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 text-text-primary">Key Features:</h4>
                  <ul className="text-xs text-text-secondary space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-bold text-text-primary">{service.price}</div>
                    <div className="text-xs text-text-secondary">{service.turnaround}</div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                    Get Quote
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Premium Benefits */}
      <div className="bg-gradient-to-br from-slate-100 to-blue-50 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Why Choose Specialty Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Premium Placement</h3>
              <p className="text-gray-600 text-sm">
                Guaranteed placement in top-tier publications with high editorial standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-slate-600/20 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Expert Positioning</h3>
              <p className="text-gray-600 text-sm">
                Position your brand and executives as industry thought leaders and experts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-600/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Strategic Targeting</h3>
              <p className="text-gray-600 text-sm">
                Reach specific audiences through carefully selected publications and channels.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Measurable Impact</h3>
              <p className="text-gray-600 text-sm">
                Track performance with detailed analytics and comprehensive reporting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-slate-700 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready to Elevate Your Media Presence?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our specialty publication services provide the premium placement and strategic positioning your brand deserves. Contact us to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Sales
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