// src/main.js
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../src/css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, displayImages, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(searchTerm)
    .then(images => {
      hideLoader();
      displayImages(images);
    })
    .catch(error => {
      hideLoader();
      console.error('Error searching for images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again later.',
      });
    });
}
