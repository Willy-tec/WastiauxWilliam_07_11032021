console.log(recipes[0])

let nodeArray = []

function makeRecipeNode(elm){
    let nodeArticle = document.createElement("article");
    nodeArticle.className="recette";
    nodeArticle.setAttribute("data-id", elm.id)

    let imageDiv = document.createElement("div");
    imageDiv.className = "recette_image";
    // Es ce qu'on ajoute la balise img ?

    nodeArticle.appendChild(imageDiv);
    nodeArticle.appendChild(makeRecipeDescription(elm));

    return nodeArticle;

}

function makeRecipeDescription(elm){
    let div = document.createElement("div");
    div.className = "recette_description";

    div.appendChild(makeRecipeDescriptionTitle(elm))
    div.appendChild(makeRecipeDescriptionDetail(elm))
    return div;
}

function makeRecipeDescriptionTitle(elm){
    let titleDiv = makeBalise({title : "div", classTitle :"recette_description_title"})
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
    let ing =  makeBalise({type : "span", text: elm.ingredient});
    liNode.appendChild(ing);
    if( elm.quantity){
        let point =  makeBalise({type : "span", text: " : "});
        let quantity =  makeBalise({type : "span", text: elm.quantity});
        liNode.appendChild(point);
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





let okButton = document.querySelector(".formulaire_loupe")
okButton.addEventListener("click", listenMe)
let boolan= false;
function listenMe(evt){

    evt.preventDefault();
    if(boolan){boolan=false
            nodeArray.sort((a , b)=>{
        return a.querySelector("h2").textContent - b.querySelector("h2").textContent
    })
    }
    else {boolan=true
        nodeArray.sort((a , b)=> {
            return a.getAttribute("data-id")-b.getAttribute("data-id")
        })
    }
    console.log(nodeArray)
}