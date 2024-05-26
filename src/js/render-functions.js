import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function displayImages(images) {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  images.forEach(image => {
    const card = document.createElement('a');
    card.href = image.largeImageURL;
    card.classList.add('card');

    card.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      <div class="card-info">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    `;
    gallery.appendChild(card);
  });

  new SimpleLightbox('.gallery a').refresh();
}

export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}
