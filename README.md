# 🚐 camper

🚐 camper is a starter kit for making static websites using [Eleventy](https://www.11ty.dev/) that can be deployed to [Netlify](https://www.netlify.com/) from a connected Git repository and edited through an admin panel using [Decap CMS](https://www.decapcms.org/).

This project only uses free and/or open-source tools and is (currently) free to deploy to Netlify using their free tier. :-)

---

## Requirements
- [npm](https://www.npmjs.com/)

## Installation
1. Clone or download this repository
2. Run `npm ci`

## Usage
- `npm run dev` to run a local development server with live reload (served over `localhost:8080`)
- `npm run build` to build everything (without starting a local server)

By default, Eleventy builds files from `/src` to `/public` (see in `/.eleventy.js`), while Parcel takes `/assets/js/main.js` and `/assets/css/main.sass` as entry points and builds to `/public/assets/js` and `/public/assets/css` accordingly (see or configure in `/package.json`). Before going live, look for the "checkit" comments to customize site names and stuff.

## Features

### Additional filters for Eleventy
(See `/.eleventy.js`)
- `{ ... | markdown }` to parse a text as markdown using [markdown-it](https://markdown-it.github.io/) and fix punctuation characters with [SmartyPants](https://www.npmjs.com/package/smartypants)
- `{ ... | smartypants }` to fix punctuation characters with [SmartyPants](https://www.npmjs.com/package/smartypants)
- `{ ... | excerpt }` to get an excerpt of a text using [excerpt-html](https://www.npmjs.com/package/excerpt-html)
- `{ ... | prettyurl }` to make a url pretty (Facebook and Instagram pages will get parsed as @username)
- `{ ... | date }` to format a date as dd/mm/yyyy
- `{ ... | year }` to get the year from a date
- `{ ... | getFirstCollectionItem }` to get the first item from a collection
- `{ ... | getLastCollectionItem }` to get the last item from a collection
- `{ ... | getCollectionItem(n) }` to get the n-th item from a collection

### Client-side tools
- [Add to Calendar Button](https://add-to-calendar-button.com/) for calendar buttons
- [Glide](https://glidejs.com/) for carousels
- [Leaflet](https://leafletjs.com/) for maps
- [Swup](https://swup.js.org/) for SPA-like transitions while navigating your site

### Eleventy plugins, build time tools
- Minify all built files with [eleventy-plugin-files-minifier](https://www.npmjs.com/package/@sherby/eleventy-plugin-files-minifier)
- Embed videos or social media posts in markdown simply by pasting in their url with [eleventy-plugin-embed-everything](https://www.npmjs.com/package/eleventy-plugin-embed-everything)
- [eleventy-img](https://www.11ty.dev/docs/plugins/image/) for image processing
- [excerpt-html](https://www.npmjs.com/package/excerpt-html) for text excerpts

### Development tools
- [Parcel](https://parceljs.org/) for parsing and bundling `.sass` to `.css` and bundling `.js`

---

## Helpful resources
- [Eleventy docs](https://www.11ty.dev/docs/)
- [Decap CMS docs](https://www.decapcms.org/docs/intro/)
- [Eleventy and Netlify CMS tutorial by Kevin Powell](https://www.youtube.com/watch?v=4wD00RT6d-g)
- [Parcel docs](https://parceljs.org/docs/)