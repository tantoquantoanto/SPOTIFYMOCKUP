window.addEventListener('scroll', function() {
    const myDiv = document.getElementById('immagineAlbum');
    const maxHeight = 200;  
    const minHeight = 50;   
    const scrollPosition = window.scrollY;

  
    const newHeight = Math.max(minHeight, maxHeight - scrollPosition);
    
    
    myDiv.style.height = newHeight + 'px';
});

const albumImg = document.getElementById("immagineAlbum");


const endpoint = `https://striveschool-api.herokuapp.com/api/deezer/search?q=queen`
const fetchData = async() =>{
    
    
const response = await fetch(endpoint)
const result = await response.json()
console.log(result)
card(result, albumImg);
}

fetchData()

const card = (cardData, append) => {
    const divImg = document.createElement("img")
    divImg.src = cardData.cover_medium
    append.appendchild(divImg)
}