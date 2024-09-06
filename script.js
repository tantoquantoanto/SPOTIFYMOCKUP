const endpoint =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=viola";
const headerPlayBtn = document.getElementById("headerPlayBtn");
const cardsRow = document.getElementById("cardsRow");
const secondRow = document.getElementById("secondRow");

const getImg = async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
  const sixData = data.data.slice(0, 6);
  const fiveData = data.data.slice(0, 5);
  document.querySelector(
    ".header-img"
  ).style.backgroundImage = `url(${data.data[23].album.cover_medium})`;
  sixData.forEach(dato => createCard(dato, cardsRow)
  )
  fiveData.forEach(dato => createCard(dato, secondRow))
  
  headerPlayBtn.addEventListener("click", () => {
    const audio = new Audio(data.data[23].preview);
    audio.play();
  });
};

getImg();

const createCard = (cardData, divToAppend) => {
  if (divToAppend === secondRow) {
    // Creazione della card
    const wrapCard = document.createElement("a");
    wrapCard.classList.add("card");
    wrapCard.href = `album.html?id=${cardData.id}`

    // Immagine della card
    const wrapImg = document.createElement("img");
    wrapImg.classList.add("card-img-top");
    wrapImg.src = cardData.album.cover_medium; // Usa una dimensione più grande per le immagini

    // Corpo della card
    const wrapBody = document.createElement("div");
    wrapBody.classList.add("card-body");

    // Titolo della card
    const wrapTitle = document.createElement("h5");
    wrapTitle.classList.add("card-title");
    wrapTitle.textContent = cardData.title;

    // Descrizione della card
    const wrapDescription = document.createElement("p");
    wrapDescription.classList.add("card-text");
    wrapDescription.textContent = cardData.title_short;

    // Assembla la card
    wrapBody.append(wrapTitle, wrapDescription);
    wrapCard.append(wrapImg, wrapBody);

    // Aggiungi la card alla riga
    divToAppend.appendChild(wrapCard);
  }
  else {
  
  const cardCol = document.createElement("a");
  cardCol.href = `album.html?id=${cardData.id}`
  cardCol.classList.add("col-6",  "col-md-4",);
  const cardDiv = document.createElement("div");
  cardDiv.classList.add(
    "card-div",
    "d-flex",
    "text-white",
    "mb-3",
    
    "gap-2"
  );
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("card-image")
  cardImg = document.createElement("img");
  cardImg.classList.add("object-fit-cover", "h-100");
  cardImg.src = cardData.album.cover_small;
  const cardText = document.createElement("div");
  const cardP = document.createElement("p");
  cardText.classList.add("d-flex", "align-items-center", "card-text", "justify-content-center")
  cardP.textContent = cardData.title;
  cardText.appendChild(cardP);
  cardImg.appendChild(imgDiv);
  cardDiv.append(cardImg, cardText);
  cardCol.appendChild(cardDiv);

  divToAppend.appendChild(cardCol);
  
}
};
