// <=============================================Random Carde====================================>
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
        $("#cardM").append(select);
        })
}

// <=============================================Random modal====================================>

function voir(set){
    document.getElementById('modalCard').innerHTML="";
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
            $("#modalCard").append(cardModales);
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

// <=============================================Creat option from Api====================================>

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => {
        const categories = data.categories;

        for (let i = 0; i < categories.length; i++) {
            let options = `
            
              <option value="${categories[i].strCategory}">${categories[i].strCategory}</option>
            
            `
            $("#select").append(options);

        }


    });

fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then(response => response.json())
    .then(data => {
        const region = data.meals;
        for (let i = 0; i < region.length; i++) {
            let options = `
            
              <option value="${region[i].strArea}">${region[i].strArea}</option>
            
            `
            $("#region").append(options);

        }


    });

// <=============================================Filter by categorie====================================>


const tableau = [];
document.getElementById('select').onchange = function () {
    document.getElementById('cardM').innerHTML ="";
    document.getElementById('lien').innerHTML ="";
    let optionSelect = document.getElementById('select').value;
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${optionSelect}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filterCategorie = data.meals;
            tableau.push(filterCategorie);

                        // <=============================================pagination====================================>


            const page1 = filterCategorie.slice(0, 12); 
            const page2 = filterCategorie.slice(12, 24); 
            const page3 = filterCategorie.slice(0, 10);
            const page4 = filterCategorie.slice(24, 36);
            const page5 = filterCategorie.slice(36, 48);
            
            
                
                if(page1.length>0){
                    let btn1 =`
                      <a class="page-link" href="#cardM" id="page1">1</a>
                    `;
                    $("#lien").append(btn1);
                }
            
            
                if(page2.length>0){
                    let btn2 =`
                      <a class="page-link" href="#cardM" id="page2">2</a>
                    `;
                    $("#lien").append(btn2);
                }
            
            
                if(page4.length>0){
                    let btn3 =`
                      <a class="page-link" href="#cardM" id="page3">3</a>
                    `;
                    $("#lien").append(btn3);
                }
         
            
                if(page5.length>0){
                    let btn4 =`
                      <a class="page-link" href="#cardM" id="page4">4</a>
                    `;
                    $("#lien").append(btn4);
                }

               
           
           
            
            for (let i = 0; i < filterCategorie.length; i++) {
                for(leti=0;i<page1.length;i++){
                    let card = `
                       <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${i}">
                           <img src="${page1[i].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                           <div class="card-body">
                             <p class="card-text text-dark"><span>Name of recept :</span>${page1[i].strMeal}</p>
                           </div>
                           <div>
                              <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page1[i].idMeal})">Voir</button>
                           </div>
                       </div>
                    `;
                   $("#cardM").append(card);
                }
                
                document.getElementById('page1').onclick=function(){
                    document.getElementById('cardM').innerHTML="";
                    for(let c=0 ; c<page1.length;c++){
                        let cards10 = `
                            <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                                <img src="${page1[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                <div class="card-body">
                                    <p class="card-text text-dark"><span>Name of recept :</span>${page1[c].strMeal}</p>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page1[c].idMeal})">Voir</button>
                                </div>
                            </div>
                        `;
                        $("#cardM").append(cards10);
                    }
                }
                if(filterCategorie.length>10){
                    
 
                    document.getElementById('page2').onclick=function(){
                        page2;
                        document.getElementById('cardM').innerHTML="";
                        
                        for(let c=0 ; c<page2.length;c++){

                            if(page2.lenght!==""){
                                let cards10 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                                    <img src="${page2[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                       <p class="card-text text-dark"><span>Name of recept :</span>${page2[c].strMeal}</p>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page2[c].idMeal})">Voir</button>
                                    </div>
                                </div>
                               `;
                               $("#cardM").append(cards10);
                            }
                        }
                    }

                    document.getElementById('page3').onclick=function(){
                        page4;
                        document.getElementById('cardM').innerHTML="";
                        for(let m=0 ; m<page4.length;m++){

                            if(page2.lenght!==""){
                                let cards12 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${m}">
                                    <img src="${page4[m].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                       <p class="card-text text-dark"><span>Name of recept :</span>${page4[m].strMeal}</p>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page4[m].idMeal})">Voir</button>
                                    </div>
                                </div>
                               `;
                               $("#cardM").append(cards12);
                            }
                        }
                    }

                    document.getElementById('page4').onclick=function(){
                        page5;
                        document.getElementById('cardM').innerHTML="";
                        for(let n=0 ; n<page4.length;n++){

                            if(page5.lenght!==""){
                                let cards13 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="card2${n}">
                                    <img src="${page5[n].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                       <p class="card-text text-dark"><span>Name of recept :</span>${page5[n].strMeal}</p>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page5[n].idMeal})">Voir</button>
                                    </div>
                                </div>
                               `;
                               $("#cardM").append(cards13);
                            }
                        }
                    }


                }
                if(filterCategorie.length<10){
                    document.getElementById('cardM').innerHTML="";
                    for(let j=0 ; j<page3.length;j++){
                        let cards11 = `
                            <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${j}">
                                <img src="${page3[j].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                <div class="card-body">
                                    <p class="card-text text-dark"><span>Name of recept :</span>${page3[j].strMeal}</p>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page3[j].idMeal})">Voir</button>
                                </div>
                            </div>
                        `;
                        $("#cardM").append(cards11);
                    }
                }
            }
        });

}

function modalCategorie(setting) {
    document.getElementById('modalCard').innerHTML = "";
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
            let cardModal = `
            
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
            $("#modalCard").append(cardModal);
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

// <=============================================Filter by region====================================>

const tableauReg =[];
document.getElementById('region').onchange = function () {
    document.getElementById('cardM').innerHTML = "";
    document.getElementById('lien').innerHTML="";

    let optionSelectes = document.getElementById('region').value;
    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${optionSelectes}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const filterRegion = data.meals;
            tableauReg.push(filterRegion);

            // <=============================================pagination====================================>


            const page6 = filterRegion.slice(0, 12); 
            const page7 = filterRegion.slice(12, 24); 
            const page8 = filterRegion.slice(0, 10);
            const page9 = filterRegion.slice(24, 36);
            const page10 = filterRegion.slice(36, 48);
           
                if(page6.length>0){
                    let btn1 =`
                      <a class="page-link" href="#cardM" id="page1">1</a>
                    `;
                    $("#lien").append(btn1);
                }
          
            
                if(page7.length>0){
                    let btn2 =`
                      <a class="page-link" href="#cardM" id="page1">2</a>
                    `;
                    $("#lien").append(btn2);
                }
        
           
                if(page9.length>0){
                    let btn3 =`
                      <a class="page-link" href="#cardM" id="page1">3</a>
                    `;
                    $("#lien").append(btn3);
                }
           
           
                if(page10.length>0){
                    let btn4 =`
                      <a class="page-link" href="#cardM" id="page1">4</a>
                    `;
                    $("#lien").append(btn4);
                }
           
            for (let i = 0; i < filterRegion.length; i++) {
                for(let c=0 ; c<page6.length;c++){
                    let cards10 = `
                        <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                            <img src="${page6[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                            <div class="card-body">
                                <p class="card-text text-dark"><span>Name of recept :</span>${page6[c].strMeal}</p>
                            </div>
                            <div>
                                <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page6[c].idMeal})">Voir</button>
                            </div>
                        </div>
                    `;
                    $("#cardM").append(cards10);
                }
                document.getElementById('page1').onclick=function(){
                    document.getElementById('cardM').innerHTML="";
                    for(let c=0 ; c<page6.length;c++){
                        let cards10 = `
                            <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                                <img src="${page6[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                <div class="card-body">
                                    <p class="card-text text-dark"><span>Name of recept :</span>${page6[c].strMeal}</p>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page6[c].idMeal})">Voir</button>
                                </div>
                            </div>
                        `;
                        $("#cardM").append(cards10);
                    }
                }
                if(filterRegion.length>10){
                    let card = `
                       <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${i}">
                           <img src="${page6[i].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                           <div class="card-body">
                              <p class="card-text text-dark"><span>Name of recept :</span>${page6[i].strMeal}</p>
                            </div>
                            <div>
                               <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page6[i].idMeal})">Voir</button>
                           </div>
                       </div>
                    `;
                   $("#cardM").append(card);
 
                    document.getElementById('page2').onclick=function(){
                        page7;
                        document.getElementById('cardM').innerHTML="";
                        
                        for(let c=0 ; c<page7.length;c++){

                            if(page7.lenght!==""){
                                let cards10 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${c}">
                                    <img src="${page7[c].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                       <p class="card-text text-dark"><span>Name of recept :</span>${page7[c].strMeal}</p>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page7[c].idMeal})">Voir</button>
                                    </div>
                                </div>
                               `;
                               $("#cardM").append(cards10);
                            }
                        }
                    }

                    document.getElementById('page3').onclick=function(){
                        page9;
                        document.getElementById('cardM').innerHTML="";
                        for(let m=0 ; m<page9.length;m++){

                            if(page9.lenght!==""){
                                let cards12 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${m}">
                                    <img src="${page9[m].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                       <p class="card-text text-dark"><span>Name of recept :</span>${page9[m].strMeal}</p>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page9[m].idMeal})">Voir</button>
                                    </div>
                                </div>
                               `;
                               $("#cardM").append(cards12);
                            }
                        }
                    }

                    document.getElementById('page4').onclick=function(){
                        page10;
                        document.getElementById('cardM').innerHTML="";
                        for(let n=0 ; n<page10.length;n++){

                            if(page10.lenght!==""){
                                let cards13 = `
                                <div class="card container" style="width: 23rem;margin:2%;" id="card2${n}">
                                    <img src="${page10[n].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                    <div class="card-body">
                                       <p class="card-text text-dark"><span>Name of recept :</span>${page10[n].strMeal}</p>
                                    </div>
                                    <div>
                                       <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page10[n].idMeal})">Voir</button>
                                    </div>
                                </div>
                               `;
                               $("#cardM").append(cards13);
                            }
                        }
                    }

                }
                if(filterRegion.length<10){
                    document.getElementById('cardM').innerHTML="";
                    for(let j=0 ; j<page8.length;j++){
                        let cards11 = `
                            <div class="card container" style="width: 23rem;margin:2%;" id="cardss2${j}">
                                <img src="${page8[j].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                                <div class="card-body">
                                    <p class="card-text text-dark"><span>Name of recept :</span>${page8[j].strMeal}</p>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${page8[j].idMeal})">Voir</button>
                                </div>
                            </div>
                        `;
                        $("#cardM").append(cards11);
                    }
                }
            }
        });
}


// <=============================================Filter by Categorie && region ====================================>


function dataFilter(){
    document.getElementById('cardM').innerHTML = "";
    document.getElementById('cardData').innerHTML = "";

    tableau;
    tableauReg;
    let tableData = [];
    console.log(tableData);
    tableau.forEach(obj1 => {
        tableauReg.forEach(obj2 => {
            if (obj1.idMeal === obj2.idMeal) {
                tableData.push(obj1);
            }
            
        });
    });
    for(let g=0;g<tableData.length;g++){
        let cardFilter =`
            <div class="card container" style="width: 23rem;margin:2%;">
                <img src="${tableData[0][g].strMealThumb}" class="card-img-top" alt="Sunset Over the Sea"/>
                <div class="card-body">
                    <p class="card-text text-dark"><span>Name of recept :</span>${tableData[0][g].strMeal}</p>
                </div>
                <div>
                    <button type="button" class="btn btn-success" name="btn-Cards" onclick="modalCategorie(${tableData[0][g].idMeal})">Voir</button>
                </div>
            </div>
        `;
        $("#cardData").append(cardFilter);
    }

    
}