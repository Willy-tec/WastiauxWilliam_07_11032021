
let okButton = document.querySelector(".formulaire_search_loupe")
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