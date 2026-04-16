const myKey = "WCsSCGCBTXQWLB8ynFlMqr2ekEQeKyERZHE3tJtGEbbv0A7kpnzASU7s";
const imagesAPIBase = "https://api.pexels.com/v1/search?query=";
const imagesAPIHamsters = "https://api.pexels.com/v1/search?query=hamsters";
const imagesAPITigers = "https://api.pexels.com/v1/search?query=tigers";

const fillCards = function (URL) {
  fetch(URL, {
    headers: {
      authorization: myKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("response non andata a buon fine");
      }
    })
    .then((data) => {
      console.log(data.photos);
      const coverImages = document.querySelectorAll(".bd-placeholder-img");
      const cardTitles = document.querySelectorAll(".card-title");
      const descriptions = document.querySelectorAll(".card-text");
      const idCards = document.querySelectorAll("small");

      data.photos.forEach((photo, index) => {
        if (coverImages[index]) {
          coverImages[index].setAttribute("src", photo.src.large);
        }
        if (cardTitles[index]) {
          cardTitles[index].innerText = photo.photographer;
        }
        if (descriptions[index]) {
          descriptions[index].innerText = photo.alt;
        }
        if (idCards[index]) {
          idCards[index].innerText = `id=${photo.id}`;
        }
      });
    })
    .catch((error) => {
      console.log("problema di connessione", error);
    });
};

document.getElementById("load-btn").addEventListener("click", () => {
  fillCards(imagesAPIHamsters);
});
document.getElementById("load-btn-2").addEventListener("click", function () {
  fillCards(imagesAPITigers);
});

const editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((btn) => {
  btn.innerText = "Hide";
  btn.addEventListener("click", function () {
    btn.closest(".card").classList.add("d-none");
  });
});

const viewBtns = document.querySelectorAll(".view-btn");
viewBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const photoId = (btn.closest(".card")).querySelector("small").innerText
      location.assign("./details.html?"+ photoId);
    })
  });

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function () {
  const query = searchBar.value.trim();
  if (!query) {
    alert("inserisci una parola chiave");
    return;
  }

  const searchURL = `${imagesAPIBase}${query}`;
  fillCards(searchURL);
  searchBar.value = "";
});
