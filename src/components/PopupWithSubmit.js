import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        //this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._popupSelector.querySelector('.form');
    }
    //добавляем обработчик клика и самбита
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
        //this.redefineFormDelete();
        this._handlerCardDelete()
        });
    }
    //переопределяем функцию 
    //redefineFormDelete(handlerSubmitForm) {
     //   this.redefineFormDelete = handlerSubmitForm;
    //}
    setActionSubmit(action){
        this._handlerCardDelete = action;

    }
   
}