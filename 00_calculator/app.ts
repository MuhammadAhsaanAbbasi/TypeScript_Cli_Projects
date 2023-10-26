#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation"

class Data{
    firstNumber:number;
    SecondNumber:number;
    constructor(a:number, b:number){
        this.firstNumber=a
        this.SecondNumber=b
    }
    add(num:number ,num2:number){
        this.firstNumber=num,this.SecondNumber=num2
        return this.firstNumber+this.SecondNumber
    }
    sub(num:number ,num2:number){
        this.firstNumber=num,this.SecondNumber=num2
        return this.firstNumber-this.SecondNumber
    }
    multiply(num:number ,num2:number){
        this.firstNumber=num,this.SecondNumber=num2
        return this.firstNumber*this.SecondNumber
    }
    divide(num:number ,num2:number){
        this.firstNumber=num,this.SecondNumber=num2
        return this.firstNumber/this.SecondNumber
    }
}

const data=new Data(0,0)
const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res ,2000)
})
}

async function getStarted() {
    let Animation=chalkAnimation.rainbow("Lets Gets Calculated")
    await sleep()
    Animation.stop()
    console.log(chalk.blue(`
     _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|\n`))
}
// await getStarted()

const askQuestion = async()=> {
    const answer=await inquirer.prompt([
        {
            name:"Options",
            message:chalk.red("Which Operator you want to perform?"),
            type:"list",
            choices:["Addition","Subtraction","Multiplication","Division"]      
        },
        {
            name:"value1",
            message:chalk.blue("Enter Your First Value"),
            type:"number"        
        },
        {
            name:"value2",
            message:chalk.blue("Enter Your Second Value"),
            type:"number"        
        }
    ])
    let result=0
    if(answer.Options==="Addition"){
        result= data.add(answer.value1,answer.value2)
        console.log(chalk.green(`Addition: ${answer.value1} + ${answer.value2} = ${result}`))
    if(answer.Options==="Subtraction"){
        result= data.sub(answer.value1,answer.value2)
        console.log(chalk.green(`Subtraction: ${answer.value1} - ${answer.value2} = ${result}`))
    }
    if(answer.Options==="Multiplication"){
        result= data.multiply(answer.value1,answer.value2)
        console.log(chalk.green(`Multiplication: ${answer.value1} * ${answer.value2} = ${result}`))
    }
    if(answer.Options==="Division"){
        result= data.divide(answer.value1,answer.value2)
        console.log(chalk.green(`Division: ${answer.value1} / ${answer.value2} = ${result}`))
    }
}
}

async function endContinue() {
    do{
        await getStarted()
        await askQuestion()
        var input=await inquirer.prompt([
            {
                name:"result",
                message:"Do you want to Continue?",
                type:"confirm",
            }
        ])
    }while(input.result===true)
}
await endContinue()