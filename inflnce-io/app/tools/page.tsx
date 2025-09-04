"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AnimatedBackground from "@/components/animated-background"
import { Zap, Search, Award, Code } from "lucide-react"
import MemberLayout from "@/components/member-layout"

export default function ToolsPage() {
  const pathname = usePathname()

  const toolSubNavItems = [
    { name: "All Tools", href: "/tools" },
    { name: "Automation", href: "/tools/automation" },
    { name: "SEO", href: "/tools/seo" },
    { name: "Knowledge Panel", href: "/tools/knowledge-panel" },
    { name: "Web Development", href: "/tools/web-development" },
  ]

  const categories = [
    {
      title: "Automation",
      description: "Streamline your workflow with our powerful automation tools.",
      icon: <Zap className="w-8 h-8 text-green-light" />,
      href: "/tools/automation",
      color: "from-green-dark/20 to-green-light/5",
      delay: 0.2,
    },
    {
      title: "Web Development",
      description: "Custom web solutions designed to elevate your online presence.",
      icon: <Code className="w-8 h-8 text-green-light" />,
      href: "/tools/web-development",
      color: "from-green-medium/20 to-green-light/5",
      delay: 0.3,
    },
    {
      title: "SEO",
      description: "Boost your visibility and rankings with our professional SEO services.",
      icon: <Search className="w-8 h-8 text-green-light" />,
      href: "/tools/seo",
      color: "from-green-dark/20 to-green-light/5",
      delay: 0.4,
    },
    {
      title: "Knowledge Panel",
      description: "Establish your authority with a Google Knowledge Panel.",
      icon: <Award className="w-8 h-8 text-green-light" />,
      href: "/tools/knowledge-panel",
      color: "from-green-medium/20 to-green-light/5",
      delay: 0.5,
    },
  ]

  return (
    <MemberLayout>
      <div className="relative">
        {/* Animated background */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <AnimatedBackground />
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Digital Marketing Tools</h1>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-text-secondary max-w-3xl">
              Explore our comprehensive suite of digital marketing tools designed to help you grow your online presence,
              engage with your audience, and drive measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: category.delay }}
              >
                <Link href={category.href} className="block h-full">
                  <div className="bg-background-secondary rounded-lg border border-background-tertiary/30 p-6 h-full relative overflow-hidden group hover:border-green-medium transition-colors">
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 group-hover:opacity-70 transition-opacity`}
                    ></div>

                    {/* Network animation */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.circle
                            key={i}
                            cx={20 + i * 15}
                            cy={20 + i * 15}
                            r={1 + i * 0.5}
                            fill="rgba(76, 217, 100, 0.5)"
                            animate={{
                              opacity: [0.3, 0.7, 0.3],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <motion.line
                            key={`line-${i}`}
                            x1={20 + i * 15}
                            y1={20 + i * 15}
                            x2={35 + i * 15}
                            y2={35 + i * 15}
                            stroke="rgba(76, 217, 100, 0.3)"
                            strokeWidth="0.5"
                            animate={{
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 3 + i,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <div className="mb-4 p-3 bg-background-tertiary/50 backdrop-blur-sm rounded-full inline-block">
                        {category.icon}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                      <p className="text-text-secondary mb-4">{category.description}</p>
                      <div className="flex items-center text-green-light font-medium">
                        Explore {category.title}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-background-secondary rounded-lg border border-background-tertiary/30 p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Background animation */}
            <div className="absolute inset-0 opacity-10">
              <AnimatedBackground className="opacity-20" />
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Custom Solutions</h2>
              <p className="text-text-secondary mb-6">
                Don't see what you're looking for? We offer custom solutions tailored to your specific needs. Our team
                of experts will work with you to create a personalized strategy that delivers results.
              </p>
              <motion.button
                className="green-gradient-bg hover:shadow-lg hover:shadow-green-dark/20 text-white font-semibold py-2 px-6 rounded-md transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </MemberLayout>
  )
}
