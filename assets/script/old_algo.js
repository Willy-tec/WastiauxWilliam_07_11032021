let body = document.querySelector("body")
let okButton = body.querySelector(".formulaire_search_loupe")
okButton.addEventListener("click", listenMe)
let boolan= false;

function listenMe(evt){
    evt.preventDefault();
    if(boolan){boolan=false
            nodeArray.sort((a , b)=>{
        return b.getAttribute("data-id") - a.getAttribute("data-id")
    })
    }
    else {boolan=true
        nodeArray.sort((a , b)=> {
            return a.getAttribute("data-id")-b.getAttribute("data-id")
        })
    }
    orderHtmlByArray()
    console.log(nodeArray[0])
}

function orderHtmlByArray(){
    nodeArray.forEach((elm, i) => elm.style.order = i)
}

/* let searchBar = body.querySelector(".formulaire_search_barre-recherche");
searchBar.addEventListener("input", searchListener); */


/**
 * Fonctionalité a tester en double pour exo 2 algo
 * @param {event} evt 
 */
function searchListener(evt){
    let str = evt.target.value;
    if(str.length>2){
        str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()            // permet de normaliser le string, on décompose sa valeur, et son accent, pour ensuite supprimer l'accent
        let filteredArr = findInTitle(nodeArray, str);
        filteredArr.forEach((elm, index)=>{
            if(elm === undefined) nodeArray[index].style.display = "none";
            else nodeArray[index].style.display = "block";
            
        })
    }
}

function findInTitle(arr, str){
    let nouvArr = arr.map(elt => {
        let testStr = elt.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if(testStr.match(str)) return elt})
    return nouvArr
}


function normaliser(str){
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}