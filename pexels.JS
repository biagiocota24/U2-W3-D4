const myKey = "WCsSCGCBTXQWLB8ynFlMqr2ekEQeKyERZHE3tJtGEbbv0A7kpnzASU7s";
const imagesAPIHamsters = "https://api.pexels.com/v1/search?query=hamsters";
const imagesAPITigers = "https://api.pexels.com/v1/search?query=tigers";


const fillCards = function(URL){

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
        
        data.photos.forEach((photo, index) => {
            if (coverImages[index]) {
                coverImages[index].setAttribute("src", photo.src.original);
            }
            if (cardTitles[index]) {
                cardTitles[index].innerText = photo.photographer;
            }
            if (descriptions[index]) {
                descriptions[index].innerText = photo.alt;
            }
        });
    })
    .catch((error) => {
        console.log("problema di connessione", error);
    });

}

document.getElementById("load-btn").addEventListener("click" , ()=> {
    fillCards(imagesAPIHamsters)
})
document.getElementById("load-btn-2").addEventListener("click" , function(){
    fillCards(imagesAPITigers)
})