class AccountController {
    constructor(){
        let initAccount = JSON.parse(localStorage.getItem('account'))
        if(initAccount==null){
            initAccount = []
        }else{
            initAccount = initAccount.list
        }
        this.account = initAccount
        this.storage = {
            list: initAccount
        }
    }
    addAccount(newAccount){
        let account = this.account
        let storage = this.storage
        account.push(newAccount)
        storage.list = account
        this.account = account
        this.storage = storage
        localStorage.setItem('account',JSON.stringify(storage))
    }
    deleteAccount(id){
        let account = this.account
        let storage = this.storage
        account = account.filter(v => v.id!=id)
        storage.list = account
        this.account = account
        this.storage = storage
        localStorage.setItem('account',JSON.stringify(storage))
    }
    editAccount(newAccount){
        let account = this.account
        let storage = this.storage
        account = account.map(v =>{
            return v.id==newAccount.id?newAccount:v
        })
        storage.list = account
        this.account = account
        this.storage = storage
        localStorage.setItem('account',JSON.stringify(storage))
    }
    updateAccount(newAccount){
        let storage = this.storage
        storage.list = newAccount
        this.account = newAccount
        this.storage = storage
        localStorage.setItem('account',JSON.stringify(storage))
    }
}

let accountController = new AccountController()
export default accountController