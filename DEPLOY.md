# Vercel Deploy

This site is a static website. There is no build step.

## Vercel config

The project is configured to deploy the `assembled-prem-matka` folder on Vercel.

## What was fixed

- Added shared previous/next navigation so chart pages can be browsed in sequence.
- Added missing `data-deletion.html`, `disclaimer.html`, and `download.html` pages so internal links do not break.
- Added `vercel.json` so Vercel serves the correct folder without extra build setup.

## Deploy steps

1. Create a new Vercel project.
2. Import this folder/repository.
3. Keep the project root at the current folder: `game data`.
4. Vercel will read `vercel.json` and serve `assembled-prem-matka`.
5. Deploy.

## Domain steps

1. In Vercel, open your project.
2. Go to `Settings` -> `Domains`.
3. Add `premmatka.com`.
4. Add `www.premmatka.com`.
5. Set one as primary and redirect the other to it.
6. Update DNS records at your domain provider using the values Vercel shows.

## Local preview

Run any static file server and open the `assembled-prem-matka` folder as the site root.

Do not open the HTML files directly with `file://` if you want the shared header to load consistently.
