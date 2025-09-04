// Application configuration
export const config = {
  app: {
    name: 'inflnce',
    description: 'Social Media Marketing Platform',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  },
  
  // Social media API configurations (placeholder for development)
  social: {
    instagram: {
      apiUrl: process.env.INSTAGRAM_API_URL || 'https://api.instagram.com',
      clientId: process.env.INSTAGRAM_CLIENT_ID || 'dev_client_id'
    },
    twitter: {
      apiUrl: process.env.TWITTER_API_URL || 'https://api.twitter.com',
      apiKey: process.env.TWITTER_API_KEY || 'dev_api_key'
    },
    tiktok: {
      apiUrl: process.env.TIKTOK_API_URL || 'https://open-api.tiktok.com',
      clientKey: process.env.TIKTOK_CLIENT_KEY || 'dev_client_key'
    },
    youtube: {
      apiUrl: process.env.YOUTUBE_API_URL || 'https://www.googleapis.com/youtube/v3',
      apiKey: process.env.YOUTUBE_API_KEY || 'dev_api_key'
    },
    linkedin: {
      apiUrl: process.env.LINKEDIN_API_URL || 'https://api.linkedin.com/v2',
      clientId: process.env.LINKEDIN_CLIENT_ID || 'dev_client_id'
    },
    spotify: {
      apiUrl: process.env.SPOTIFY_API_URL || 'https://api.spotify.com/v1',
      clientId: process.env.SPOTIFY_CLIENT_ID || 'dev_client_id'
    }
  },

  // Development mode settings
  development: {
    enableMockAuth: true,
    enableMockData: true,
    bypassPayments: true
  }
}

export default config
export { config as globalConfig }