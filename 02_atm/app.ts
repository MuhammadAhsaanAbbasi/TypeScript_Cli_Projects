#!/usr/bin/env node
import inquirer from "inquirer";
import chalk  from "chalk";
import chalkAnimation from "chalk-animation"
import figlet from "figlet";
import gradient from "gradient-string";


const sleep=(ms=1500)=>{
    return new Promise((resolve,rejects)=>{
        setTimeout(resolve,ms)
    })
}
async function shine() {
    console.clear()
    const msg=`ATM M A C H I N E!!!`
    figlet(msg,(err,Data)=>{
        console.log(gradient.pastel.multiline(Data))
    })
}
async function  getStarted() {
    let rainbowTitle=chalkAnimation.rainbow(`
    /$$$$$$  /$$$$$$$$ /$$      /$$       /$$      /$$                     /$$       /$$                          
    /$$__  $$|__  $$__/| $$$    /$$$      | $$$    /$$$                    | $$      |__/                          
    | $$  \ $$   | $$   | $$$$  /$$$$      | $$$$  /$$$$  /$$$$$$   /$$$$$$$| $$$$$$$  /$$ /$$$$$$$   /$$$$$$       
    | $$$$$$$$   | $$   | $$ $$/$$ $$      | $$ $$/$$ $$ |____  $$ /$$_____/| $$__  $$| $$| $$__  $$ /$$__  $$      
    | $$__  $$   | $$   | $$  $$$| $$      | $$  $$$| $$  /$$$$$$$| $$      | $$  \ $$| $$| $$  \ $$| $$$$$$$$      
    | $$  | $$   | $$   | $$\  $ | $$      | $$\  $ | $$ /$$__  $$| $$      | $$  | $$| $$| $$  | $$| $$_____/      
    | $$  | $$   | $$   | $$ \/  | $$      | $$ \/  | $$|  $$$$$$$|  $$$$$$$| $$  | $$| $$| $$  | $$|  $$$$$$$      
    |__/  |__/   |__/   |__/     |__/      |__/     |__/ \_______/ \_______/|__/  |__/|__/|__/  |__/ \_______/   
    \n`)
    await sleep()
    rainbowTitle.stop()
}
await getStarted()

async function askQuestion() {
    let currentBalance=Math.floor(Math.random()*100000+1)
    const user_input=await inquirer
    .prompt([
        {
            message:"Enter your Account Holder Name:",
            type:"input",
            name:"user_name",
            
        },
        {
            message:"Enter your 4-digit PIN:",
            type:"password",
            name:"user_Password",
            mask:"*",
            validate:(answer:number)=>{
                let pansanswer=JSON.stringify(answer)
                if((pansanswer.length-2)<4||(pansanswer.length-2)>4){
                    return chalk.rgb(202,15,15)(`Enter a Valid Number!!`)
                }
                return true;
            }
        },
        {
            message:"Select Your Option to Perform in ATM:-",
            type:"list",
            name:"user_operator",
            choices:["Cash-WithDraw","Check-Balance","Transfer-Money"]
        }
    ])
    if(user_input.user_operator==="Cash-WithDraw"){
        const cash_wtDrw=await inquirer
        .prompt([
            {
            message:`Your Current Balance is $ ${currentBalance}, Enter the Amount you want for WithDraw: $`,
            type:"number",
            name:"withDraw_Amount",
            validate:(answer:number)=>{
                let pansanswer=JSON.stringify(answer)
                let newans=Number(pansanswer)
                if(isNaN(newans)||newans>currentBalance){
                    return chalk.rgb(202,15,15)(`Enter a Valid Amount to WithDraw!`)
                }
                return true;
            }
            },
            {
                message:"Do You Want To Take Receipt, Press 'y' or 'n':",
                type:"input",
                name:"user_receipt",
            }
        ])
        if(cash_wtDrw.user_receipt==="y"||cash_wtDrw.user_receipt==="Y"||cash_wtDrw.user_receipt==="YES"||cash_wtDrw.user_receipt==="yes"){
            console.log(`Account Holder Name: ${user_input.user_name}\nWithDraw Money: ${cash_wtDrw.withDraw_Amount}\nTotal Amount left: ${currentBalance - cash_wtDrw.withDraw_Amount}`)
        }
    }else if(user_input.user_operator==="Check-Balance"){
        console.log(`Your Current Balance is $ ${currentBalance}`)
    }else if(user_input.user_operator==="Transfer-Money"){
        const transfer=await inquirer
        .prompt([
            {
                message:"Select or Enter Another Accont to Transfer Money:",
                type:"input",
                name:"transfer_user",
                default:"0786xc"
            },
            {
            message:"Enter your 4-digit PIN:",
            type:"password",
            name:"user_Pass",
            mask:"*",
            validate:(answer:number)=>{
                let pansanswer=JSON.stringify(answer)
                if(user_input.user_Password!==answer||(pansanswer.length-2)>4){
                    return chalk.rgb(202,15,15)(`Your 4-digit PIN Don't Match With Previous PIN`)
                }
                return true;
            }
            },
            {
                message:`Your Current Balance is $ ${currentBalance}, Enter the Amount you want to Transfer: $`,
                type:"number",
                name:"tansfer_Amount",
                validate:(answer:number)=>{
                    let pansanswer=JSON.stringify(answer)
                    let newans=Number(pansanswer)
                    if(isNaN(newans)||newans>currentBalance){
                        return chalk.rgb(202,15,15)(`Enter a Valid Amount to Transfer!`)
                    }
                    return true;
                }
            }
        ])
        console.log(`Your Amount ${transfer.tansfer_Amount} $ has been transfer to ${transfer.transfer_user}`)
    }
}

async function startAgain() {
    do{
        console.clear()
        await getStarted()
        await askQuestion()
        var restart=await inquirer
        .prompt({
            message:"Do you want to Restart Again, Press 'y' or 'n' ",
            type:"input",
            name:"result"
        })
    }while(restart.result==="y"||restart.result==="Y"||restart.result==="YES"||restart.result==="yes")
}
startAgain()