import axios from 'axios'
import * as Iron from 'ironjs'
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const { CLIENT_ID, CLIENT_SECRET, SESSION_SECRET } = process.env

// Interface for user session, mainly comprised of profile and token information
export interface UserSession {
  user: {
    id: string
    display_name: string
    email: string
    image_url: string
  }
  token: {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
  }
}
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
      ? 'j:' + JSON.stringify(signedSession)
      : String(signedSession)

    if ('maxAge' in opts) {
      opts.expires = new Date(Date.now() + opts.maxAge)
      opts.maxAge /= 1000
    }

    res.setHeader('Set-Cookie', serialize('user.session', stringValue, opts))
  } catch (error) {
    console.error('Failed to seal session object', error)
    return
  }
}

export const getSessionCookie = async (
  cookies: Record<string, string>
): Promise<UserSession> => {
  if (!cookies['user.session']) {
    throw new Error('Session not found!')
  }

  const cookie = cookies['user.session']
  const decoded = await Iron.unseal(cookie, SESSION_SECRET, Iron.defaults)

  return decoded
}

export const getAuthToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSessionCookie(req.cookies)
    return session.token.access_token
  } catch {
    throw new Error('Auth token not found!')
  }
}

export const withAuthSession = fn => async (
  req: ApiRequestWithToken,
  res: NextApiResponse,
) => {
  try {
    const session = (await getSessionCookie(req.cookies)) as UserSession
    req.session = session

    return await fn(req, res)
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
}

export const refreshAuthToken = (refreshToken: string) => {
  return axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refreshToken: refreshToken,
    }),
    {
      headers: {
        'Content-Type': 'applicaton/x-www-form-urlencoded'
      }
    }
  )
}
