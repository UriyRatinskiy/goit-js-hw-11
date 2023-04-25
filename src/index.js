import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// збераємо всі рефи у обєкт та створюємо доступ до форми, інпиту та кнопки 
const refs = {
// getButton: document.querySelector(".get"),
form: document.querySelector(".search-form"),
text: document.querySelector(".text"),
submit: document.querySelector(".submit"), 
body: document.querySelector("body"),
gallery: document.querySelector(".gallery"),
};

// const getPosts = () => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error)); 
// };
// refs.getButton.addEventListener("click", getPosts); 

const KEY = "35668361-6ed5c81517d8d0bc1dc269174";
const BASE_URL = "https://pixabay.com/api/";
const URL = `${BASE_URL}?key=${KEY}&q=yellow+flowers&
image_type=photo&
orientation=horizontal&
safesearch=true&

`;

const getPosts = async() => {
    try {
        const response = await fetch (URL);
        const data = await response.json();
        inertContent(data.hits);
        // createList(data);
        console.log(data);
        // return data;     
    } catch (error) {
        console.log(error);
    }
};

// refs.text.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
//  getPosts();
// refs.getButton.addEventListener("click", getPosts); 

const creatGalleryItem = (item) => `
<div class="photo-card">
  <img src="${item.userImageURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${item.downloads}
    </p>
  </div>
</div>`;

const generateContent = (array) => array.reduce((acc, item) => 
acc + creatGalleryItem(item), "");


const inertContent = (array) => {
    const result = generateContent(array);
    refs.gallery.insertAdjacentHTML("beforeend", result);
};

refs.form.addEventListener("submit", (event) => {
 event.preventDefault(getPosts());
//  console.log(event);
 const {
  element: {}
 } = event.currentTarget;
 
});


// const createList = (data) => {
// const result = data.reduce((acc, item) => (acc += `<li class="list-group-item">${item.i}</li>`), "");
 
// refs.body.insertAdjacentHTML("afterbegin", result);
// };




// const creatPost = (e) => {
//     // відминемо перезавантаження сторінки
//     e.preventDefault();
//     // відправемо данні на бекенд
// const text = refs.text.volue;
// //   робимо запит
// fetch (URL)
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error)); 
// };
// refs.submit.addEventListener("click", creatPost);

