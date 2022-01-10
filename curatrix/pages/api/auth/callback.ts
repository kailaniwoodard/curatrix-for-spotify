import axios from 'axios'
import { NextApiRequest, NextApiResponse} from 'next'

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const sendRefreshRedirect = (res: NextApiResponse, path = '../../welcome') => {
  res.status(200)
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  )
}

export const getAuthToken = async () => {
  const encodedAuth = new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
  const headers = {
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
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

    console.log('Success! Auth token retrieved!')
    return response.data.access_token
    
  } catch (error) {
    console.log('Failed to retrieve auth token!')
    return null
  }  
}

export const authToken = getAuthToken()

export default async(req: NextApiRequest, res: NextApiResponse) => {
  if (authToken != null) {
    sendRefreshRedirect(res)
  } else {
    res.status(400)
    res.send(
      `<html><head><meta http-equiv="refresh" content=1;url="${'../../index'}"></head></html>`,
    )
  }
}
