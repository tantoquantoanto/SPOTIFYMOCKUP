const endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const contentHeader = document.querySelector(".content-header");
const headerImg = document.querySelector(".header-img");
const headerTitle = document.querySelector("#header-title");
const headerArtist = document.querySelector(".header-artist");
const headerPlayBtn = document.querySelector("#headerPlayBtn");
const trackList = document.querySelector("#trackList");
trackList.classList.add("list-unstyled", "d-flex" ,"flex-column", "gap-1", "bg-dark")


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
      console.log(data.tracks.data);

    
      populateCard(data);
    } catch (error) {
      console.error("Errore nel fetch:", error);
    }
  };

  const populateCard = (data) => {
    
    contentHeader.style.backgroundImage = `url(${data.cover_medium})`;
    contentHeader.style.backgroundSize = "cover";
    contentHeader.style.backgroundPosition = "center";

  
    headerTitle.textContent = data.title;
    headerArtist.textContent = data.artist.name;
    data.tracks.data.forEach (track => {
        const li = document.createElement("li");
        const div = document.createElement("div");
        div.classList.add("d-flex", "flex-column", "align-items-start", "justify-content-center");
        const h5 = document.createElement("h5");
        h5.textContent = track.title;
        const span = document.createElement("span");
        span.textContent = track.artist.name;
        div.append(h5, span);
        li.append(div);
        trackList.appendChild(li);
        


    })

    
    headerPlayBtn.addEventListener("click", () => {
      const audio = new Audio(data.tracks.data[0].preview); 
      audio.play();
    });
  };

  getAlbum();
}


  