import SpotifyWebApi from 'spotify-web-api-node'

// Create new instance of the Spotify API
const createSpotifyApi = (token: string) => {
  const spotify = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  })

  spotify.setAccessToken(token)

  return spotify
}

export default createSpotifyApi
