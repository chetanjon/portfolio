#!/usr/bin/env node
/*
 * One-time helper to get a Spotify refresh token for the "Now Playing" widget.
 *
 * Setup:
 *   1. Create an app at https://developer.spotify.com/dashboard
 *      - copy the Client ID and Client Secret
 *      - add this exact Redirect URI: http://127.0.0.1:8888/callback
 *   2. Run this script with the credentials in your environment:
 *        SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-refresh-token.mjs
 *   3. Open the printed URL, click Agree. The refresh token prints in this terminal.
 *   4. Put SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN in
 *      .env.local (local dev) and in your Vercel project's Environment Variables
 *      (production), then redeploy.
 */
import http from 'node:http';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8888/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing credentials.\n');
  console.error('Run: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-refresh-token.mjs');
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== '/callback') {
    res.writeHead(404);
    res.end();
    return;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400);
    res.end('No authorization code in the callback.');
    return;
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
  });
  const data = await tokenRes.json();

  if (data.refresh_token) {
    console.log('\n✅ Your SPOTIFY_REFRESH_TOKEN:\n');
    console.log(data.refresh_token);
    console.log('\nAdd it to .env.local and your Vercel env, alongside SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.\n');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h2>Done. Copy the refresh token from your terminal, then close this tab.</h2>');
  } else {
    console.error('\nToken exchange failed:', data);
    res.writeHead(500);
    res.end('Token exchange failed; see the terminal.');
  }

  setTimeout(() => process.exit(0), 200);
});

server.listen(8888, '127.0.0.1', () => {
  console.log('\nOpen this URL in your browser to authorize:\n');
  console.log(authUrl.toString());
  console.log('\nWaiting for the redirect to http://127.0.0.1:8888/callback ...\n');
});
