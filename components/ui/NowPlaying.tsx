'use client';

import { useEffect, useState } from 'react';

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const POLL_MS = 45_000;

function SpotifyGlyph({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.59 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.21c3.81-.87 7.08-.5 9.72 1.11a.62.62 0 01.21.85zm1.22-2.72a.78.78 0 01-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.56 11.24 1.33.37.22.49.7.25 1.07zm.1-2.83C14.8 8.2 9.3 8.01 6.2 8.95a.93.93 0 11-.54-1.78c3.56-1.08 9.64-.87 13.45 1.39a.93.93 0 11-.95 1.6z" />
    </svg>
  );
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch('/api/now-playing');
        if (!res.ok) return;
        const json = (await res.json()) as NowPlayingData;
        if (active) setData(json);
      } catch {
        /* stay quiet — the widget just hides */
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  // Invisible until there's a real track, so the footer is unchanged before
  // Spotify is connected (and if the API ever fails).
  if (!data || !data.title) return null;

  const { isPlaying, title, artist, albumImageUrl, album, songUrl } = data;
  const label = isPlaying ? 'Now playing' : 'Last played';

  const body = (
    <span className="inline-flex items-center gap-3 rounded-full border border-border-default bg-bg-secondary/60 py-2 pl-2 pr-4 max-w-full">
      {albumImageUrl ? (
        // Spotify CDN art; a plain img avoids next/image remote config for one thumbnail.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={albumImageUrl}
          alt={album ? `${album} cover` : 'Album art'}
          width={36}
          height={36}
          className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-bg-card text-accent-secondary">
          <SpotifyGlyph />
        </span>
      )}

      {isPlaying ? (
        <span className="flex h-4 flex-shrink-0 items-end gap-[2px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="eq-bar h-full w-[3px] rounded-sm bg-accent-primary"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </span>
      ) : (
        <span className="flex-shrink-0 text-accent-secondary" aria-hidden>
          <SpotifyGlyph />
        </span>
      )}

      <span className="flex min-w-0 flex-col text-left leading-tight">
        <span className="small-caps text-text-muted">{label}</span>
        <span className="truncate text-sm text-text-primary">
          {title}
          <span className="text-text-muted"> · {artist}</span>
        </span>
      </span>
    </span>
  );

  if (!songUrl) return body;

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} on Spotify: ${title} by ${artist}`}
      className="inline-block max-w-full transition-opacity hover:opacity-90"
    >
      {body}
    </a>
  );
}
