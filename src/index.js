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
const createList = (data) => {
const result = data.reduce((acc, item) => (acc += `<li class="list-group-item">${item.id}</li>`), "");
 
refs.body.insertAdjacentHTML("afterbegin", result);

};





const getPosts = async() => {
    try {
        const response = await fetch ('https://pixabay.com/api/?key=35668361-6ed5c81517d8d0bc1dc269174');
        const data = await response.json();
        createList(data);
        // console.log(data);
        // return data;     
    } catch (error) {
        console.log(error);
    }
};
const posts = getPosts();

// const creatPost = (e) => {
//     // відминемо перезавантаження сторінки
//     e.preventDefault();
//     // відправемо данні на бекенд
// const text = refs.text.volue;
// //   робимо запит
// fetch ('https://pixabay.com/api/?key=35668361-6ed5c81517d8d0bc1dc269174&q=yellow+flowers&image_type=photo')
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error)); 
// };
// refs.submit.addEventListener("click", creatPost);

