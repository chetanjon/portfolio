// Server-only Spotify helper. Uses a stored refresh token to mint a short-lived
// access token, then reads the current (or most recent) track. Never throws to
// callers that wrap it; returns { isPlaying: false } when unconfigured.

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

export type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

interface SpotifyTrack {
  name?: string;
  artists?: { name: string }[];
  album?: { name?: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
}

function normalize(item: SpotifyTrack | undefined, isPlaying: boolean): NowPlaying {
  if (!item) return { isPlaying: false };
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists ?? []).map((a) => a.name).join(', '),
    album: item.album?.name,
    albumImageUrl: item.album?.images?.[0]?.url,
    songUrl: item.external_urls?.spotify,
  };
}

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const token = await getAccessToken();
  if (!token) return { isPlaying: false };

  const playing = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (playing.status === 200) {
    const data = (await playing.json()) as {
      item?: SpotifyTrack;
      is_playing?: boolean;
      currently_playing_type?: string;
    };
    if (data.item && data.currently_playing_type === 'track') {
      return normalize(data.item, Boolean(data.is_playing));
    }
  }

  // Nothing playing right now: fall back to the most recent track.
  const recent = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (recent.ok) {
    const data = (await recent.json()) as { items?: { track: SpotifyTrack }[] };
    return normalize(data.items?.[0]?.track, false);
  }

  return { isPlaying: false };
}
