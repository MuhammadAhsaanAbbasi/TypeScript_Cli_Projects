#!/usr/bin/env node
import chalk from "chalk"
import inquirer from "inquirer"
import { createSpinner } from "nanospinner"

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('Currency Converter')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

let ApiLink= "https://v6.exchangerate-api.com/v6/d667be4f4ba73ae2e4903443/latest/PKR"
let fetchData = async(data:any)=>{
    let fetchData=await fetch(data)
    let res= await fetchData.json()
    return res.conversion_rates
}
let data=await fetchData(ApiLink)
let countries=Object.keys(data)

const sleep=()=>{
    return new Promise((rest)=>{
        setTimeout(rest,2000)
    })
}
    async function getstarted() {
    let firstnumber=await inquirer.prompt({
        name:"name",
        type:"list",
        message:chalk.rgb(249, 140, 255)("Converting From"),
        choices:countries,
    })
    let Usermoney=await inquirer.prompt({
        name:"name",
        type:"number",
        message:chalk.rgb(249, 140, 255)(`Enter the Value in ${chalk.greenBright.bold(firstnumber.name)}`),
    })
    let Secondnumber=await inquirer.prompt({
        name:"name",
        type:"list",
        message:chalk.rgb(249, 140, 255)("Converting to"),
        choices:countries,
    })
    let cnv=`https://v6.exchangerate-api.com/v6/d667be4f4ba73ae2e4903443/pair/${firstnumber.name}/${Secondnumber.name}`
    
    let cnvData = async(data:any)=>{
    let cnvData=await fetch(data)
    let res= await cnvData.json()
    return res.conversion_rate
}
let Convertingrates=await cnvData(cnv)


let ConvertedRates = Usermoney.name * Convertingrates
let spinner = createSpinner("Converting").start()
await sleep()
spinner.success({text:"Conversion Complete"})
console.log(chalk.bgBlackBright.white.bold(`Convert From ${firstnumber.name} ${Usermoney.name} = ${ConvertedRates} ${Secondnumber.name}`));
    
}

async function getback() {
    do{
    await getstarted()
    var endcontinue=await inquirer.prompt([
        {
            message:chalk.rgb(255, 255, 160)("Do You Want to Continue:"),
            type:"confirm",
            name:"result"
        }
    ])
    
}while(endcontinue.result==true)
}

getback()


