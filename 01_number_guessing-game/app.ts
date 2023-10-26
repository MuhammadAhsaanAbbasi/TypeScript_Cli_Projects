#!/usr/bin/env node
import inquirer from "inquirer";
import chalk  from "chalk";
import chalkAnimation from "chalk-animation"


const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,2000)
    })
}
async function getStarted() {
    let rainbowTitle = chalkAnimation.rainbow("Lets Get Started")
    await sleep()
    rainbowTitle.stop()
}
await getStarted()

let Playerlife=0;
async function askQuestion() {
    var randomNumber=Math.floor(Math.random()*20 + 1)
    do{
        Playerlife++
        console.log(chalk.rgb(238,164,127)(`PlayerLife has left: ${5-Playerlife}`))
        var user_number= await inquirer
        .prompt([
            {
                message:chalk.rgb(0,83,156)("Select a Random Number btw 1 to 20"),
                type:'number',
                name:"guess_number",
                validate:(answers:number)=>{
                    if(isNaN (answers)){
                        return (`Enter a Valid Number`)
                    }
                    return true;
                }
            }
        ])
        if(user_number.guess_number===randomNumber){
            console.log(chalk.green(`Congratulation! you Guess a ${user_number.guess_number} Number.`))
        }
        else if(user_number.guess_number<randomNumber){
            console.log(chalk.red(`Your ${user_number.guess_number} Number is too Low Please! Try Again.`))
        }
        if(user_number.guess_number>randomNumber){
            console.log(chalk.red(`Your ${user_number.guess_number} Number is too High Please! Try Again.`))
        }
    }while(Playerlife<5 && (randomNumber !== user_number.guess_number))
    if(Playerlife>=5){
        console.log(chalk.rgb(183,44,44)("Game Over!"))
    }
}

async function projectRestart() {
    do{
        Playerlife=0;
        await askQuestion()
        var rContinue= await inquirer
        .prompt({
            message:chalk.rgb(255,165,0)("Do You Want to Restart the Game. Press 'y' or 'n' "),
            type:"input",
            name:"result"
        })
    }while(rContinue.result==="y"|| rContinue.result==="Y"|| rContinue.result==="YES"|| rContinue.result==="yes")
}

projectRestart()