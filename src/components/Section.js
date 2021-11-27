export default class Section{
    constructor({ renderer }, containerSelector){
        this._renderer = renderer;// renderer — это функция
        this._containerSelector = document.querySelector(containerSelector);
    }
    renderItems(renderItems) {
        renderItems.forEach(item => {
          this._renderer(item); 
        });
      }
  
    addItem(element){
        this._containerSelector.prepend(element);
    }      
}
 