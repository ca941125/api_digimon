const container = document.getElementById("container");
const obtenerInfoCards = () => { 
  fetch("https://www.digi-api.com/api/v1/digimon") 
    .then((res) => res.json()) 
    .then((data) => renderDigimonCards(data)); 
}
  
obtenerInfoCards(); 

const renderDigimonCards = (cardsData) => { 
  let digimonArray = cardsData.content;
  container.innerHTML = "";
  digimonArray.forEach((digimon) => {
    container.innerHTML += `
      <div class="dgmn-card">
        <img src="${digimon.image}" alt="">
        <h2>${digimon.name}</h2>
        <button onClick=viewDigimonDetail("${digimon.href}")>Ver Detalles</button>
      </div>
    `;
  });
};

const viewDigimonDetail = (digimonUrl) => {
  fetch(digimonUrl)
    .then((res) => res.json())
    .then((data) => {
      const renderDescription = () => {
        let englishDescription = "";
        data.descriptions.forEach((description) => {
          description.language === "en_us"
            ? (englishDescription = description.description)
            : "";
        });
        return englishDescription;
      };
      container.innerHTML = "";
      container.innerHTML = `
        <div class="card-detail">
          <img src=${data.images[0].href} alt="">
          <div class="card-detail__description">
            <h1>${data.name}</h1>
            <p>${renderDescription()}</p>
            <button onclick="obtenerInfoCards()">Regresar</button>
          </div>
        </div>`;
    });
};