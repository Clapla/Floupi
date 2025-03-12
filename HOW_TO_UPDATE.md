# How to Update Your Website

This guide will show you how to update your website content, add new images, and make other changes.

## Adding New Work to the Gallery

1. **Add the image file:**
   - Save your image in the `/assets/images/` folder
   - Use a clear file name like `blue-vase.jpg` or `sculpture-waves.jpg`

2. **Create a description file:**
   - Go to the `/content/gallery/` folder
   - Create a new markdown file (.md) with a name that matches your image (e.g., `blue-vase.md`)
   - Use this template for the file content:

```markdown
---
title: Blue Vase
medium: Stoneware with Celadon Glaze
year: 2025
image: blue-vase.jpg
category: vessels
order: 10
featured: false
---
Description of the piece goes here. You can write as much as you want after the --- marks.
```

3. **Update the file list:**
   - Open the file `/js/load_images_descriptions.js`
   - Find the array called `markdownFiles` (around line 15)
   - Add your new file to the list like this:
     ```javascript
     '/content/gallery/blue-vase.md',
     ```

## Updating Your Bio, CV, or Statement

1. **Edit the markdown files:**
   - Go to the `/content/about/` folder
   - Open the file you want to change (statement.md, bio.md, cv.md, or contact.md)
   - Edit the text as needed
   - Save the file

## Changing Category Filters

The current categories are: "process", "vessels", and "sculptures". If you want to add a new category:

1. **Add a button to the filter:**
   - Open `/js/load_images_descriptions.js`
   - Find the `filterContainer.innerHTML` section (around line 25)
   - Add a new button with your category name:
     ```html
     <button class="filter-button" data-category="your-category">Your Category</button>
     ```

2. **Use the category in your work:**
   - When creating new gallery items, use your new category name:
     ```
     category: your-category
     ```

## Understanding Fields in the Markdown Files

For gallery items:
- `title`: The name of the work (will appear as a heading)
- `medium`: The materials used in the piece
- `year`: When the piece was created
- `image`: The filename of the image (must match exactly what's in the assets/images folder)
- `category`: Used for filtering (current categories: process, vessels, sculptures)
- `order`: Controls the display order (lower numbers appear first)
- `featured`: Set to true to mark as a featured work

## Local Development

To test your changes locally:
1. Open a terminal in your project directory
2. Run `python -m http.server`
3. Open a browser and go to http://localhost:8000

## Deploying Your Changes

After making changes:
1. Commit them to your git repository
2. Push to GitHub
3. Your site will automatically update

Need help? Contact your developer for assistance.