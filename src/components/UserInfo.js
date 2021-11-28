export default class UserInfo{
    constructor({nameProfile, jobProfile}){
        this._nameProfile = document.querySelector(nameProfile);
        this._jobProfile = document.querySelector(jobProfile);
    }

    //устанавливаем в элементы значения полей this._about и this._name
    //обновляем
    updateUserInfo = () => {
        this._nameProfile.textContent = this._name;
        this._jobProfile.textContent = this._about;
    }
    //обновляем поля this._about и this._name новыми Name и About 
    //устанавливаем
    setUserInfo = ({name, about}) => {
        this._name = name;
        this._about = about;
    }
    //возвращаем объект для использования полей 
    //получаем
    getUserInfo() {
        return{
            name: this._name,
            about: this._about,
        }
    }
}