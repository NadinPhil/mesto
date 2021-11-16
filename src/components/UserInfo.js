export default class UserInfo{
    constructor({nameProfile, jobProfile}){
        this._job = null; 
        this._name = null;
        this._nameProfile = document.querySelector(nameProfile);
        this._jobProfile = document.querySelector(jobProfile);
    }

    //устанавливаем в элементы значения полей this._job и this._name
    updateUserInfo = () => {
        this._nameProfile.textContent = this._name;
        this._jobProfile.textContent = this._job;
    }
    //обновляем поля this._job и this._name новыми Name и Job
    setUserInfo = ({name, job}) => {
        this._name = name;
        this._job = job;
    }
    //возвращаем объект для использования полей 
    getUserInfo() {
        return{
            name: this._name,
            job: this._job,
        }
    }
}