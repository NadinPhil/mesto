import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
        this._handleSubmitFunction = null;
    }
    //добавляем обработчик клика и самбита
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.prevenDefault();
            this._handleSubmitFunction();
        });
    }
    //переопределяем функцию 
    setActionSubmit(action){
        this._handleSubmitFunction = action;
    }
   
}