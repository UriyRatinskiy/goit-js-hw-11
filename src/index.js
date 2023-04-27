
import NewsApiService from './api-service';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './api-service';
import BtnLoadMore from './btn-load-more';

const refs = {

  form: document.querySelector(".search-form"),
  enterText: document.querySelector(".enter-text"),
  submit: document.querySelector(".btn-submit"), 
  body: document.querySelector("body"),
  gallery: document.querySelector(".gallery"),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const btnLoadMore = new BtnLoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

console.log(btnLoadMore);

btnLoadMore.show();
btnLoadMore.disable();

  refs.form.addEventListener('submit' , onSearch);
  btnLoadMore.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
e.preventDefault();

clearGallery ();
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
  <img class="gallery__image" src="${item.webformatURL ?? ""}" alt="${item.tags ?? ""}" loading="lazy"  width="320px" height="210px" />
    <div class="info">
      <p class="info-item">
        <b class="info-item-text">Likes</b> ${item.likes ?? ""}
      </p>
      <p class="info-item">
        <b class="info-item-text">Views</b> ${item.views ?? ""}
      </p>
      <p class="info-item">
        <b class="info-item-text">Comments</b> ${item.comments ?? ""}
      </p>
      <p class="info-item">
        <b class="info-item-text">Downloads</b> ${item.downloads ?? ""}
      </p>
    </div>
  </div>`;