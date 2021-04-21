const nodeArray = []
const d = document;
const main = d.querySelector("main");
/* const ingredient_balise = d.querySelector(".formulaire_input_container_liste"); */
const containerList = d.querySelectorAll(".formulaire_input_container");
const formulaire_tag = d.querySelector(".formulaire_tag")

formulaire_tag.innerHTML = "";
main.innerHTML = "";



let recettes = new Recettes(recipes);
let advSearchArr = []
//let tagList = [];
/**
 * Mise en place des listeners liée au champ de recherche "ingredient", "outil" et "appareil"
 */
containerList.forEach(elt => {

  elt.querySelector("button").addEventListener("click", ()=>
  {
    showInputSearch(elt);
    window.addEventListener("click",function fn1(e){
      if(e.target.nodeName!=="INPUT" || e.target.className ==="formulaire_search_barre-recherche"){
        hideInputSearch(elt);

        window.removeEventListener("click", fn1, true)
      }
      if(e.target.nodeName==="P"){
        ajoutTag(e.target.textContent, e.target.dataset.type)
      } 
    },{capture:true})
  })
})

containerList.forEach(elt => {
  elt.querySelector("input").addEventListener("input", updateTagSelectorListing)
})



function updateTagSelectorListing(ev){
  ev.preventDefault();
  let workingDiv = ev.target.parentNode.querySelector("div");
  let strToEval = normaliser(ev.target.value);
  let array = workingDiv.querySelectorAll("p");
  array.forEach(el => {
    if(el.textContent.match(strToEval)) el.style.display = "block"
    else  el.style.display = "none";
    })
  
}

function resetTagSelectorListing(node){
  let arr = node.querySelectorAll("p");
  arr.forEach(el => {
    el.style.display = "block"
  })
}



function showInputSearch(elt){
  elt.querySelector("button").classList.add("hide");
  elt.querySelector("input").classList.remove("hide");
  elt.querySelector("div").classList.remove("hide");
  elt.querySelector("input").focus();
  elt.classList.add("develloped");
}

function hideInputSearch(elt){
  elt.querySelector("input").value = "";
  resetTagSelectorListing(elt.querySelector("div"));
  elt.querySelector("button").classList.remove("hide");
  elt.querySelector("input").classList.add("hide");
  elt.querySelector("div").classList.add("hide");
  elt.classList.remove("develloped");
}

Tag.setListener(updtateTagFilter)

function ajoutTag(el, type){
  new Tag(el, type).display(formulaire_tag);
}

function normaliser(str){
  return str.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[()]/g, "")
  .toLowerCase()
}

let searchBar = document.body.querySelector(".formulaire_search_barre-recherche");
searchBar.addEventListener("input", updtateTagFilter);


/**
 * Listener de la classe Tag qui est appellé a chaque création, ou suppression de tag.
 */
 function updtateTagFilter(ev){
  let tag_container = document.querySelectorAll("div.formulaire_tag div")
  recettes.reset_liste(recipes);
  for(let tag of tag_container){
    let str = tag.querySelector("span")
    recettes.reset_liste(recettes.filtrer(str.textContent, str.dataset.type))
  }
  recettes.reset_liste(recettes.filtrer_via_input(searchBar.value));
  upgrade_liste_item_tag();
  upgrade_affichage_liste_recette();
  if(recettes.recettes_listes.length === 0){
    let errorDiv = document.createElement("div")
    errorDiv.textContent = "Il n'y a aucune recette à afficher"
    errorDiv.className = "errorRecipe"
    document.querySelector("main").appendChild(errorDiv);
  } 
}



const tag_search_container = document.querySelectorAll(".formulaire_input_container_liste")
const ingredient_balise = tag_search_container[0]
const outil_balise = tag_search_container[2]
const appareil_balise = tag_search_container[1]

function upgrade_liste_item_tag(){
  let listOfTag = makeTagSelectedList()

  recettes.make_ingredient_liste()
  recettes.display(ingredient_balise, "ingredient", listOfTag)

  recettes.make_appareil_liste()
  recettes.display(appareil_balise, "appareil", listOfTag)

  recettes.make_outils_liste()
  recettes.display(outil_balise, "outil", listOfTag)
}

function upgrade_affichage_liste_recette(){
  main.innerHTML = ""
  recettes.recettes_listes.forEach(elm => {
    main.appendChild(makeRecipeNode(elm));
  })
}

function upgrade_affichage_liste_recette_custom(liste){
  main.innerHTML = "";
  console.log(liste)
  liste.forEach(elm => {
    main.appendChild(makeRecipeNode(elm));
  })
}

upgrade_liste_item_tag();
upgrade_affichage_liste_recette();

function makeTagSelectedList(){
  let arr = [];
  let list = formulaire_tag.querySelectorAll(".formulaire_tag_div");
  list.forEach(el => {
    arr.push(el.querySelector("span").textContent)
  })
  return arr.length>0 ? arr.join(" ") : "none";
}
