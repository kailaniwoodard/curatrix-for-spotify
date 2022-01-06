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

const authLink = 'https://accounts.spotify.com/authorize?client_id=a0de4f15bb4348d18941c34b335bafc0&scope=user-read-email%20user-read-private%20user-library-read%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20user-top-read%20playlist-modify-public&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fapi%2Fauth%2Fcallback%2Fspotify%2Fcallback%2Fspotify&state=xUKxDA9J7xE6piWCBGlwE8I0Et7iXhJzllSN-hPYvRs'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: { authLink },
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
