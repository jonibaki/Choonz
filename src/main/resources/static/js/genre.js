fetch('http://localhost:8082/genres/read')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function(dataData) {
        console.log(dataData);

        let data = Object.keys(dataData[0]);
        let table = document.querySelector("table");
        let card = document.querySelector("div.card");

        createTableHead(table,data);
        createTableBody(table,dataData);

        // createBlankCard();
        cardData(dataData);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);

  });

//   function createBlankCard(){
//     //populates blank, hidden card to be cloned
//     let card = document.querySelector("div.card");
//     card.querySelector("img").src = ("")
//     let cardTitle = card.querySelector("h5").innerHTML = ("");
//     let cardText = card.querySelector("p").innerHTML = ("");
//     let cardButton = card.querySelector("a").innerHTML = ("");
//     console.log("blank card created");
//   }

  function createCard(id, image, title, description, buttonText, buttonLink){
    //updates cloneCard with new information
    let cards = document.querySelector("div.showcards");
    let cloneCard = document.querySelector("div.card").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src=(image);
    cloneCard.querySelector("h5").innerHTML = (title);
    cloneCard.querySelector("p").innerHTML = (description);
    cloneCard.querySelector("a").innerHTML = (buttonText);
    cloneCard.querySelector("a").href = (buttonLink)

    console.log(cloneCard);
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

    for (let dataRecord of dataData){

        for (value in dataRecord){

            if (typeof dataRecord[value] === 'object'){
                console.log("4");
                console.log(dataRecord);
                let id = dataRecord.id;
                let image = "http://i.imgur.com/czM0qWd.png";
                let title = dataRecord.name;
                let description = dataRecord.description;
                let buttonText = dataRecord.name;
                let buttonLink = "http://i.imgur.com/czM0qWd.png";
                createCard(id, image, title, description, buttonText, buttonLink);

            }

        }
    }
  }


  function createTableHead(table,data){
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let keys of data){

        if (keys == 'id'){
            
        } else if (keys == 'albums') {

        } else {
            let th = document.createElement("th");
            let text = document.createTextNode(keys);
            th.appendChild(text);
            row.appendChild(th);
        }


    }
    let editHead = document.createElement("th");
    let editButtonTitle = document.createTextNode("Edit");
    editHead.appendChild(editButtonTitle);
    row.appendChild(editHead);

}

function createTableBody(table,dataData){
    for (let dataRecord of dataData){

        let row = table.insertRow();
        for (value in dataRecord){
            if (value == 'id'){

            } else if (value == 'albums'){

            } else {
          let cell = row.insertCell();
          let text = document.createTextNode(dataRecord[value]);
          if (typeof dataRecord[value] === 'object'){
            for (object in dataRecord[value]){
                if (object == 'name'){
                    let albumText = document.createTextNode(dataRecord.genre.name);
                  cell.appendChild(albumText);
                }
            }
          } else{
            cell.appendChild(text);
          }
        }
        }
        let editCell = row.insertCell();
        let editButton = document.createElement("a");
        editButton.className="btn btn-primary";
        // editButton.href="userRecord.html?id="+dataRecord.id;
        editButton.innerHTML="Edit";
        editCell.appendChild(editButton);

              }
}



