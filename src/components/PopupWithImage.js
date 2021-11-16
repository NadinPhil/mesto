import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);  
        this._popupImageLink = this._popupSelector.querySelector('.popup__link');
        this._popupImageName = this._popupSelector.querySelector('.popup__name');
    }
    open({link, name}){
        this._popupImageLink.src = link;
        this._popupImageLink.alt = name;
        this._popupImageName.textContent = name;
        super.open();
    }
}