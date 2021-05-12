/**
 * Creer un nouveau Tag
 * @class
 */
class Tag{
  static valeur = 0;
  static listener = null;
/**
 * Setup du tag: msg contient le contenu du tag, exemple : "salade", et type pour indiquer s'il sagit d'un ingredient, outil ou appareil
 * @param {string} msg 
 * @param {string} type 
 */
  constructor(msg, type){
    this.text = msg;
    this.type = type ||"undefined";
  }
/**
 * Afficher le tag dans la node voulu. La valeur this est retourné dans le cas ou l'on voudrais chainé la méthode
 * Element inportant a noter : la méthode s'occupe d'ajouter un listener au tag, qui permettras de supprimer le tag au click
 * @param {HTMLElement} node 
 */
  display(node){
    let div = document.createElement("div");
    div.innerHTML = `<span data-type="${this.type}">${this.text}</span><button><img src="assets/images/white_cross.svg" alt="Une croix pour effacer le tag"></button>`;
    div.className = `formulaire_tag_div ${this.type}`
    div.querySelector("button").onclick = ()=>{
      node.removeChild(div);
      Tag.setNombre(-1);
    }
    node.appendChild(div);
    Tag.setNombre(+1);
  }

  static getNombre(){return Tag.valeur};

  static setNombre(deltaNb){
    Tag.valeur += deltaNb;
    if(Tag.isListened) Tag.listener();
  }
/**
 * Affecter un listener qui s'executera a chaque ajout, ou suppression de tag
 * @param {function} fn 
 */
  static setListener(fn){
    Tag.listener = fn;
  }
/**
 * Connaitre la présence d'un listener
 * @returns {boolean}
 */
  static get isListened(){ return Tag.listener !== null ? true: false}
}

export {Tag}