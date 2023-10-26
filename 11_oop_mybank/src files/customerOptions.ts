import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { Account } from "./classes/account.js";

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}
export function displayProfile(account:Account) {
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Name            : `)} ${account.name}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Age             : `)} ${account.age}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Age             : `)} ${account.cnic}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Contact Number  : `)} ${account.contactNumber}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Email           : `)} ${account.email}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`User Id         : `)} ${account.userId}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Account Balance : `)} ${account.bankAccount.accountBalance}`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Account Number  : `)} ${account.bankAccount.accountNumber}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
}

export function availableBalance(account:Account){
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.whiteBright(`${chalk.bgRgb(35,91,168)(`Account Balance:`)} ${account.bankAccount.accountBalance}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
}

export async function transferMoney(account:Account){
    while(true){
        const{name}:{name:string|number}=await inquirer.prompt({
            name:'name',
            message:'Enter a Account Number or Name to Transfer Money?',
            // type:
        })
        const{input}=await inquirer.prompt({
            name:'input',
            message:'Enter Amount:',
            type:"number"
        })
        const spinner=createSpinner("Processing").start()
        await sleep()
        if(!input){
            spinner.error({text:`${chalk.redBright.bold("Please Enter a Valid Amount")}`})
            continue
        }
        if(input>account.bankAccount.accountBalance){
            spinner.error({text:`${chalk.redBright.bold("You Enter a Big Amount, Kindly Provide a Valid Amount")}`})
            continue
        }
        account.bankAccount.Debit(input)
        spinner.success({text:`${chalk.greenBright.bold(`Dear Rs:${input} has been Transfered to ${name}`)}`})
        spinner.success({text:`${chalk.greenBright.bold("Transaction Successfull!")}`})
        return
    }
}

export async function CreditMoney(account:Account){
    while(true){
        const{input}=await inquirer.prompt({
            name:'input',
            message:'Enter Amount:',
            type:"number"
        })
        const spinner=createSpinner("Processing").start()
        await sleep()
        if(!input){
            spinner.error({text:`${chalk.redBright.bold("Please Enter a Valid Amount")}`})
            continue
        }
        account.bankAccount.Credit(input)
        spinner.success({text:`${chalk.greenBright.bold(`${input<=1000 ?'Transaction Succesful': 'Transaction Sucess and Fees: 10Rs'}`)}`})
        return
    }
}

export function Transactionhistory(account:Account){
    if(!account.bankAccount.transaction.length){
        console.log(chalk.red.bold("No Transaction Available"))
    }
    console.table(account.bankAccount.transaction.map((val)=>{return {...val, fees:val.fees , Amount:val.Amount}}))
}