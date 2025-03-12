# Floupi Website Project Guidelines

## Development
- This is a static website with no build process
- To view locally, open index.html in a browser or use a simple HTTP server
- For live server: `python -m http.server` or `npx serve`

## Code Style Guidelines
- **HTML**: 2-space indentation, semantic tags, lowercase attributes
- **CSS**: 2-space indentation, properties grouped logically
- **JavaScript**:
  - 2-space indentation
  - camelCase for variables and functions
  - Use async/await for asynchronous operations
  - Proper error handling with try/catch blocks
  - Comments for complex logic or non-obvious code
  - Use const/let, avoid var
  - Descriptive variable names

## File Organization
- JavaScript files for specific functionality (alternating_logo.js, load_images_descriptions.js)
- External resources in dedicated folders (images/, logo/)
- Maintain separation of concerns between HTML, CSS, and JavaScript