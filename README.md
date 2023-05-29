<img src="https://github.com/NYT92/redir/blob/main/icon.png?raw=true" alt="loho" width="100" height="100">

# Redir
A simple short link app made using Deta base.

![deta](https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzQwLjE2IiBoZWlnaHQ9IjM0MC4xNiIgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE3MC4wOCIgY3k9IjE3MC4wOCIgcj0iMTQxLjczIiBmaWxsPSIjZWYzOWE4IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiLz4KPGNpcmNsZSBjeD0iMTcwLjA4IiBjeT0iMTcwLjA4IiByPSIxMTMuMzkiIGZpbGw9IiNiZDM5OWMiIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIvPgo8Y2lyY2xlIGN4PSIxNzAuMDgiIGN5PSIxNzAuMDgiIHI9Ijg1LjAzOSIgZmlsbD0iIzkzMzg4ZSIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIi8+CjxjaXJjbGUgY3g9IjE3MC4wOCIgY3k9IjE3MC4wOCIgcj0iNTYuNjkzIiBmaWxsPSIjNTYzMzc5IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiLz4KPC9zdmc+Cg==&link=https://deta.space/discovery/@nothing222/lenk222&color=%23b72833&label=Deta%20app%20Rank&prefix=%23&query=app_rank&url=https%3A%2F%2Fapptopdeta-1-h1105711.deta.app%2Fapp%2Frank%2Fnothing222%2Flenk222)

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
