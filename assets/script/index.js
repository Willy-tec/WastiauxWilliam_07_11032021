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
let tagList = [];
/**
 * Mise en place des listeners liée au champ de recherche "ingredient", "outil" et "appareil"
 */
containerList.forEach(elt => {

  elt.querySelector("button").addEventListener("click", ()=>
  {
    showInputSearch(elt);
    window.addEventListener("click",function fn1(e){

      if(e.target.nodeName!=="INPUT"){
        hideInputSearch(elt);
        window.removeEventListener("click", fn1, true)
      }
      if(e.target.nodeName==="P"){
        ajoutTag(e.target.textContent, e.target.dataset.type)
      } 
    },{capture:true})
  })
})

function showInputSearch(elt){
  elt.querySelector("button").classList.add("hide");
  elt.querySelector("input").classList.remove("hide");
  elt.querySelector("div").classList.remove("hide");
  elt.querySelector("input").focus();
}

function hideInputSearch(elt){
  elt.querySelector("button").classList.remove("hide");
  elt.querySelector("input").classList.add("hide");
  elt.querySelector("div").classList.add("hide");
}

Tag.setListener(updtateTagFilter)

function ajoutTag(el, type){
  new Tag(el, type).display(formulaire_tag);
}

function normaliser(str){
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

let searchBar = document.body.querySelector(".formulaire_search_barre-recherche");
searchBar.addEventListener("input", updtateTagFilter);


/**
 * Listener de la classe Tag qui est appellé a chaque création, ou suppression de tag.
 */
 function updtateTagFilter(ev){

  let tag_container = document.querySelectorAll("div.formulaire_tag div")
  recettes.reset_liste(recipes);
/*   let arr = recettes.filtrer_via_input(ev.target.value); */
  

  for(let tag of tag_container){
    let str = tag.querySelector("span")
    recettes.reset_liste(recettes.filtrer(str.textContent, str.dataset.type))
  }
  recettes.reset_liste(recettes.filtrer_via_input(searchBar.value));
  upgrade_liste_item_tag();
  upgrade_affichage_liste_recette();
  if(recettes.recettes_listes.length === 0) console.log("no recette")
}



const tag_search_container = document.querySelectorAll(".formulaire_input_container_liste")
const ingredient_balise = tag_search_container[0]
const outil_balise = tag_search_container[2]
const appareil_balise = tag_search_container[1]

function upgrade_liste_item_tag(){
  recettes.make_ingredient_liste()
  recettes.display(ingredient_balise, "ingredient")

  recettes.make_appareil_liste()
  recettes.display(appareil_balise, "appareil")

  recettes.make_outils_liste()
  recettes.display(outil_balise, "outil")
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


// Bug avec "thon rouge ou blanc"