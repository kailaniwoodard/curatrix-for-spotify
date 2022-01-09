import { NextApiRequest, NextApiResponse } from 'next'

// Required scopes for application functions
const scope = ['user-read-email',
                'user-read-private',
                'user-library-read',
                'playlist-read-collaborative',
                'playlist-read-private',
                'user-top-read',
                'playlist-modify-public',
                'playlist-modify-private'
              ]

// Pull values from .env file
const { CLIENT_ID, REDIRECT_URI } = process.env

// Building the url for user authentication
const buildURL = (scopes: string[], callback: string) => {
  return (
    'https://accounts.spotify.com/authorize?response_type=code' +
    `&client_id=${CLIENT_ID}` +
    `&scope=${encodeURIComponent(scope.join(' '))}` +
    `&redirect_uri=${encodeURIComponent(callback)}`
  )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Redirect requests to Spotify authentication
  return res.redirect(buildURL(scope, REDIRECT_URI))
}
