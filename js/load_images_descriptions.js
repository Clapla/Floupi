async function loadGalleryContent() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  
  try {
    // Get a list of all markdown files in the gallery folder
    const galleryContentResponse = await fetch('/content/gallery/');
    if (!galleryContentResponse.ok) {
      throw new Error('Failed to fetch gallery content directory');
    }
    
    // For simplicity in this example, we'll use hardcoded file list
    // In production, we would need a server-side component to list directory contents
    const markdownFiles = [
      '/content/gallery/trimming-the-base.md',
      '/content/gallery/initial-centering.md',
      '/content/gallery/opening-the-form.md',
      '/content/gallery/pulling-the-walls.md',
      '/content/gallery/shaping-the-rim.md'
    ];
    
    // Create filter UI at the top of the gallery
    const filterContainer = document.createElement('div');
    filterContainer.className = 'gallery-filter';
    filterContainer.innerHTML = `
      <div class="filter-controls">
        <button class="filter-button active" data-category="all">All</button>
        <button class="filter-button" data-category="process">Process</button>
        <button class="filter-button" data-category="vessels">Vessels</button>
        <button class="filter-button" data-category="sculptures">Sculptures</button>
      </div>
    `;
    gallery.appendChild(filterContainer);
    
    // Load all markdown files
    const markdownContents = await markdownParser.loadMultiple(markdownFiles, 'order');
    
    // Add each gallery item
    markdownContents.forEach(content => {
      const { frontmatter, html } = content;
      const { title, medium, year, image, category, featured } = frontmatter;
      
      const galleryItem = document.createElement('div');
      galleryItem.className = `gallery-item ${featured ? 'featured' : ''}`;
      galleryItem.dataset.category = category || 'other';
      
      // Add the image
      const imgElement = document.createElement('img');
      imgElement.src = `/assets/images/${image}`;
      imgElement.alt = title || '';
      imgElement.loading = 'lazy';  // Lazy load images for better performance
      
      galleryItem.appendChild(imgElement);
      
      // Add the caption
      const caption = document.createElement('div');
      caption.className = 'gallery-caption';
      caption.innerHTML = `
        <h3>${title || ''}</h3>
        <p>${medium || ''}, ${year || ''}</p>
      `;
      galleryItem.appendChild(caption);
      
      // Add the description directly on the page
      if (html) {
        const description = document.createElement('div');
        description.className = 'gallery-description';
        description.innerHTML = html;
        galleryItem.appendChild(description);
      }
      
      gallery.appendChild(galleryItem);
    });
    
    // Add filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter gallery items
        const category = button.dataset.category;
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
  } catch (error) {
    console.error('Error loading gallery:', error);
    gallery.innerHTML = '<p>Error loading gallery content. Please try again later.</p>';
  }
}

// Load about section content
async function loadAboutContent() {
  const aboutContent = document.getElementById('about-content');
  if (!aboutContent) return;
  
  try {
    // For simplicity, hardcoded file list
    const markdownFiles = [
      '/content/about/statement.md',
      '/content/about/bio.md',
      '/content/about/cv.md',
      '/content/about/contact.md'
    ];
    
    // Load all markdown files
    const markdownContents = await markdownParser.loadMultiple(markdownFiles, 'order');
    
    // Create tabs container
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';
    
    // Create tabs navigation
    const tabsNav = document.createElement('div');
    tabsNav.className = 'tabs-nav';
    
    // Create tabs content
    const tabsContent = document.createElement('div');
    tabsContent.className = 'tabs-content';
    
    // Add each tab
    markdownContents.forEach((content, index) => {
      const { frontmatter, html } = content;
      const { title } = frontmatter;
      const id = title.toLowerCase().replace(/\s+/g, '-');
      
      // Create tab button
      const tabButton = document.createElement('button');
      tabButton.className = `tab-button ${index === 0 ? 'active' : ''}`;
      tabButton.textContent = title;
      tabButton.dataset.tab = id;
      tabsNav.appendChild(tabButton);
      
      // Create tab content
      const tabContent = document.createElement('div');
      tabContent.className = `tab-content ${index === 0 ? 'active' : ''}`;
      tabContent.id = id;
      tabContent.innerHTML = html;
      tabsContent.appendChild(tabContent);
    });
    
    // Add tabs to the container
    tabsContainer.appendChild(tabsNav);
    tabsContainer.appendChild(tabsContent);
    aboutContent.appendChild(tabsContainer);
    
    // Add tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active content
        const tabId = button.dataset.tab;
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
          if (content.id === tabId) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
    
  } catch (error) {
    console.error('Error loading about content:', error);
    aboutContent.innerHTML = '<p>Error loading content. Please try again later.</p>';
  }
}

// Initialize everything when the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  loadGalleryContent();
  loadAboutContent();
});