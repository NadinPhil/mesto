import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, handlerSubmitForm){
        super(popupSelector);
        this._handlerSubmitForm = handlerSubmitForm;
        this._form = this._popupSelector.querySelector('.form');
        this._inputForm = this._popupSelector.querySelectorAll('.form__input');
    }
    //собираем данные всех полей формы
    _getInputValues() {
        this._formValues = {};
        this._inputForm.forEach((element) => {
            this._formValues[element.name] = element.value;
        
        });
        return this._formValues;
    }
    //добавляем обработчик клика и самбита
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.prevenDefault();
            this._handlerSubmitForm(this._getInputValues());
        });
    }
    //метод закрытия и очистки формы
    close() {
        super.close();
        this._form.reset();
    }
}