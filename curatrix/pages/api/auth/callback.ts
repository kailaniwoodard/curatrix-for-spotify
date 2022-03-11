import axios from 'axios'
import querystring from 'querystring'
import { NextApiRequest, NextApiResponse} from 'next'
import { setAuthCookie } from '../../../utils/cookies'
import createSpotifyApi from '../../../utils/spotify'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const sendRefreshRedirect = (res: NextApiResponse, path = '../../welcome') => {
  res.status(200)
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query
  const encodedAuth = new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
  const headers = {
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${encodedAuth}`
    }
  }
  const request = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  }

  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify(request),
      headers
    )


    const spotify = createSpotifyApi(data.access_token)

    const profile = await spotify.getMe()

    const session = {
      user: {
        id: profile.body.id,
        display_name: profile.body.display_name,
        email: profile.body.email,
        image_url: profile.body.images.find(image => image.url).url
      },
      token: {
        access_token: data.access_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
        scope: data.scope
      }
    }
    
    console.log(session)

    await setAuthCookie(res, session, {
      maxAge: data.expires_in * 1000
    })

    console.log('Success! Credentials retrieved!')
    console.log(`Testing printing display name ${session.user.display_name}`)

    return sendRefreshRedirect(res)
  } catch (error) {
    res.status(400)
    res.send(
      `<html><head><meta http-equiv="refresh" content=1;url="${'../../index'}"></head></html>`,
    )
  }  
}
