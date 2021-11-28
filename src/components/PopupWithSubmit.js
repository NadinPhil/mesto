import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._form = this._popupSelector.querySelector('.form');
    }
    //добавляем обработчик клика и самбита
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmitFunction();
        });
    }
    //переопределяем функцию 

    setActionSubmit(action){
        this._handleSubmitFunction = action;
    }
   
}