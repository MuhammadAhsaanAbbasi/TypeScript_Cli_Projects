#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('Adventure Game')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}
class Player{
    name:string
    fuel:number=100
    constructor(name:string){
        this.name=name
    }
    fuelDecrease(){
        let fuel=Math.floor(Math.random()*50)
        return this.fuel=fuel
    }
    fuelIncrease(){
        let fuel= playerlife + 25
        return this.fuel=fuel
    }
}

class Oppenent{
    name:string
    fuel:number=Math.floor(Math.random()*80)
    constructor(name:string){
        this.name=name
    }
    fuelDecrease(){
        let fuel=Math.floor(Math.random()*50)
        return this.fuel=fuel
    }
}


    
let player=await inquirer.prompt({
    name:"input",
    message:"Enter Your Name?",
    type:"input"
})



let p1= new Player(player.input)

let playerlife=p1.fuel;
async function getstarted() {
    let oppenent=await inquirer.prompt({
        name:"select",
        message:"Select Your Oppent",
        type:"list",
        choices:["Skeleton", "Warrior", "Zombie", "Assassin"]
    })
    let p1= new Player(player.input)
let o1= new Oppenent(oppenent.select)
let playerlife=p1.fuel

let oppenentLife=o1.fuel
    do{
        if(oppenent.select=="Skeleton"){
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`Your Health: ${playerlife}`)
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`${oppenent.select}'s Health: ${oppenentLife}`)
            console.log(chalk.whiteBright(`----------------------------`))
        const {choice}:{choice: 'Attack'| 'Drink Portion'|'Run'}=await inquirer.prompt({
            name:"choice",
            type:"rawlist",
            message:"What You Want to do?",
            choices:['Attack','Drink Portion','Run']
        })
        let playerDamage= p1.fuelDecrease()
        let oppenentDamage=o1.fuelDecrease()
        if(choice==="Attack"){
                playerlife-=playerDamage
                oppenentLife-=oppenentDamage
                console.log(`${chalk.redBright('>>>')} You strike the ${o1.name} for ${chalk.redBright(oppenentDamage)} damage`)
                console.log(`${chalk.redBright('>>>')} ${o1.name} damaged you for ${chalk.redBright(playerDamage)}`)

                if(playerlife<=0 && oppenentLife<=0){
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    console.log(chalk.redBright.bold(`${oppenent.select}'s dropped bumb, You both Killed☠️`))
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    break
                }
            else if(playerlife<=0){
                console.log(chalk.blueBright.bold(`------------------------------`))
                console.log(chalk.redBright.bold(`You was defeated by ${oppenent.select}`))
                console.log(chalk.blueBright.bold(`------------------------------`))
                break
            }
            else if(oppenentLife<1){
                console.log(chalk.yellowBright.bold(`------------------------------`))
                console.log(chalk.yellowBright.bold(`${oppenent.select} was defeated!!`))
                console.log(chalk.yellowBright.bold(`Your Health Life is ${playerlife}`))
                console.log(chalk.yellowBright.bold(`Congratulations! ${p1.name} You won!`))
                break
            }
        }
        let FuelIncrease= p1.fuelDecrease()
        if(choice==="Drink Portion"){
            const spinner=createSpinner("healing").start()
            await sleep()
            playerlife+=FuelIncrease // p1.fuelIncrease()
            spinner.success({text:chalk.bold.green(`Your Drink Healkth Porion Your Fuel is ${playerlife}`)})
        }
        else if(choice==="Run"){
            console.log(chalk.redBright(`You Run Away from ${oppenent.select}`))
            break
        }

    }
        if(oppenent.select=="Warrior"){
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`Your Health: ${playerlife}`)
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`${oppenent.select}'s Health: ${oppenentLife}`)
            console.log(chalk.whiteBright(`----------------------------`))
        const {choice}:{choice: 'Attack'| 'Drink Portion'|'Run'}=await inquirer.prompt({
            name:"choice",
            type:"rawlist",
            message:"What You Want to do?",
            choices:['Attack','Drink Portion','Run']
        })
        let playerDamage= p1.fuelDecrease()
        let oppenentDamage=o1.fuelDecrease()
        if(choice==="Attack"){
                playerlife-=playerDamage
                oppenentLife-=oppenentDamage
                console.log(`${chalk.redBright('>>>')} You strike the ${o1.name} for ${chalk.redBright(oppenentDamage)} damage`)
                console.log(`${chalk.redBright('>>>')} ${o1.name} damaged you for ${chalk.redBright(playerDamage)}`)

                if(playerlife<=0 && oppenentLife<=0){
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    console.log(chalk.redBright.bold(`${oppenent.select}'s dropped bumb, You both Killed☠️`))
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    break
                }
            else if(playerlife<=0){
                console.log(chalk.blueBright.bold(`------------------------------`))
                console.log(chalk.redBright.bold(`You was defeated by ${oppenent.select}`))
                console.log(chalk.blueBright.bold(`------------------------------`))
                break
            }
            else if(oppenentLife<1){
                console.log(chalk.yellowBright.bold(`------------------------------`))
                console.log(chalk.yellowBright.bold(`${oppenent.select} was defeated!!`))
                console.log(chalk.yellowBright.bold(`Your Health Life is ${playerlife}`))
                console.log(chalk.yellowBright.bold(`Congratulations! ${p1.name} You won!`))
                break
            }
        }
        let FuelIncrease= p1.fuelDecrease()
        if(choice==="Drink Portion"){
            const spinner=createSpinner("healing").start()
            await sleep()
            playerlife+=FuelIncrease // p1.fuelIncrease()
            spinner.success({text:chalk.bold.green(`Your Drink Healkth Porion Your Fuel is ${playerlife}`)})
        }
        else if(choice==="Run"){
            console.log(chalk.redBright(`You Run Away from ${oppenent.select}`))
            break
        }

    }
        if(oppenent.select=="Zombie"){
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`Your Health: ${playerlife}`)
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`${oppenent.select}'s Health: ${oppenentLife}`)
            console.log(chalk.whiteBright(`----------------------------`))
        const {choice}:{choice: 'Attack'| 'Drink Portion'|'Run'}=await inquirer.prompt({
            name:"choice",
            type:"rawlist",
            message:"What You Want to do?",
            choices:['Attack','Drink Portion','Run']
        })
        let playerDamage= p1.fuelDecrease()
        let oppenentDamage=o1.fuelDecrease()
        if(choice==="Attack"){
                playerlife-=playerDamage
                oppenentLife-=oppenentDamage
                console.log(`${chalk.redBright('>>>')} You strike the ${o1.name} for ${chalk.redBright(oppenentDamage)} damage`)
                console.log(`${chalk.redBright('>>>')} ${o1.name} damaged you for ${chalk.redBright(playerDamage)}`)

                if(playerlife<=0 && oppenentLife<=0){
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    console.log(chalk.redBright.bold(`${oppenent.select}'s dropped bumb, You both Killed☠️`))
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    break
                }
            else if(playerlife<=0){
                console.log(chalk.blueBright.bold(`------------------------------`))
                console.log(chalk.redBright.bold(`You was defeated by ${oppenent.select}`))
                console.log(chalk.blueBright.bold(`------------------------------`))
                break
            }
            else if(oppenentLife<1){
                console.log(chalk.yellowBright.bold(`------------------------------`))
                console.log(chalk.yellowBright.bold(`${oppenent.select} was defeated!!`))
                console.log(chalk.yellowBright.bold(`Your Health Life is ${playerlife}`))
                console.log(chalk.yellowBright.bold(`Congratulations! ${p1.name} You won!`))
                break
            }
        }
        let FuelIncrease= p1.fuelDecrease()
        if(choice==="Drink Portion"){
            const spinner=createSpinner("healing").start()
            await sleep()
            playerlife+=FuelIncrease // p1.fuelIncrease()
            spinner.success({text:chalk.bold.green(`Your Drink Healkth Porion Your Fuel is ${playerlife}`)})
        }
        else if(choice==="Run"){
            console.log(chalk.redBright(`You Run Away from ${oppenent.select}`))
            break
        }

    }
        if(oppenent.select=="Assassin"){
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`Your Health: ${playerlife}`)
            console.log(chalk.whiteBright(`----------------------------`))
            console.log(`${oppenent.select}'s Health: ${oppenentLife}`)
            console.log(chalk.whiteBright(`----------------------------`))
        const {choice}:{choice: 'Attack'| 'Drink Portion'|'Run'}=await inquirer.prompt({
            name:"choice",
            type:"rawlist",
            message:"What You Want to do?",
            choices:['Attack','Drink Portion','Run']
        })
        let playerDamage= p1.fuelDecrease()
        let oppenentDamage=o1.fuelDecrease()
        if(choice==="Attack"){
                playerlife-=playerDamage
                oppenentLife-=oppenentDamage
                console.log(`${chalk.redBright('>>>')} You strike the ${o1.name} for ${chalk.redBright(oppenentDamage)} damage`)
                console.log(`${chalk.redBright('>>>')} ${o1.name} damaged you for ${chalk.redBright(playerDamage)}`)

                if(playerlife<=0 && oppenentLife<=0){
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    console.log(chalk.redBright.bold(`${oppenent.select}'s dropped bumb, You both Killed☠️`))
                    console.log(chalk.blueBright.bold(`------------------------------`))
                    break
                }
            else if(playerlife<=0){
                console.log(chalk.blueBright.bold(`------------------------------`))
                console.log(chalk.redBright.bold(`You was defeated by ${oppenent.select}`))
                console.log(chalk.blueBright.bold(`------------------------------`))
                break
            }
            else if(oppenentLife<1){
                console.log(chalk.yellowBright.bold(`------------------------------`))
                console.log(chalk.yellowBright.bold(`${oppenent.select} was defeated!!`))
                console.log(chalk.yellowBright.bold(`Your Health Life is ${playerlife}`))
                console.log(chalk.yellowBright.bold(`Congratulations! ${p1.name} You won!`))
                break
            }
        }
        let FuelIncrease= p1.fuelDecrease()
        if(choice==="Drink Portion"){
            const spinner=createSpinner("healing").start()
            await sleep()
            playerlife+=FuelIncrease // p1.fuelIncrease()
            spinner.success({text:chalk.bold.green(`Your Drink Healkth Porion Your Fuel is ${playerlife}`)})
        }
        else if(choice==="Run"){
            console.log(chalk.redBright(`You Run Away from ${oppenent.select}`))
            break
        }

    }
    
    
    }while(true)
}
async function endContinue() {
    while(true){
    let val= await getstarted()
const { choice }: { choice: 'Continue Fighting' | 'Exit' } = await inquirer.prompt([{
    name: 'choice',
    message: 'what would you like to do?',
    type: 'rawlist',
    choices: ['Continue Fighting', 'Exit']
}])
if (choice === 'Continue Fighting') {
    continue
}
break
    }
    console.log(chalk.blueBright(`\n\n============================================================`))
    console.log(chalk.blueBright(`                 Thanks For Playing !!!!!!!                 `))
    console.log(chalk.blueBright(`============================================================`))
}
await endContinue()