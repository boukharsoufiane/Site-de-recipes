var select;
var selectTwo;
var meals;
for (let i = 0; i < 6; i++) {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            meals = data.meals;
            const meal = meals[0];

            select = `
            <div class="card container" style="width: 23rem;margin:2%;" id="cardss${i}">
               <img src="${meals[0].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
               <div class="card-body">
                   <p class="card-text"><span>Name of recept :</span>${meals[0].strMeal}</p>
               </div>
               <button type="button" class="btn btn-success" onclick="voir(${meals[0].idMeal})">Voir</button>
            </div>
        `;
        $("#cards").append(select);
        })
}


function voir(set){
    document.getElementById('cards2').innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${set}`)
        .then((response) => response.json())
        .then((data) => {

            let arrInges = [];
            let arrMeasuress = [];
            for (let l = 1; l <= 20; l++) {
                const ingredientes = data.meals[0][`strIngredient${l}`];
                const measures = data.meals[0][`strMeasure${l}`];
                if (ingredientes) {
                    arrInges.push(ingredientes);
                }
                if (measures) {
                    arrMeasuress.push(measures);
                }

            }
            let cardModales = `
            
                <div class="modal" tabindex="-1" id="cardessRecette">
                   <div class="modal-dialog">
                       <div class="modal-content">
                          <div class="modal-header">
                               <h5 class="modal-title">${"Name: " + data.meals[0].strMeal}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" name="submit-button" aria-label="Close" class="close"></button>
                           </div>
                          <div class="modal-body">
                              <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                               <p>${"Instructions: " + "<br>" + "<br>" + data.meals[0].strInstructions}</p>
                               <p">Ingredients :</p>
                              <div class="d-flex justify-content-evenly">
                                  <div id="measures">
                                  </div>
                                  <div id="ingredientssss">
                                  </div>
                                  
                              </div>
                          </div>
                       </div>
                  </div>
              </div>
            `
            $("#cards2").append(cardModales);
            document.getElementById("cardessRecette").style.display = "block";

            for (let i = 0; i < arrInges.length; i++) {
                const p = document.createElement('p');
                p.textContent = arrInges[i];
                document.getElementById("ingredientssss").appendChild(p);
            }

            for (let i = 0; i < arrMeasuress.length; i++) {
                const p = document.createElement('p');
                p.textContent = arrMeasuress[i];
                document.getElementById("measures").appendChild(p);
            }
            document.querySelector('button[name="submit-button"]').onclick = function () {
                document.getElementById('cardessRecette').style.display = "none";
            }
        });
}





var i = 0;
function recherche() {
    i++;
    document.getElementById("cards2").innerHTML = '';
    let searchValue = document.getElementById('search').value;
    document.getElementById('cards').innerHTML = "";
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var meals = data.meals;

            const page11 = meals.slice(0, 12); 
            const page12 = meals.slice(12, 24); 
            const page13 = meals.slice(0, 10);
            const page14 = meals.slice(24, 36);
            const page15 = meals.slice(36, 48);

            if (searchValue !== "") {
                for (let b = 0; b < meals.length; b++) {
                    document.getElementById('page1').onclick=function(){
                        document.getElementById('cards').innerHTML="";
                        for(let c=0 ; c<page11.length;c++){
                            let cards10 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                                    <img src="${page11[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                        <p class="card-text text-dark"><span>Name of recept :</span>${page11[c].strMeal}</p>
                                    </div>
                                    <div>
                                        <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page11[c].idMeal})">Voir</button>
                                    </div>
                                </div>
                            `;
                            $("#cards").append(cards10);
                        }
                    }
                    if(meals.length>10){
                        let card = `
                           <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${b}">
                               <img src="${page11[b].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                               <div class="card-body">
                                  <p class="card-text text-dark"><span>Name of recept :</span>${page11[b].strMeal}</p>
                                </div>
                                <div>
                                   <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page11[b].idMeal})">Voir</button>
                               </div>
                           </div>
                        `;
                       $("#cards").append(card);
     
                        document.getElementById('page2').onclick=function(){
                            page12;
                            document.getElementById('cards').innerHTML="";
                            
                            for(let c=0 ; c<page12.length;c++){
    
                                if(page2.lenght!==""){
                                    let cards10 = `
                                    <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                                        <img src="${page12[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                        <div class="card-body">
                                           <p class="card-text text-dark"><span>Name of recept :</span>${page12[c].strMeal}</p>
                                        </div>
                                        <div>
                                           <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page12[c].idMeal})">Voir</button>
                                        </div>
                                    </div>
                                   `;
                                   $("#cards").append(cards10);
                                }
                            }
                        }
    
                        document.getElementById('page3').onclick=function(){
                            page14;
                            document.getElementById('cards').innerHTML="";
                            for(let m=0 ; m<page14.length;m++){
    
                                if(page14.lenght!==""){
                                    let cards12 = `
                                    <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${m}">
                                        <img src="${page14[m].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                        <div class="card-body">
                                           <p class="card-text text-dark"><span>Name of recept :</span>${page14[m].strMeal}</p>
                                        </div>
                                        <div>
                                           <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page14[m].idMeal})">Voir</button>
                                        </div>
                                    </div>
                                   `;
                                   $("#cards").append(cards12);
                                }
                            }
                        }
    
                        document.getElementById('page4').onclick=function(){
                            page15;
                            document.getElementById('cards').innerHTML="";
                            for(let n=0 ; n<page15.length;n++){
    
                                if(page15.lenght!==""){
                                    let cards13 = `
                                    <div class="card container" style="width: 23rem;margin:2%;" id="card2${n}">
                                        <img src="${page15[n].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                        <div class="card-body">
                                           <p class="card-text text-dark"><span>Name of recept :</span>${page15[n].strMeal}</p>
                                        </div>
                                        <div>
                                           <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page15[n].idMeal})">Voir</button>
                                        </div>
                                    </div>
                                   `;
                                   $("#cards").append(cards13);
                                }
                            }
                        }

                        if(meals.length<10){
                            document.getElementById('cards').innerHTML="";
                            for(let j=0 ; j<page13.length;j++){
                                let cards11 = `
                                    <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${j}">
                                        <img src="${page13[j].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                        <div class="card-body">
                                            <p class="card-text text-dark"><span>Name of recept :</span>${page13[j].strMeal}</p>
                                        </div>
                                        <div>
                                            <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page13[j].idMeal})">Voir</button>
                                        </div>
                                    </div>
                                `;
                                $("#cards").append(cards11);
                            }
                        }
                    }
                }
                
            
            }
            else {
                location.reload();
            }
        });
}


function modalCategorie(setting) {
    document.getElementById("cards2").innerHTML ="";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${setting}`)
        .then((response) => response.json())
        .then((data) => {

            let arrIng = [];
            let arrMeasures = [];
            for (let l = 1; l <= 20; l++) {
                const ingredientes = data.meals[0][`strIngredient${l}`];
                const measures = data.meals[0][`strMeasure${l}`];
                if (ingredientes) {
                    arrIng.push(ingredientes);
                }
                if (measures) {
                    arrMeasures.push(measures);
                }

            }
            let selectTwo = `
            
                <div class="modal" tabindex="-1" id="cardessRecette">
                   <div class="modal-dialog">
                       <div class="modal-content">
                          <div class="modal-header">
                               <h5 class="modal-title">${"Name: " + data.meals[0].strMeal}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" name="submit-button" aria-label="Close" class="close"></button>
                           </div>
                          <div class="modal-body">
                              <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                               <p>${"Instructions: " + "<br>" + "<br>" + data.meals[0].strInstructions}</p>
                               <p">Ingredients :</p>
                              <div class="d-flex justify-content-evenly">
                                  <div id="measures">
                                  </div>
                                  <div id="ingredientssss">
                                  </div>
                                  
                              </div>
                          </div>
                       </div>
                  </div>
              </div>
            `
            $("#cards2").append(selectTwo);
            document.getElementById("cardessRecette").style.display = "block";

            for (let i = 0; i < arrIng.length; i++) {
                const p = document.createElement('p');
                p.textContent = arrIng[i];
                document.getElementById("ingredientssss").appendChild(p);
            }

            for (let i = 0; i < arrMeasures.length; i++) {
                const p = document.createElement('p');
                p.textContent = arrMeasures[i];
                document.getElementById("measures").appendChild(p);
            }
            document.querySelector('button[name="submit-button"]').onclick = function () {
                document.getElementById('cardessRecette').style.display = "none";
            }
        });
}

















































