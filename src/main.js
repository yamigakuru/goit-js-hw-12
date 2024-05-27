import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../src/css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, displayImages, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('input[name="query"]');
const loadMoreBtn = document.querySelector('.load-more');
const endOfResults = document.querySelector('.end-of-results');
const loader = document.querySelector('.loader');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function handleSubmit(event) {
  event.preventDefault();
  currentQuery = searchInput.value.trim();

  if (currentQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideElements();
  showLoader();

  fetchImages(currentQuery, currentPage)
    .then(images => {
      hideLoader();
      if (images.length > 0) {
        displayImages(images);
        loadMoreBtn.classList.remove('hidden');
      } else {
        iziToast.info({
          title: 'Info',
          message: 'No images found.',
        });
      }
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

function handleLoadMore() {
  currentPage += 1;
  showLoader();

  fetchImages(currentQuery, currentPage)
    .then(images => {
      hideLoader();
      if (images.length > 0) {
        displayImages(images);
      } else {
        loadMoreBtn.classList.add('hidden');
        endOfResults.classList.remove('hidden');
      }
    })
    .catch(error => {
      hideLoader();
      console.error('Error loading more images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more images. Please try again later.',
      });
    });
}

function hideElements() {
  loadMoreBtn.classList.add('hidden');
  endOfResults.classList.add('hidden');
}
