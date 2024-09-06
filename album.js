const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const headerImg = document.querySelector(".header-img");
const headerTitle = document.querySelector("#header-title");
const headerArtist = document.querySelector(".header-artist");
const headerPlayBtn = document.querySelector("#headerPlayBtn");

const url = new URLSearchParams(location.search);
const id = url.get("id");

if (!id) {
  console.error("ID dell'album non trovato");
} else {
  const getAlbum = async () => {
    try {
      const response = await fetch(`${endpoint}${id}`);
      if (!response.ok) {
        throw new Error("Errore nel recupero dell'album");
      }
      const data = await response.json();

     
      console.log("Dati ricevuti:", data);

    
      populateCard(data);
    } catch (error) {
      console.error("Errore nel fetch:", error);
    }
  };

  const populateCard = (data) => {
    
    headerImg.style.backgroundImage = `url(${data.cover_medium})`;

   
    headerTitle.textContent = data.title;
    headerArtist.textContent = data.artist.name;

  
    headerPlayBtn.addEventListener("click", () => {
      const audio = new Audio(data.tracks.data[0].preview); 
      audio.play();
    });
  };

  getAlbum();
}
