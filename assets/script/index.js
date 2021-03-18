console.log(recipes[0])

let nodeArray = []

function makeRecipeNode(elm){
    let nodeArticle = document.createElement("article");
    nodeArticle.className="recette";
    nodeArticle.setAttribute("data-id", elm.id)

    let imageDiv = makeBalise({classTitle: "recette_image"})

    // Es ce qu'on ajoute la balise img ?

    nodeArticle.appendChild(imageDiv);
    nodeArticle.appendChild(makeRecipeDescription(elm));

    return nodeArticle;

}

function makeRecipeDescription(elm){
    let div = makeBalise({classTitle: "recette_description"})
    div.appendChild(makeRecipeDescriptionTitle(elm))
    div.appendChild(makeRecipeDescriptionDetail(elm))
    return div;
}

function makeRecipeDescriptionTitle(elm){
    let titleDiv = makeBalise({classTitle :"recette_description_title"})
    let h2 = makeBalise({type : "H2", text: elm.name});
    let dure = makeBalise({type: "p",classTitle: "recette_description_title_dure", text: elm.time+" min"});

    titleDiv.appendChild(h2);
    titleDiv.appendChild(dure);

    return titleDiv
}

function makeRecipeDescriptionDetail(elm){
    let detail = makeBalise({type: "div", classTitle: "recette_description_detail"})
    detail.appendChild(makeRecipeListe(elm))
    detail.appendChild(makeBalise({type:"div", classTitle:"recette_description_detail_resume", text: elm.description}))
    return detail
}

function makeRecipeListe(elm){
    let ulDiv = makeBalise({type: "ul", classTitle:"recette_description_detail_ingredient"})
    elm.ingredients.forEach(item =>{
        ulDiv.appendChild(makeBaliseIng(item))
    })
    return ulDiv
}

function makeBaliseIng(elm){
    let liNode = makeBalise({type: "li"})
    let ing =  makeBalise({type : "span", text: elm.ingredient+": "});
    liNode.appendChild(ing);
    if( elm.quantity){
/*         let point =  makeBalise({type : "span", text: " : "}); */
        let quantity =  makeBalise({type : "span", text: elm.quantity});
/*         liNode.appendChild(point); */
        liNode.appendChild(quantity);
        if(elm.unit){
            let unite =  makeBalise({type : "span", text: " " + elm.unit});
            liNode.appendChild(unite);
        }
    }
    return liNode;
}

function makeBalise({type="div", classTitle, text}){
    let div = document.createElement(type);
    if(classTitle) div.className = classTitle;
    if(text) div.textContent = text;
    return div;
}

let main = document.querySelector("main")
main.innerHTML = "";

recipes.forEach(elm =>{
    nodeArray.push(makeRecipeNode(elm));
    main.appendChild(nodeArray[nodeArray.length-1]);
})




