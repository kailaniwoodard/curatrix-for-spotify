import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

import createSpotifyApi from '../../../utils/spotify'
import { setAuthCookie } from '../../../utils/cookies'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const sendRefreshRedirect = (res: NextApiResponse, path = '../../welcome') => {
  res.status(200)
  // Send 200 response and refresh page
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

export const getAuth = async () => {
  const encodedAuth = new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
  const headers = {
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www.form-urlencoded',
    Authorization: `Basic ${encodedAuth}`
    }
  }
  const data = {
    grant_type: 'client_credentials',
  }
  const dataStr = new URLSearchParams(data).toString()

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      dataStr,
      headers
    )
    console.log(response.data.access_token)
    return response.data.access_token
  } catch (error) {
    console.log(error)
  }
}

export default getAuth

/**
export const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
  // BASE64-encoded authorization code, comprised of CLIENT_ID and CLIENT_SECRET
  const encodedAuth = new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64')
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedAuth}`
    }
  }
  const { code } = req.query
  const data = {
    grant_type: 'client_credentials',
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  }
  const dataStr = new URLSearchParams(data).toString()

  try {
    const response = await axios.post(
      'http://accounts.spotify.com/api/token',
      dataStr,
      headers
    )
    console.log(response.data.access_token)
    return response.data.access_token
  } catch (error) {
    console.log(error)
  }
}
*/

/*
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query
  const params = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  }
  const paramsStr = new URLSearchParams(params).toString()

  try {
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: paramsStr,
      headers: {
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      }
    }).then((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })

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
*/
