import cookie from 'cookie'
import * as Iron from 'ironjs'
import { GetServerSideProps } from 'next'
import { UserSession } from '../utils/cookies'
import App from '../src/app'

export const getSessionCookie = async (
  cookies: Record<string, string>,
): Promise<UserSession> => {
  const cookie = cookies['auth.session']

  if (!cookie) {
    throw new Error('Auth session not found')
  }

  // Decrypt the auth cookie
  const decoded = await Iron.unseal(
    cookie,
    process.env.SESSION_SECRET,
    Iron.defaults,
  )

  return decoded
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '')
    const session = await getSessionCookie(cookies)

    return {
      props: {
        user: session.user,
      },
    }
  } catch {
    return {
      props: {},
    }
  }
}

export default function Welcome(props: { user: any }) {
  return(
    <App user={props.user} />
  ) 
}