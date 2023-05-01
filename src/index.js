
import './css/styles.css';
import ImagesApiService from './JS/api-service-with-async';
import getRefs from './JS/get-refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = getRefs();

refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', searchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imagesApiService = new ImagesApiService();

async function searchImages(event) {
  event.preventDefault();
  clearGallery();
  
  const searchQuery = imagesApiService.query = event.currentTarget.elements.searchQuery.value;

  if (!imagesApiService.query || refs.searchInput.value === ' ') {
   
    Notify.warning("Plase enter a value to search for!")
    return;
}
 refs.loadMoreBtn.classList.remove('is-hidden');
  imagesApiService.resetPage();
  try {
    const response = await imagesApiService.fetchImages(searchQuery);
    const totalHits = response.totalHits;
          if (totalHits / (imagesApiService.page - 1) < imagesApiService.perPage && response.hits.length !== 0) {
              refs.loadMoreBtn.classList.add('is-hidden');
              Notify.info("We're sorry, but you've reached the end of search results.");
          };
          if (response.hits.length > 0) {
              Notify.success(`Hooray! We found ${totalHits} images.`);
          };
          if (response.hits.length === 0) {
              refs.loadMoreBtn.classList.add('is-hidden');
              Notify.warning("Sorry, there are no images matching your search query. Please try again.");
          } else {
              renderGallery(response.hits);
          };
      }catch (error){
        onFetchError}
};
  
function renderGallery(arrayForGallery) {
  const galleryMarkup = createGalleryMarkup(arrayForGallery);

  refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);

  let lightbox = new SimpleLightbox('.gallery .gallery__item', {
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
  });

  return lightbox;
};

function createGalleryMarkup(imagesArray) {
  return imagesArray
      .map(image => {
          const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

          return `
                <div class="photo-card">
                    <a class="gallery__item" href="${largeImageURL}">
              
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320px" height="210px"/>
                  
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b><br/>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b><br/>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b><br/>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b><br/>${downloads}
                        </p>
                    </div>
                </div>
            `
        })
        .join('');
};

async function onLoadMore (searchQuery) {
  try {
        const response = await imagesApiService.fetchImages(searchQuery);
          renderGallery(response.hits);
          if (response.totalHits / (imagesApiService.page - 1) < imagesApiService.perPage && response.hits.length !== 0) {
              refs.loadMoreBtn.classList.add('is-hidden');
              Notify.info("We're sorry, but you've reached the end of search results.");
          };
      } catch (error) {
        onFetchError};
};

function clearGallery() {
  refs.galleryListEl.innerHTML = '';
};

function onFetchError(error) {
  Notify.failure(error.message);
};
  
