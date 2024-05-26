import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../src/css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, displayImages, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
const endOfResults = document.querySelector('.end-of-results');
const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
let query = '';

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function handleSubmit(event) {
  event.preventDefault();
  query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  clearGallery();
  showLoader();
  page = 1;

  fetchImages(query, page)
    .then(images => {
      hideLoader();
      displayImages(images);
      checkLoadMoreVisibility(images.totalHits);
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

async function handleLoadMore() {
  page++;
  showLoader();

  try {
    const images = await fetchImages(query, page);
    hideLoader();
    displayImages(images);
    checkLoadMoreVisibility(images.totalHits);
  } catch (error) {
    hideLoader();
    console.error('Error loading more images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
    });
  }
}

function checkLoadMoreVisibility(totalHits) {
  const imagesLoaded = gallery.querySelectorAll('.image-card').length;
  if (imagesLoaded < totalHits) {
    loadMoreBtn.classList.remove('hidden');
    endOfResults.classList.add('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
    endOfResults.classList.remove('hidden');
  }
}

function smoothScroll() {
  const imageHeight = gallery.querySelector('.image-card').offsetHeight;
  window.scrollBy({
    top: imageHeight * 2,
    behavior: 'smooth'
  });
}

