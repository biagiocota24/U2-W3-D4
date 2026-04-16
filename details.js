const myKey = "WCsSCGCBTXQWLB8ynFlMqr2ekEQeKyERZHE3tJtGEbbv0A7kpnzASU7s";
const allTheParams = new URLSearchParams(location.search);
const photoId = allTheParams.get("id");

fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
  headers: {
    authorization: myKey
  }
})
  .then((response) => {
    if (response.ok) return response.json();
    else throw new Error("foto non trovata");
  })
  .then((photo) => {
    console.log(photo);

    const container = document.getElementById("details-row");
    container.innerHTML = `
      <div class="card">
        <img src="${photo.src.large}" class="card-img-top" alt="${photo.alt}">
        <div class="card-body">
          <h5 class="card-title">${photo.photographer}</h5>
          <p class="card-text">${photo.alt}</p>
          <small>ID: ${photo.id}</small>
        </div>
      </div>
    `;
  })
  .catch((error) => {
    console.log("errore", error);
  });