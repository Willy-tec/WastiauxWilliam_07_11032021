/**
 * Création de la balise de type article contenant toutes les info d'une recette
 * L'objet reçu est un élément de la liste de recette fourni par ocr
 * Retourne une balise que l'on peut inserez dans le code html
 * elm est un élément d'une liste de recette tel que : Recette = [ ..., elm = {id, name, ingredient, ...}]
 * @param {object} elm 
 * @returns {HTMLElement}
 */
 function makeRecipeNode(elm) {
  let nodeArticle = document.createElement("article");
  nodeArticle.className = "recette";
  nodeArticle.setAttribute("data-id", elm.id)
  let imageDiv = makeBalise({
    classTitle: "recette_image"
  })
  nodeArticle.appendChild(imageDiv);
  nodeArticle.appendChild(makeRecipeDescription(elm));
  return nodeArticle;
}

/**
 * Création de la node contenant le conteneur description, avec le titre et les détails
 * @param {object} elm 
 * @returns {HTMLElement}
 */
function makeRecipeDescription(elm) {
  let div = makeBalise({
    classTitle: "recette_description"
  })
  div.appendChild(makeRecipeDescriptionTitle(elm))
  div.appendChild(makeRecipeDescriptionDetail(elm))
  return div;
}

/**
 * Création de la node contenant le titre
 * @param {object} elm 
 * @returns {HTMLElement}
 */
function makeRecipeDescriptionTitle(elm) {
  let titleDiv = makeBalise({
    classTitle: "recette_description_title"
  })
  let h2 = makeBalise({
    type: "H2",
    text: elm.name
  });
  let dure = makeBalise({
    type: "p",
    classTitle: "recette_description_title_dure",
    text: elm.time + " min"
  });
  titleDiv.appendChild(h2);
  titleDiv.appendChild(dure);
  return titleDiv
}

/**
 * Création de la node contenant les détails de la description : ingrédient et marche a suivre de la recette
 * @param {object} elm 
 * @returns {HTMLElement}
 */
function makeRecipeDescriptionDetail(elm) {
  let detail = makeBalise({
    type: "div",
    classTitle: "recette_description_detail"
  })
  detail.appendChild(makeRecipeListe(elm))
  //make the ellipsis in case the length is above 200
  elm.description = elm.description.length > 150 ? elm.description.slice(0,150) +"..." : elm.description
  detail.appendChild(makeBalise({
    type: "div",
    classTitle: "recette_description_detail_resume",
    text: elm.description
  }))
  return detail
}

/**
 * Création de la node contenant la liste des ingrédients
 * @param {object} elm 
 * @returns {HTMLElement}
 */
function makeRecipeListe(elm) {
  let ulDiv = makeBalise({
    type: "ul",
    classTitle: "recette_description_detail_ingredient"
  })
/*   elm.ingredients.forEach((item, index) => {
    ulDiv.appendChild(makeBaliseIng(item))
  }) */
  let index = 0;
  for(let el of elm.ingredients){
    index++
    ulDiv.appendChild(makeBaliseIng(el))
    console.log(elm.ingredients.length + " index:" +index)
    if(index>3){
      if(index!=elm.ingredients.length ) ulDiv.appendChild(document.createTextNode("..."))
      break
    } 
  }
  return ulDiv
}

/**
 * Création de la node <li> pour un ingrédient. S'occupe de formatter correctement l'ingrédients selon sa quantité et son unité
 * @param {object} elm 
 * @returns {HTMLElement}
 */
function makeBaliseIng(elm) {
  let liNode = makeBalise({
    type: "li"
  })
  let ing = makeBalise({
    type: "span",
    text: elm.ingredient + ": "
  });
  liNode.appendChild(ing);
  if (elm.quantity) {
    let quantity = makeBalise({
      type: "span",
      text: elm.quantity
    });
    liNode.appendChild(quantity);
    if (elm.unit) {
      let unite = makeBalise({
        type: "span",
        text: " " + elm.unit
      });
      liNode.appendChild(unite);
    }
  }
  return liNode;
}

/**
 * Création d'une node. Permet de simplifier la création d'une node en prenant en parametre un objet qui défini son type, son nom de classe, et son texte. Chaque parametre étant optionel.
 * @param {object} elm 
 * @returns {HTMLElement}
 */
function makeBalise({
  type = "div",
  classTitle,
  text
}) {
  let div = document.createElement(type);
  if (classTitle) div.className = classTitle;
  if (text) div.textContent = text;
  return div;
}