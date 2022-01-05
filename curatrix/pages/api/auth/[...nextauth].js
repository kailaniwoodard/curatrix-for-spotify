// Kudos to Chris Bongers from https://daily-dev-tips.com for the NextAuth Spotify Integration tutorial
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = ['user-read-email',
                'user-read-private',
                'user-library-read',
                'playlist-modify-private',
                'playlist-read-collaborative',
                'playlist-read-private',
                'user-top-read',
                'playlist-modify-public'
              ].join(",");

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: {
        params: {scopes},
      },
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = token;
      return session;
    },
  },
});
