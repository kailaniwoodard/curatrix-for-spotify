// Kudos to Chris Bongers from https://daily-dev-tips.com for the NextAuth Spotify Integration tutorial
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope = ['user-read-email',
                'user-read-private',
                'user-library-read',
                'playlist-modify-private',
                'playlist-read-collaborative',
                'playlist-read-private',
                'user-top-read',
                'playlist-modify-public'
              ].join(" ");

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
