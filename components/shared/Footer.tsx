import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
              inflnce.io
            </h3>
            <p className="text-sm text-gray-400">
              Premium B2B wholesale platform for digital marketing and social media services.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/services/social-media" className="hover:text-green-400 transition-colors inline-block py-1">
                  Social Media
                </Link>
              </li>
              <li>
                <Link href="/services/publications" className="hover:text-green-400 transition-colors inline-block py-1">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/services/tools" className="hover:text-green-400 transition-colors inline-block py-1">
                  Digital Tools
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/dashboard" className="hover:text-green-400 transition-colors inline-block py-1">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="hover:text-green-400 transition-colors inline-block py-1">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-green-400 transition-colors inline-block py-1">
                  Apply for Access
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="mailto:support@inflnce.io" className="hover:text-green-400 transition-colors inline-block py-1">
                  Contact Support
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-400 transition-colors inline-block py-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-green-400 transition-colors inline-block py-1">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-gray-400">
              © 2024 inflnce.io. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <span>Wholesale Platform</span>
              <span className="hidden sm:inline">•</span>
              <span>USA Based</span>
              <span className="hidden sm:inline">•</span>
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}