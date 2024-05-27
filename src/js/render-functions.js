import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery;

export function clearGallery() {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';
}

export function displayImages(images) {
  const galleryContainer = document.querySelector('.gallery');
  const imageCards = images.map(image => createImageCard(image)).join('');
  galleryContainer.insertAdjacentHTML('beforeend', imageCards);

  if (!gallery) {
    gallery = new SimpleLightbox('.gallery a');
  } else {
    gallery.refresh();
  }
}

function createImageCard(image) {
  return `
    <div class="image-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="image-info">
        <p><strong>Likes:</strong> ${image.likes}</p>
        <p><strong>Views:</strong> ${image.views}</p>
        <p><strong>Comments:</strong> ${image.comments}</p>
        <p><strong>Downloads:</strong> ${image.downloads}</p>
      </div>
    </div>
  `;
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
}
