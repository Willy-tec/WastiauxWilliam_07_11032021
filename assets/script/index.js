const main = document.querySelector("main");
const containerList = document.querySelectorAll(".formulaire_input_container");
const formulaire_tag = document.querySelector(".formulaire_tag")
const tag_search_container = document.querySelectorAll(".formulaire_input_container_liste")
const ingredient_balise = tag_search_container[0]
const appareil_balise = tag_search_container[1]
const outil_balise = tag_search_container[2]
let recettes = new Recettes(recipes);
let searchBar = document.body.querySelector(".formulaire_search_barre-recherche");
formulaire_tag.innerHTML = "";
main.innerHTML = "";
searchBar.addEventListener("input", updtateTagFilter);
Tag.setListener(updtateTagFilter);
upgrade_liste_item_tag();
upgrade_affichage_liste_recette();
searchBar.value="";

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

/**
 * Mise en place des listener sur les inputs liée au champ de recherche "ingredient", "outil" et "appareil"
 */
containerList.forEach(elt => {
  elt.querySelector("input").addEventListener("input", updateTagSelectorListing)
})

/**
 * Listener permetant de filtrer les items dans les listes de conteneur de tag spécifique. 
 * @param {event} ev 
 */
function updateTagSelectorListing(ev){
  let workingDiv = ev.target.parentNode.querySelector("div");
  let strToEval = normaliser(ev.target.value);
  let array = workingDiv.querySelectorAll("p");
  array.forEach(el => {
    if(el.textContent.match(strToEval)) el.style.display = "block"
    else  el.style.display = "none";
    })
}

/**
 * Reinitialiser l'affichage de la liste d'un conteneur indiqué par node. Le conteneur peut être "ingrédient", "outil" ou "appareil"
 * @param {HTMLElement} node 
 */
function resetTagSelectorListing(node){
  let arr = node.querySelectorAll("p");
  arr.forEach(el => {
    el.style.display = "block"
  })
}

/**
 * Afficher la liste des items d'un conteneur, et son champ "text input". Masquer le bouton.
 * @param {HTMLElement} elt 
 */
function showInputSearch(elt){
  elt.querySelector("button").classList.add("hide");
  elt.querySelector("input").classList.remove("hide");
  elt.querySelector("div").classList.remove("hide");
  elt.querySelector("input").focus();
  elt.classList.add("develloped");
}

/**
 * Masquer la liste des items d'un conteneur, et son champ "text input". Afficher le bouton.
 * @param {HTMLElement} elt 
 */
function hideInputSearch(elt){
  elt.querySelector("input").value = "";
  resetTagSelectorListing(elt.querySelector("div"));
  elt.querySelector("button").classList.remove("hide");
  elt.querySelector("input").classList.add("hide");
  elt.querySelector("div").classList.add("hide");
  elt.classList.remove("develloped");
}

/**
 * Instanciation d'un nouveau Tag, lui affecter la valeur texte "el", et le type correspondant (ingrédient, etc) puis affichage du tag à l'endroit indiqué
 * @param {string} el 
 * @param {string} type 
 */
function ajoutTag(el, type){
  new Tag(el, type).display(formulaire_tag);
}

/**
 * Normalise un string => Supprime les caractère spéciaux, accents, parenthèse, etc, et mets tous les caractère en minuscule afin de faciliter la recherche
 * Methode/fonction en double afin de ne pas avoir a appeller une methode spécifique a recette "en dehors"
 * @param {string} str 
 * @returns {string}
 */
function normaliser(str){
  return str.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[()]/g, "")
  .toLowerCase()
}

/**
 * Listener  qui est appellé a chaque création, ou suppression de tag, ainsi que lors de chaque nouvel input du champ recherche principal
 * Invoque les fonctions lié au filtrage selon input ou tag, met a jour la liste des recettes ainsi que des différents item
 * S'occupe de faire une div dans le cas de l'absence de recette afin d'afficher le message d'erreur
 */
 function updtateTagFilter(){
  let tag_container = document.querySelectorAll("div.formulaire_tag div")
  recettes.reset_liste(recipes);

  for(let tag of tag_container){
    let str = tag.querySelector("span")
    recettes.reset_liste(recettes.filtrer(str.textContent, str.dataset.type))
  }
  if(searchBar.value.length>2) recettes.reset_liste(recettes.filtrer_via_input(searchBar.value));

  upgrade_liste_item_tag();
  upgrade_affichage_liste_recette();

  if(recettes.recettes_listes.length === 0){
    let errorDiv = document.createElement("div")
    errorDiv.textContent = "Il n'y a aucune recette à afficher"
    errorDiv.className = "errorRecipe"
    document.querySelector("main").appendChild(errorDiv);
  } 
}

/**
 * Mettre a jour les listes d'items(ingrédient, outil, appareil) selon la liste de recette, filtré ou non.
 */
function upgrade_liste_item_tag(){
  let listOfTag = makeTagSelectedList()

  recettes.make_ingredient_liste()
  recettes.display(ingredient_balise, "ingredient", listOfTag)

  recettes.make_appareil_liste()
  recettes.display(appareil_balise, "appareil", listOfTag)

  recettes.make_outils_liste()
  recettes.display(outil_balise, "outil", listOfTag)
}

/**
 * Mettre a jour l'affichage des recettes. Cette liste a pu etre filtré, ou non.
 */
function upgrade_affichage_liste_recette(){
  main.innerHTML = ""
  recettes.recettes_listes.forEach(elm => {
    main.appendChild(makeRecipeNode(elm));
  })
}

/**
 * Lister tout les tags que l'on aurait selectionner, puis en faire une liste traduite en string, afin de faciliter la recherche
 * @returns {string}
 */
function makeTagSelectedList(){
  let arr = [];
  let list = formulaire_tag.querySelectorAll(".formulaire_tag_div");
  list.forEach(el => {
    arr.push(el.querySelector("span").textContent)
  })
  return arr.length>0 ? arr.join(" ") : "none";
}

