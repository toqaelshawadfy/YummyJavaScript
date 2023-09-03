/////loading screen/////////////
let sidebarWidth = $(".sidebar-inner").innerWidth();
$(document).ready(function(){
        $("#loading").fadeOut(2000,function(){
            $("body").css('overflow','auto');
            $("#loading").remove();
        });
        ////////////sideNavBar////////////////
        let sidebarWidth = $(".sidebar-inner").innerWidth();
        $("#sidebar").css('left',-sidebarWidth)
        $("#sidebar .sidewhite i").click(function(){
            if( $("#sidebar").css('left')=="0px"){
                $("#sidebar").animate({left:- sidebarWidth},600)
                $("#myopen").removeClass("fa-x").css('cursor','pointer');
                $("#myopen").addClass("fa-align-justify");

                $(".links li").animate({
                    top: 300
                }, 500)
            }
            else{
                $("#sidebar").animate({left:0 },600)
                $("#myopen").removeClass("fa-align-justify");
                $("#myopen").addClass("fa-x");
                
                for (let i = 0; i < 5; i++) {
                    $(".links li").eq(i).animate({
                        top: 0
                    }, (i + 5) * 100)
                }
                
            }
        })

    ////////displayhome/////////////////
    let datahome=[]
    async function getApiHome(){
        document.getElementById("searchContainer").innerHTML="";
        var https = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        var response = await https.json();
        datahome = response.meals;
        console.log( datahome);
        displayHome()
    }
    function displayHome(){
        cartoona="";
        for(var i =0; i< datahome.length ;i++){
            cartoona += `
            <div class="col-md-3">
                    <div class="mymeal position-relative" id="myMeal" onclick="displayEachOneName(${datahome[i].idMeal})">
                        <img src="${ datahome[i].strMealThumb}" class="w-100">
                        <div class="meal-layer position-absolute p-2 d-flex align-items-center">
                            <h3 class ="myId">${ datahome[i].strMeal}<h3>
                        </div>
                    </div>
                </div>
            
            `
        }
        document.getElementById('myrow').innerHTML =  cartoona;

    }
    getApiHome()
    ///////////////display My Meals Images////////////////////
    // api
var categories =document.getElementById("Categories")
var area =document.getElementById("AREA")
categories.addEventListener('click',function(){
    // console.log("hellooo")
    getApicategory();
    // document.getElementById("inner-loading-screen").classList.replace("d-none","d-block")
    // $("#inner-loading-screen").fadeOut(1000,function(){
    //     document.getElementById("inner-loading-screen").classList.replace("d-block","d-none")
    // })
    $("#sidebar").animate({left:- sidebarWidth},1000)
    $("#myopen").removeClass("fa-x").css('cursor','pointer');
    $("#myopen").addClass("fa-align-justify");
})
let data =[];

async function getApicategory(){
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    var https = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    var response = await https.json();
    data = response.categories;
    console.log(data);
    displaycategory()
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
}


function displaycategory(){
    var cartona =``;

    for(var i =0; i<  data.length ;i++){
        cartona += `
        <div class="col-md-3">
                <div class="mymeal position-relative" id="myMeal" >
                    <img src="${ data[i].strCategoryThumb}">
                    <div class="meal-layer position-absolute text-center p-2">
                        <h3 class ="myId">${ data[i].strCategory}<h3>
                        <p>${ data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}<p>
                    </div>
                </div>
            </div>
        
        `
    }
    document.getElementById('myrow').innerHTML = cartona;

    document.getElementById('myrow').addEventListener("click",function(event){
           const target= event.target;
           if(target.classList.contains("meal-layer")){
            const categoryElement = target.querySelector(".myId");
            if(categoryElement){
                const category = categoryElement.innerHTML;
                getmydata(category)
            }
           }
    })
}
 
let mycat=[]
async function getmydata(category){
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    var https = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    var response = await https.json();
    mycat = response.meals.slice(0,20);
    console.log( mycat )
    displayMyMeals()
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
}

function displayMyMeals(){
    var cartona =``;

    for(var i =0; i< mycat.length ;i++){

        cartona += `
        <div class="col-md-3">
                <div class="mymeal position-relative"  onclick="displayEachOneName(${mycat[i].idMeal})">
                    <img src="${mycat[i].strMealThumb}"class="w-100">
                    <div class="meal-layer position-absolute text-center p-2 d-flex align-items-center">
                        <h3>${mycat[i].strMeal}<h3>
                    </div>
                </div>
            </div>
        
        `

        document.getElementById('myrow').innerHTML = cartona;

    }
}
/////////////////////////////display Area Meals///////////////////////////////////
area.addEventListener('click',function(){
    getAreaApi();
    $("#sidebar").animate({left:- sidebarWidth},1000)
    $("#myopen").removeClass("fa-x").css('cursor','pointer');
    $("#myopen").addClass("fa-align-justify");
})
async function getAreaApi(){
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    var https = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    var response = await https.json();
    dataArea = response.meals;
    displayAreaData();
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
}

var dataArea =[];
function displayAreaData(){
    var cartona =``;

    for(var i =0; i<dataArea.length ;i++){

        cartona += `
        <div class="col-md-3">
                <div class="mymeal position-relative sp pt-2 text-center">
                    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                    <h3  class="text-white myId">${dataArea[i].strArea}</h3>
                    </div>
                </div>
            </div>
        
        `
    }
    document.getElementById('myrow').innerHTML = cartona;
    document.getElementById('myrow').addEventListener("click",function(event){
        const target= event.target;
        if(target.classList.contains("myId")){
         const categoryElement = target.innerHTML;
         getMealsArea(categoryElement)
        }
 })
}

let areameals=[]
async function getMealsArea(categoryElement){
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    var https = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${categoryElement}`);
    var response = await https.json();
    areameals = response.meals.slice(0,20);
    console.log( areameals )
    displayAreaMeals()
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
}
function displayAreaMeals(){
    var cartona =``;

    for(var i =0; i<areameals.length ;i++){

        cartona += `
        <div class="col-md-3">
                <div class="mymeal position-relative" onclick="displayEachOneName(${areameals[i].idMeal})">
                    <img src="${ areameals[i].strMealThumb}"class="w-100">
                    <div class="meal-layer position-absolute text-center p-2 d-flex align-items-center">
                        <h3>${ areameals[i].strMeal}<h3>
                    </div>
                </div>
            </div>
        
        `

        document.getElementById('myrow').innerHTML = cartona;

    }
}


////////////////////display meals ingredients///////////////////////////////
var dataIng =[];

var ing =document.getElementById('ing');
ing.addEventListener('click',function(){
    getIngApi(); 
    $("#sidebar").animate({left:- sidebarWidth},1000)
    $("#myopen").removeClass("fa-x").css('cursor','pointer');
    $("#myopen").addClass("fa-align-justify");
})


async function getIngApi(){
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    var https = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    var response = await https.json();
    dataIng = response.meals.slice(0,20);
    displayIngData();
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
}

function displayIngData(){
    var cartona =``;

    for(var i =0; i<dataIng.length ;i++){

        cartona += `
        <div class="col-md-3">
                <div class="mymeal position-relative sp pt-2 text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                    <h3 class="text-white myId">${dataIng[i].strIngredient}</h3>
                    <p class="text-white">${dataIng[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
            </div>
        
        `

    }
    document.getElementById('myrow').innerHTML = cartona;
    document.getElementById('myrow').addEventListener("click",function(event){
        const target= event.target;
        if(target.classList.contains("myId")){
         const categoryElement = target.innerHTML;
         console.log(categoryElement)
         getIngMeals(categoryElement)
        }
    })
    
}
let ingMeals=[]
async function getIngMeals(categoryElement){
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    var https = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${categoryElement}`);
    var response = await https.json();
    ingMeals = response.meals.slice(0,20);
    displayIngMeals();
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
}

function displayIngMeals(){
    var cartona =``;

    for(var i =0; i<ingMeals.length ;i++){

        cartona += `
        <div class="col-md-3">
                <div class="mymeal position-relative" onclick="displayEachOneName(${ingMeals[i].idMeal})">
                    <img src="${ ingMeals[i].strMealThumb}"class="w-100">
                    <div class="meal-layer position-absolute text-center p-2 d-flex align-items-center">
                        <h3>${ ingMeals[i].strMeal}<h3>
                    </div>
                </div>
            </div>
        
        `
        document.getElementById('myrow').innerHTML = cartona;
    }
}

 
})
// start making the search inputtttt///////////////////////

function showSearchInputs() {
    document.getElementById("searchContainer").innerHTML=`
    
    <div class="row py-4 ">
                <div class="col-md-6">
                    <input id="searchName" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
                </div>
                <div class="col-md-6">
                    <input id="letter" onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
                </div>
            </div>`
   document.getElementById("myrow").innerHTML=` <div class="container">
                <div id="theshow" class="row searchName py-4">
                </div>  
                </div> `
    
    
    

    
         ;
  }
  
  searchBtn.addEventListener("click", function () {
    showSearchInputs();
    $("#sidebar").animate({left:- sidebarWidth},1000)
    $("#myopen").removeClass("fa-x").css('cursor','pointer');
    $("#myopen").addClass("fa-align-justify");
  });
  


  let searchname = document.getElementById("searchnamee");
  
  async function searchByName(searchName) {
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
  
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
    );
  
    let response = await api.json();
    if (response) {
      $("#inner-loading-screen").fadeOut(500);
      $("#inner-loading-screen").fadeOut(500);
      $("body").css("overflow", "auto");
    }
  
    let searchNameMeals = response.meals;
    console.log(searchNameMeals);
    let cartona = ``;
    for (let i = 0; i < response.meals.length; i++) {
      cartona += `
              
                <div class="col-md-3 gy-4">
                <div class="mymeal position-relative " onclick="displayEachOneName(${response.meals[i].idMeal})">
                    <img class="w-100" src="${response.meals[i].strMealThumb}" alt="">
                    <div class="meal-layer text-black position-absolute d-flex align-items-center">
                       <h3> ${response.meals[i].strMeal}</h3>
                        
                    </div>
                </div>
                
            </div>
                
                `;
    }


    document.getElementById("theshow").innerHTML = cartona;
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
    $("body").css("overflow", "auto");
  }
  
  async function displayEachOneName(idMeal) {
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    document.getElementById("searchContainer").innerHTML=""
    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    let response = await api.json();
  
    let finalEachIngreident = response.meals;
    let ingredents = ``;
    for (let i = 1; i < 20; i++) {
      if (finalEachIngreident[0][`strIngredient${i}`]) {
        ingredents += `<li class="alert alert-info m-2 p-1">${
          finalEachIngreident[0][`strIngredient${i}`]
        }${finalEachIngreident[0][`strMeasure${i}`]}</li>`;
      }
    }
  
    let tags = finalEachIngreident[0].strTags?.split(",");
    if (!tags) tags = [];

    // console.log(tags);
    let tagStr = ``;
    for (let i = 0; i < tags.length; i++) {
      tagStr += `
                          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
                          `;
    }
  
    document.getElementById('myrow').innerHTML = "";
    let carton = `
                      <div class="col-md-4 mt-5">
                              <img class="w-100 rounded-2" src="${finalEachIngreident[0].strMealThumb}" alt="">
                              <h2 class="text-white">${finalEachIngreident[0].strMeal}</h2>  
                          </div>
                          <div class="col-md-8 mt-5">
                              <h2 class="text-white">Instructions</h2>
                              <p class="text-white"> 
                              ${finalEachIngreident[0].strInstructions}
                                  </p>
                                  <div><h3 class="text-white"><strong class="fw-bolder">Area</strong> :  ${finalEachIngreident[0].strArea} </h3></div>
                                  <div><h3 class="text-white"><strong class="fw-bolder">Category </strong> : ${finalEachIngreident[0].strCategory}</h3></div>
                                  <div><h3 class="text-white"><strong class="fw-bolder">Recipes </strong>:</h3> 
                                      <ul class="d-flex g-3 flex-wrap m-0 p-0 list-unstyled">
                                          ${ingredents} 
                                      </ul>
                                      <div><h3 class="text-white fw-bolder">Tags :</h3></div>
                                      <ul class="d-flex g-3 flex-wrap m-0 p-0 list-unstyled">
                                     ${tagStr}
                                      </ul>
                                          <a target="_blank" class="btn btn-success mt-2" href="${finalEachIngreident[0].strSource}">Source</a>
                                          <a target="_blank" class="btn btn-danger mt-2" href="${finalEachIngreident[0].strYoutube}">Youtube</a>
                                  </div>
                          </div>
                      `;
     document.getElementById('myrow').innerHTML = carton;
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
    $("body").css("overflow", "auto");
  }
  
  //start search by Fletter
  
  async function searchByFLetter(serchFname) {
    $("#inner-loading-screen").fadeIn(500);
    $("#inner-loading-screen").fadeIn(500);
    $("body").css("overflow", "auto");
    let letter = document.getElementById("letter").value;
    if (letter === "") {
      $("#inner-loading-screen").fadeOut(500);
      $("#inner-loading-screen").fadeOut(500);
      $("body").css("overflow", "auto");
    }


    let api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${serchFname}`
    );



    let response = await api.json();


    let finalSearchFname = response.meals;

    let cartona = ``;
    for (let i = 0; i < response.meals.length; i++) {
      cartona = `
              
                <div class="col-md-3">
                <div class="box" onclick="displayEachOneName(${response.meals[i].idMeal})">
                    <img class="w-100" src="${response.meals[i].strMealThumb}" alt="">
                    <div class="overlay text-black">
                        ${response.meals[i].strMeal}
                        
                    </div>
                </div>
            </div>
                
                `;
    }
  
    document.getElementById("theshow").innerHTML = cartona;
    $("#inner-loading-screen").fadeOut(500);
    $("#inner-loading-screen").fadeOut(500);
    $("body").css("overflow", "auto");
  }
//////////////////////////////////////contact Us//////////////////////
let contact =document.getElementById("contact");
contact.addEventListener('click', function(){
    showContacts()
 $("#sidebar").animate({left:- sidebarWidth},1000)
 $("#myopen").removeClass("fa-x").css('cursor','pointer');
 $("#myopen").addClass("fa-align-justify");
})

function showContacts() {
    document.getElementById('myrow').innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name"  oninput="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="name-error" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email"  oninput="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="email-error" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone"  oninput="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phone-error" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age"  oninput="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="age-error" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="pass"  oninput="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="password-error" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repass"  oninput="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repassword-error" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("name").addEventListener("focus", () => nameInput = true)

    document.getElementById("email").addEventListener("focus", () =>  emailInput = true)

    document.getElementById("phone").addEventListener("focus", () => phoneInput = true)

    document.getElementById("age").addEventListener("focus", () => ageInput= true)

    document.getElementById("pass").addEventListener("focus", () => passwordInput = true)

    document.getElementById("repass").addEventListener("focus", () => repasswordInput = true)
}
let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;

function inputsValidation() {
    if (nameInput) {
        if (validName()) {
            document.getElementById("name-error").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("name-error").classList.replace("d-none", "d-block")

        }
    }
    if (emailInput) {

        if ( validEmail()) {
            document.getElementById("email-error").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("email-error").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if ( validPhone()) {
            document.getElementById("phone-error").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phone-error").classList.replace("d-none", "d-block")

        }
    }

    if (ageInput) {
        if ( valiAge()) {
            document.getElementById("age-error").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("age-error").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInput) {
        if (validPass()) {
            document.getElementById("password-error").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("password-error").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (validRepass()) {
            document.getElementById("repassword-error").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repassword-error").classList.replace("d-none", "d-block")

        }
    }


    if (validName() &&
        validEmail() &&
        validPhone() &&
        valiAge() &&
        validPass() &&
        validRepass()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}




let inputname =document.getElementById("name");
let email =document.getElementById("email");
let phone =document.getElementById("phone");
let age =document.getElementById("age");
let pass =document.getElementById("pass");
let repass =document.getElementById("repass");


//validation
function validName(){
    var regrex=/[a-zA-Z]{3,}/;
    return regrex.test( document.getElementById("name").value);
}

function validEmail(){
    var regrex=/@gmail/;
    return regrex.test(document.getElementById("email").value);
}


function validPhone(){
    var regrex=/^01[0125][0-9]{8}/;
    return regrex.test( document.getElementById("phone").value);
}


function valiAge(){
    var regrex=/^(0?[1-9]|[1-9][0-9])$/;
    return regrex.test( document.getElementById("age").value);
}


function validPass(){
    var regrex=/^[0-9a-zA-Z]{8,}$/;
    return regrex.test(  document.getElementById("pass").value);
}


function validRepass(){
    return document.getElementById("repass").value==  document.getElementById("pass").value;
}










































































































































































































