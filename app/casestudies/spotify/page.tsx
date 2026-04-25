import type { Metadata } from 'next';
import SpotifyTeardown from '@/components/sections/spotify-teardown';

export const metadata: Metadata = {
  title: "Spotify Growth Teardown · Discover Weekly & Wrapped",
  description:
    "How Spotify turned listening into loyalty. A teardown of the two features that turned a music player into a growth machine: Discover Weekly and Wrapped.",
};

export default function SpotifyPage() {
  return <SpotifyTeardown />;
}
