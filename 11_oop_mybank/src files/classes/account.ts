import { BankAccount } from "./bank.js";

export class Account{
    name:string
    age:number
    userId:string
    cnic:string
    contactNumber:string
    email:string
    pin:number
    bankAccount:BankAccount
    constructor(name:string,age:number,cnic:string,contact:string,email:string,pin:number,Id:string,){
        this.name=name
        this.age=age
        this.cnic=cnic
        this.contactNumber=contact
        this.email=email
        this.pin=pin
        this.userId=Id
        this.bankAccount=new BankAccount()
    }
}
