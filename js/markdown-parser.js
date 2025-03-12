/**
 * Simple Markdown Parser
 * This allows loading and parsing markdown files with YAML frontmatter
 */

class MarkdownParser {
  constructor() {
    this.cache = {};
  }

  /**
   * Parse frontmatter from markdown content
   * @param {string} content - The markdown content with frontmatter
   * @returns {object} - { frontmatter, markdown }
   */
  parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      return { 
        frontmatter: {}, 
        markdown: content 
      };
    }
    
    const frontmatterText = match[1];
    const markdown = match[2];
    
    // Parse YAML-like frontmatter
    const frontmatter = {};
    const lines = frontmatterText.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();
        
        // Handle arrays indicated by leading dash
        if (value.startsWith('- ')) {
          value = [value.slice(2)];
        }
        
        // Handle booleans
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        
        // Handle numbers
        if (!isNaN(value) && value !== '') {
          value = Number(value);
        }
        
        frontmatter[key] = value;
      }
    }
    
    return { frontmatter, markdown };
  }
  
  /**
   * Convert markdown to HTML
   * Very basic implementation - for production use a proper library
   * @param {string} markdown - The markdown content
   * @returns {string} - HTML content
   */
  markdownToHtml(markdown) {
    if (!markdown) return '';
    
    let html = markdown;

    // Handle headings
    html = html.replace(/### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/# (.*?)$/gm, '<h1>$1</h1>');
    
    // Handle paragraphs
    html = html.replace(/^\s*(\n)?(.+)/gm, function(m) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    });
    
    // Remove empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    
    // Handle bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle lists
    html = html.replace(/^\s*- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
    
    // Clean up
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    return html;
  }

  /**
   * Load content from a markdown file
   * @param {string} url - The URL of the markdown file
   * @returns {Promise<object>} - Parsed content with frontmatter and HTML
   */
  async loadContent(url) {
    if (this.cache[url]) {
      return this.cache[url];
    }
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
      }
      
      const content = await response.text();
      const { frontmatter, markdown } = this.parseFrontmatter(content);
      const html = this.markdownToHtml(markdown);
      
      const result = { 
        frontmatter, 
        markdown, 
        html 
      };
      
      this.cache[url] = result;
      return result;
    } catch (error) {
      console.error(`Error loading markdown from ${url}:`, error);
      return { frontmatter: {}, markdown: '', html: '' };
    }
  }

  /**
   * Load multiple markdown files and sort them by a frontmatter property
   * @param {string[]} urls - Array of markdown file URLs
   * @param {string} sortBy - Frontmatter property to sort by
   * @returns {Promise<object[]>} - Array of parsed content objects
   */
  async loadMultiple(urls, sortBy = 'order') {
    const promises = urls.map(url => this.loadContent(url));
    const results = await Promise.all(promises);
    
    if (sortBy) {
      results.sort((a, b) => {
        const aValue = a.frontmatter[sortBy] || 0;
        const bValue = b.frontmatter[sortBy] || 0;
        return aValue - bValue;
      });
    }
    
    return results;
  }
}

// Create a global instance
const markdownParser = new MarkdownParser();