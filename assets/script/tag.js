/* class Tag{
  constructor(name){
    this.name = name;
    // this.nameCapital = this.name.capitalize(); 
    this.baliseStr = `<div class="formulaire_tag_div"><span>${this.name}</span><button>X</button></div>`
  }
  render(){

  }
} */




class Tag{
  static valeur = 0;
  static listener = null;

  constructor(msg, type){
    this.text = msg;
    this.type = type ||"undefined";
  }

  display(node){
    let div = d.createElement("div");
    div.innerHTML = `<span data-type="${this.type}">${this.text}</span><button><img src="assets/images/white_cross.svg" alt="Une croix pour effacer le tag"></button>`;
    div.className = `formulaire_tag_div ${this.type}`
    div.querySelector("button").onclick = ()=>{
      node.removeChild(div);
      Tag.setNombre(-1);
    }
    node.appendChild(div);
    Tag.setNombre(+1);
    return this;
  }

  static getNombre(){return Tag.valeur};

  static setNombre(deltaNb){
    Tag.valeur += deltaNb;
    if(Tag.isListened) Tag.listener();
  }

  static setListener(fn){
    Tag.listener = fn;
  }

  static get isListened(){ return Tag.listener !== null ? true: false}
}