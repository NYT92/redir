<img src="https://github.com/NYT92/redir/blob/main/icon.png?raw=true" alt="loho" width="100" height="100">

# Redir
A simple short link app made using Deta base.

## Features

- Dashboard
- API
- Edit/delete short links
- View all short links with click count

## API route (require deta auth)

- `POST /api/create` - Create a short link

````body
id: // it will auto generate a id for the short link if you don't provide one,
original_link: // your long link,
````

- `GET /api/list` - Get all short links
- `POST /api/update/:id` - Update a short link

````body
id: // your id,
original_link: // your long link,
````

- `DELETE /api/delete/:id` - Delete a short link

## Deploy

Deploy to your own instances on Deta for free  

[![](https://button.deta.dev/1/svg)](https://deta.space/discovery/@nothing222/lenk222)

God damn i love deta...
