async function loadImagesAndDescriptions() {
  const gallery = document.getElementById('gallery');
  
  try {
    const descriptionsResponse = await fetch('image_description.json');
    const descriptions = await descriptionsResponse.json();
    
    const imagesResponse = await fetch('/images/');
    const data = await imagesResponse.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    // Only get links that point to actual image files
    const images = Array.from(doc.getElementsByTagName('a')).filter(link => 
      link.getAttribute('href').match(/\.(jpg|jpeg|png|gif)$/i)
    );
    
    for (const image of images) {
      const imageUrl = image.getAttribute('href');
      const filename = imageUrl.split('/').pop();
      
      const imageElement = document.createElement('div');
      imageElement.classList.add('gallery-item');
      
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = imageUrl;
      imageElement.appendChild(img);
      
      const description = descriptions[filename];
      if (description) {
        const caption = document.createElement('p');
        caption.textContent = `${description.title}, ${description.medium}, ${description.year}.`;
        imageElement.appendChild(caption);
      }
      
      gallery.appendChild(imageElement);
    }
  } catch (error) {
    console.error('Error loading images or descriptions:', error);
  }
}

window.addEventListener('load', loadImagesAndDescriptions);