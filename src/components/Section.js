export default class Section{
    constructor({ renderer }, container){
        this._renderer = renderer;// renderer — это функция
        this._container = document.querySelector(container);
    }
    renderItems(renderItems) {
        renderItems.forEach(item => {
          this._renderer(item); 
        });
      }
  
    addItem(element){
        this._container.prepend(element);
    }      
}
 