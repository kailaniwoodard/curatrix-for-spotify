// Kudos to Chris Bongers from https://daily-dev-tips.com for the NextAuth Spotify Integration tutorial
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        // Modify authorization link to contain all scopes required for Curatrix
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});
