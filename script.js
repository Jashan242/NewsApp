import { subtleColors } from './constants.js';

const container=document.getElementById("news-container");
let form=document.getElementById("search");

let filter=document.getElementById("filter");

filter.addEventListener("change", sortHandler);

let language=document.getElementById("language-filter");
let lang="en";
language.addEventListener("change", languageHandler);

let searchInput="technology";
let sortValue="publishedAt";

function searchHandler(event){
    event.preventDefault();
    searchInput=document.getElementById("search-input").value;
    console.log("searchInput");
    fetchNews();
}
form.addEventListener("submit", searchHandler);

function languageHandler(event){
    lang=event.target.value;
    console.log(lang);
    fetchNews();
}

function sortHandler(event){
    sortValue=event.target.value;
    fetchNews();
}

function showNews(data){

    const filteredData = data.filter((item) => !item.title.includes("[Removed]"));
    container.innerHTML = "";

    filteredData.forEach((news) => {
        const newCard=document.createElement("div");
        newCard.classList.add("card");
        const source=document.createElement("span");
        const image=document.createElement("img");
        const title=document.createElement("h2");
        const author=document.createElement("span");
        const published=document.createElement("p");

        source.classList.add("source");
        source.innerText=news.source.name;

        image.classList.add("image");
        image.src=news.image;
        image.alt=news.title;

        title.classList.add("title");
        title.innerText=news.title;

        let date=new Date(news.publishedAt);
        author.classList.add("author");
        author.innerText=`${news.source.url} | ${date.toLocaleDateString()}`;

        published.classList.add("desc");
        published.innerText=news.description;

        newCard.append(source, image, title, author, published);

        container.append(newCard);
        // console.log(news);
    });
}

function randomColor(){
    return subtleColors[Math.floor(Math.random()*subtleColors.length)].color;
};

let background=randomColor();
document.body.style.backgroundColor=background;

function fetchNews(){
    fetch(` https://gnews.io/api/v4/search?q=${searchInput}&lang=${lang}&sortby=${sortValue}&apikey=837058bf83caae530e3a822c2a5a55d1`)
    .then((res)=>res.json())
    .then(loadNews);
}

function loadNews(data){
    console.log(data)
    showNews(data.articles);
}

fetchNews();
