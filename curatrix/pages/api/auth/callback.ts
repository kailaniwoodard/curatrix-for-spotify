import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import createSpotifyApi from '../../../utils/spotify'
import { setAuthCookie } from '../../../utils/cookies'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const sendRefreshRedirect = (res: NextApiResponse, path = '/') => {
  res.status(200)
  // Send 200 response and refresh page
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } req.query

  try {
    const { data } = await axios.post(
      'http://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }).toString(),
    )

    const spotify = createSpotifyApi(data.access_token)

    const profile = await spotify.getMe()

    const session = {
      user: profile,
      token: data,
    }

    // Send session information to user in the form of a cookie header
    await setAuthCookie(res, session, {
      maxAge: data.expires_in * 1000,
    })
  // Send 200 response to set cookies and refresh the page
    return sendRefreshRedirect(res)
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong!',
    })
  }
}
