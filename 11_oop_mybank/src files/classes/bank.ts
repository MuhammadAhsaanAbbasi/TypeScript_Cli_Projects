export class BankAccount{
    accountNumber:number=Math.floor(Math.random()*(9*Math.pow(10,10)))+(Math.pow(10,10))
    accountBalance:number
    transaction:{Type:'Debit'|'Credit',Amount:number,Date:string,fees:number}[]=[]

    constructor(){
        this.accountBalance=Math.floor(Math.random()*1500)
    }

    Debit(amount:number){
        const index:number=String(new Date()).lastIndexOf(':')+3
        const date:string=String(new Date()).slice(0,index)
        this.accountBalance-=amount
        this.transaction.push({Type:'Debit',Amount:amount,Date:date,fees:0})
    }

    Credit(amount:number){
        const index:number=String(new Date()).lastIndexOf(':')+3
        const date:string=String(new Date()).slice(0,index)
        if(amount>1000){
            this.accountBalance+=amount
            this.accountBalance-=10
            this.transaction.push({Type:"Credit",Amount:amount,Date:date,fees:10})
        }else{
            this.accountBalance+=amount
            this.transaction.push({Type:"Credit",Amount:amount,Date:date,fees:0})
        }
    }
}