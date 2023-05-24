---
title: "redir"
tagline: "Your own short link made using Deta base"
theme_color: "#b72833"
homepage: "https://demodeta.aslnk.ml/hello"
git: "https://github.com/nyt92/redir"
---

A simple short link app made using Deta base.

## Features

- Dashboard UI
- API
- Edit/delete short links
- View all short links with click count

## API route (require API KEY)

**⚠ To use this route, create an API key from the redir app that you install...**

- Add this to your request header

  ```header
  "X-Space-App-Key": "<YOUR API KEY>"
  ```

- `POST /api/create` - Create a short link

  ```body
  id: // it will auto generate a id for the short link if you don't provide one,
  original_link: // your long link,
  ```

- `GET /api/list` - Get all short links
- `POST /api/update/:id` - Update a short link

  ```body
  id: // your id,
  original_link: // your long link,
  ```

- `DELETE /api/delete/:id` - Delete a short link
