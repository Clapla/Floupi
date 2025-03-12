async function loadImagesAndDescriptions() {
  const gallery = document.getElementById('gallery');
  
  try {
    const descriptionsResponse = await fetch('/assets/image_description.json');
    const descriptions = await descriptionsResponse.json();
    
    // Define image files directly instead of parsing directory
    const imageFiles = ['test1.jpg', 'test2.jpg', 'test3.jpg', 'test4.jpg', 'test5.jpg'];
    
    for (const filename of imageFiles) {
      const imageUrl = `/assets/images/${filename}`;
      
      const imageElement = document.createElement('div');
      imageElement.classList.add('gallery-item');
      
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = descriptions[filename]?.title || filename;
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