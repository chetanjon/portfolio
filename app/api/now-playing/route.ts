import { getNowPlaying, type NowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

// Sample payload for verifying the widget UI without real credentials:
// run with NOW_PLAYING_MOCK=1. The album art is a self-contained data URI so it
// always renders.
const MOCK: NowPlaying = {
  isPlaying: true,
  title: 'Midnight City',
  artist: 'M83',
  album: 'Hurry Up, We’re Dreaming',
  albumImageUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236B5DAD'/%3E%3Cstop offset='1' stop-color='%233F8C73'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23g)'/%3E%3C/svg%3E",
  songUrl: 'https://open.spotify.com/track/6GyFP1nfCDB8lbN6jdwGeP',
};

export async function GET() {
  const headers = { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=30' };
  try {
    if (process.env.NOW_PLAYING_MOCK === '1') {
      return Response.json(MOCK, { headers });
    }
    const data = await getNowPlaying();
    return Response.json(data, { headers });
  } catch {
    // Never take the widget (or the page) down because of Spotify.
    return Response.json({ isPlaying: false } satisfies NowPlaying, { headers });
  }
}
