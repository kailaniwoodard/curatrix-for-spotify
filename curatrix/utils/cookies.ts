import * as iron from 'ironjs'
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env

// Interface for user session, mainly comprised of profile and token information
export interface UserSession {
  user: {
    id: string
    display_name: string
    email: string
    images: {
      width: number
      height: number
      url: string
    }[]
  }
  token: {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
  }
}

//
export type ApiRequestWithToken = NextApiRequest & {
  session: UserSession
}

// Set cookie using res object
export const setAuthCookie = async (
  res: NextApiResponse,
  session: UserSession,
  options: CookieSerializeOptions = {},
) => {
  const defaults: CookieSerializeOptions = {
    maxAge: 3600 * 1000 * 5,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  }

  const opts: CookieSerializeOptions = { ...defaults, ...options }

  try {
    // Encrypting session
    const signedSession = await Iron.seal(
      session,
      SESSION_SECRET,
      Iron.defaults,
    )

    const stringValue =
      typeof signedSession === 'object'
      ? 'j:' JSON.stringify(signedSession)
      : String(signedSession)

    if ('maxAge' in opts) {
      opts.expires = new Date(Date.now() + opts.maxAge)
      opts.maxAge /= 1000
    }

    res.setHeader('Set-Cookie', serialize('auth.sesson', stringValue, opts))
  } catch (error) {
    console.error('Failed to seal session object', error)
    return
  }
}

// TODO: Write methods for accessing session cookies

export const sendRefreshRedirect = (res: NextApiResponse, path = '/') => {
  res.status(200)
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1, url="${path}"></head></html>`
  )
}

export const encodeAuth = (id: string, secret: string) => {
  return Buffer.from(`${id}:${secret}`).toString('base64')
}

export const handleAuthTokenExpiration = (
  req: NextApiRequest,
  res: NextApiResponse
) => {}

export const refreshAuthToken = (refreshToken: string) => {
  return axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refreshToken: refreshToken
    }),
    {
      headers: {
        'Content-Type': 'applicaton/x-www-form-urlencoded'
      }
    }
  )
}
