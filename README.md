# Florence Paradis Leduc - Portfolio Website

This repository contains the source code for Florence Paradis Leduc's personal portfolio website, showcasing her work as a ceramic artist.

## Website Structure

- `/index.html` - Main homepage with gallery
- `/pages/` - Contains all content pages (bio, statement, cv, contact)
- `/css/` - Stylesheets
- `/js/` - JavaScript files
- `/assets/` - Images, logos, and other media
- `/components/` - Reusable HTML components

## Development

This is a simple static website with no build process. To run locally:

```
python -m http.server
```

Then visit `http://localhost:8000` in your browser.

## Deployment

This website is deployed using GitHub Pages. The live site can be accessed at: [florenceparadisleduc.com](https://florenceparadisleduc.com)

To deploy changes:
1. Push changes to the `main` branch
2. GitHub Pages will automatically build and deploy the updated site

## Custom Domain Setup

The site uses a custom domain with the following settings:
- CNAME record pointing to `username.github.io`
- A repository `CNAME` file with the domain name