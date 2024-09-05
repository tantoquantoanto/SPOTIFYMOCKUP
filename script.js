const endpoint =
  "https://striveschool-api.herokuapp.com/api/deezer/search?q=viola";
const headerPlayBtn = document.getElementById("headerPlayBtn");
const cardsRow = document.getElementById("cardsRow");

const getImg = async () => {
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log(data);
  document.querySelector(
    ".header-img"
  ).style.backgroundImage = `url(${data.data[23].album.cover_medium})`;
  data.data.forEach(dato => createCard(dato, cardsRow)
  )

  
  headerPlayBtn.addEventListener("click", () => {
    const audio = new Audio(data.data[23].preview);
    audio.play();
  });
};

getImg();

const createCard = (cardData, divToAppend) => {
  const cardCol = document.createElement("div");
  cardCol.classList.add("col-4");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add(
    "card-div",
    "d-flex",
    "text-white",
    "mb-3",
    "px-1",
    "py-3",
    "gap-2"
  );
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("card-image")
  cardImg = document.createElement("img");
  cardImg.classList.add("object-fit-cover", "h-100");
  cardImg.src = cardData.album.cover_small;
  const cardText = document.createElement("div");
  const cardP = document.createElement("p");
  cardText.classList.add("d-flex", "align-items-center", "justify-content-center")
  cardP.textContent = cardData.title;
  cardText.appendChild(cardP);
  cardImg.appendChild(imgDiv);
  cardDiv.append(cardImg, cardText);
  cardCol.appendChild(cardDiv);
  divToAppend.appendChild(cardCol);
  

};
