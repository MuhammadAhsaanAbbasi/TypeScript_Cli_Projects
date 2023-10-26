#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner  } from "nanospinner";
import { Account } from "./src files/classes/account.js";
import { displayProfile, transferMoney, CreditMoney, availableBalance, Transactionhistory } from "./src files/customerOptions.js";


let account:Account[]=[]

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}
async function Choice() {
    const {Option}:{Option:'C'|'S'}=await inquirer.prompt({
        name:"Option",
        message:'What you want to do?',
        type:"list",
        choices:[
            {name:'Create Account',value:'C'},
            {name:'Sign in',value:'S'}
        ]
    })
    return Option
}

async function CreateAccount() {
    enum Value{
        Name='Name',
        Age='Age',
        Cnic='Cnic',
        ContactNumber='Contact Number',
        Email='Email',
        pin="Pin",
        UserId='User Id'
    }
    async function Inputs(name:Value,type: string,defaultValue?:string|number) {
        while(true){
            const {input} =await inquirer.prompt([{
                name:'input',
                message:`Enter Your ${name} : `,
                type:type,
                default:defaultValue
                
            }])
            if(!input){
                continue
            }
            if (name === Value.ContactNumber) {
                let numRegex = /^(\+92|0|92)[0-9]{10}$/
                if (!numRegex.test(input)) {
                    console.log(chalk.redBright(`  Use Pakistani Number`))
                    continue
                }
            }
            if(name=== Value.Cnic){
                if(input.length!==13){
                    console.log(chalk.red('Provide a Valid Cnic'))
                    continue
                    
                }
                let accounts=account.filter((val)=>val.cnic===input)
                if(accounts.length){
                    console.log(chalk.red('Cnic is Already Exist!'))
                    continue
                }
            }
            if(name === Value.Email){
                let Email = /^([a-z]|[0-9])+@+(gmail\.com|hotmail\.com|yahoo\.com)$/i
                
                if(!Email.test(input)){
                    console.log(chalk.red.bold('Provide Correct Email'))
                    continue
                }
            }
            if(name === Value.UserId){
                let accounts=account.filter((val)=>val.userId===input)
                if(accounts.length){
                    console.log(chalk.red('UserID is Already Used!'))
                    continue
                }
            }
            return input
        }
    }
        let name = await Inputs(Value.Name, 'string')
        let age = await Inputs(Value.Age, 'number')
        let Cnic = await Inputs(Value.Cnic,'string','Put Cnic Without Dashes')
        let contactNumber = await Inputs(Value.ContactNumber, 'string')
        let email = await Inputs(Value.Email, 'string')
        let pin = await Inputs(Value.pin, 'number')
        let userId=await Inputs(Value.UserId,'string')
        let customerDetails=new Account(name,age,Cnic,contactNumber,email,pin,userId)
        const spinner = createSpinner('Create Your Account').start()
        await sleep()
        account.push(customerDetails)
        spinner.success({text:`${chalk.bgRgb(200,148,132).black('Created Successfully!')}`})
}

async function SignIn() {
    const {userId,pin}:{userId:string,pin:number}=await inquirer.prompt([
        {
            name:'userId',
            message:'Enter Your UserId',
        },
        {
            name:'pin',
            message:'Enter Your Pin',
            type:'number'
        }
    ])
    let customer=account.find((val)=>val.userId===userId)
    const spinner=createSpinner('Sign in Account!').start()
    await sleep()
    if(!customer){
        spinner.error({text:`${chalk.red.bold("UserId Doesn't Exit")}`})
        return
    }else{
    if(customer.pin !== pin){
        spinner.error({text:`${chalk.red.bold("Pin Doesn't Match")}`})
        return
    }
    spinner.success({text:`${chalk.bgRgb(200,148,132).whiteBright("Sign in Succesully!!")}`})
    while(true){
        const {choices}:{choices:'Display Profile'|'Available BaLance'|'Debit'|'Credit'|'Transaction History'}=await inquirer
        .prompt({
            name:'choices',
            type:'rawlist',
            message:'What you want to Do, Select?',
            choices:['Display Profile','Available BaLance','Debit','Credit','Transaction History']
        })
        
        switch(choices){
            case "Display Profile":
                displayProfile(customer)
                break
            case "Available BaLance":
                availableBalance(customer)
                break
            case "Credit":
                await CreditMoney(customer)
                break
            case "Debit":
                await transferMoney(customer)
                break
            case "Transaction History":
                Transactionhistory(customer)
                break
                default:
                    break
            
        }
        const {Option}:{Option:"Another Program Perform"|"Sign Out"}=await inquirer.prompt({
            name:"Option",
            type:'list',
            message:'Select Options',
            choices:["Another Program Perform","Sign Out"]
        })
        if(Option=="Sign Out"){
            console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`))
            break
        }
        if(Option==="Another Program Perform"){
            console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`))
            continue
        }
    }
}
}

while(true){
    let option = await Choice()
    if(option==='C'){
        await CreateAccount()
    }
    if(option==="S"){
        await SignIn()
    }
    const input = await inquirer.prompt({
        // name:'input',
        name:'Do you want to exit?',
        type:"confirm"
    })
    let value:boolean = await input['Do you want to exit?']
    if(value){
        break
    }
    console.log(chalk.whiteBright(`\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n`))
}

