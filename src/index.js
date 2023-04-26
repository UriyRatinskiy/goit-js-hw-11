
import NewsApiService from './api-service';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './api-service';

// збераємо всі рефи у обєкт та створюємо доступ до форми, інпиту та кнопки 
const refs = {
// getButton: document.querySelector(".get"),
form: document.querySelector(".search-form"),
enterText: document.querySelector(".enter-text"),
submit: document.querySelector(".submit"), 
body: document.querySelector("body"),
gallery: document.querySelector(".gallery"),
loadMoreBtn: document.querySelector(".load-more"),
};

const newsApiService = new NewsApiService();


const generateContent = (array) => array?.reduce((acc, item) => 
acc + creatGalleryItem(item), "");

const inertContent = (array) => {
  const result = generateContent(array);
  refs.gallery.insertAdjacentHTML("beforeend", result);
};

const creatGalleryItem = (item) => `
<div class="photo-card">
<img src="${item.webformatURL}" alt="${item.tags ?? ""}" loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${item.likes ?? ""}
    </p>
    <p class="info-item">
      <b>Views</b> ${item.views ?? ""}
    </p>
    <p class="info-item">
      <b>Comments</b> ${item.comments ?? ""}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${item.downloads ?? ""}
    </p>
  </div>
</div>`;

refs.form.addEventListener('submit' , onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
e.preventDefault();

clearGallery ();
newsApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
newsApiService.resetPage();
newsApiService.fetchPhotoCard().then(appendGalleryMarkup);

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

// const KEY = "35668361-6ed5c81517d8d0bc1dc269174";
// const BASE_URL = "https://pixabay.com/api/";
// const URL = `${BASE_URL}?key=${KEY}&q=${query}&
// image_type=photo&orientation=horizontal&
// safesearch=true&per_page=40`;
// const getPosts = async() => {
//   const query = e.currentTarget.elements.searchQuery.value
//     try {
//         const response = await fetch (URL);
//         const data = await response.json();
//         inertContent(data.hits);
//         createList(data);
//         console.log(data);
//         // return data;     
//     } catch (error) {
//         console.log(error);
//     }
// };
// .