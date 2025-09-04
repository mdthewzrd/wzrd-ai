import type React from "react"
import { Sparkles } from "lucide-react"
import { globalConfig } from "@/lib/config"

export default function TelegramConnect() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-background-secondary to-background-tertiary rounded-lg border-2 border-cyan-500 mt-8 mb-4 bg-cyan-500/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-telegram/30"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="bg-gradient-to-br from-telegram to-telegram/70 rounded-full p-4 flex-shrink-0 shadow-lg shadow-telegram/20">
          <TelegramIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>

        <div className="flex-grow text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-bold">Analytics & Updates via Telegram</h3>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl">
            Connect with our Telegram bot to receive real-time updates, analytics, and customer support. Monitor your
            orders and get instant notifications when they're completed.
          </p>
          <div className="text-telegram mt-1 font-medium">{globalConfig.telegramBotUsername}</div>
        </div>

        <a
          href={globalConfig.telegramConnectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group overflow-hidden bg-telegram hover:bg-telegram/90 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 w-full sm:w-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Connect Telegram
            <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="w-4 h-4">
              <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-telegram/0 via-telegram-light/30 to-telegram/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
        </a>
      </div>
    </div>
  )
}

function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}
