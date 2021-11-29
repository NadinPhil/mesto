export default class UserInfo{
    constructor({nameProfile, jobProfile, avatarPtofile, currentUserId}){
        this._nameProfile = document.querySelector(nameProfile);
        this._jobProfile = document.querySelector(jobProfile);
        this._userInfoAvatar = document.querySelector(avatarPtofile);
        this._currentUserId = currentUserId;
    }

    //устанавливаем в элементы значения полей this._about и this._name
    //обновляем
    updateUserInfo = () => {
        this._nameProfile.textContent = this._name;
        this._jobProfile.textContent = this._about;
    }
    //обновляем поля this._about и this._name новыми Name и About 
    //устанавливаем
    setUserInfo = ({name, about, avatar, _id }) => {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._currentUserId = _id;
    }
    //возвращаем объект для использования полей 
    //получаем
    getUserInfo() {
        return{
            name: this._name,
            about: this._about,
        }
    }
    editUserAvatar(avatar) {
        if (avatar){
            this._userInfoAvatar.src = avatar;
        }
       else {
        console.log('Ошибка!')
    }
    }
   
}