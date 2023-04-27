
import NewsApiService from './api-service';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import BtnLoadMore from './btn-load-more';


const refs = {
  form: document.querySelector(".search-form"),
  enterText: document.querySelector(".enter-text"),
  submit: document.querySelector(".btn-submit"), 
  body: document.querySelector("body"),
  gallery: document.querySelector(".gallery"),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
// const slider = new SimpleLightbox('.slide-wrapper', {
//   overlayOpacity: 0.9,
//   showCounter: false,
//   captionsData: 'alt',
//   captionDelay: 150,
// });

const btnLoadMore = new BtnLoadMore({
  selector: '[data-action="load-more"]',
  // hidden: true,
});

const newsApiService = new NewsApiService();
let query = '';
console.log(btnLoadMore);

// btnLoadMore.show();
// btnLoadMore.enable();

  Notify.init({ showOnlyTheLastOne: true, clickToClose: true });
  refs.form.addEventListener('submit', onSearch);
  btnLoadMore.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
e.preventDefault();
  newsApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchPhotoCard().then(hits => {
    clearGallery ();
    appendGalleryMarkup(hits);
  });
};


function onLoadMore() {
  newsApiService.fetchPhotoCard().then(appendGalleryMarkup);
};


function appendGalleryMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend' , inertContent(hits));

}

function clearGallery () {
  refs.gallery.innerHTML = '';
}

const inertContent = (array) => {
  const result = generateContent(array);
  refs.gallery.insertAdjacentHTML("beforeend", result);
};

const generateContent = (array) => array?.reduce((acc, item) => 
acc + creatGalleryItem(item), "");


const creatGalleryItem = (item) => `
  <div class="photo-card">
  <img class="gallery__image" src="${item.webformatURL }" alt="${item.tags }" loading="lazy"  width="320px" height="210px" />
    <div class="info">
      <p class="info-item">
        <b class="info-item-text">Likes</b> ${item.likes }
      </p>
      <p class="info-item">
        <b class="info-item-text">Views</b> ${item.views }
      </p>
      <p class="info-item">
        <b class="info-item-text">Comments</b> ${item.comments }
      </p>
      <p class="info-item">
        <b class="info-item-text">Downloads</b> ${item.downloads }
      </p>
    </div>
  </div>`;

  function createManyCards(srcArray) {
    const srcMarkup = srcArray.map(this.creatGalleryItem);
    return srcMarkup.join('');
  };

  async function renderPage() {
    try {
      refs.spinner.classList.remove('hidden');
      const srcData = await newsApiService.getData(query);
      const srcElements = srcData.data.hits;
  
      if (srcElements.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
  
      if (newsApiService === false) {
        Notify.info(`Hooray! We found ${srcData.data.totalHits} images.`);
      }
  
      const htmlMarkup = await markup.createManyCards(srcElements);
      refs.gallery.insertAdjacentHTML('beforeend', htmlMarkup);
      slider.refresh();
    }
    catch (error) {
      Notify.failure(error.message);
    }
    finally {
      refs.spinner.classList.add('hidden');
    }
  }
  
  function onEndOfScroll(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && query !== '' && query === newsApiService.lastSearch) {
        if (!newsApiService.isEndOfPages) renderPage();
        else Notify.warning("We're sorry, but you've reached the end of search results.");
      }
    });
  }