#!/usr/bin/env node
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import chalk from "chalk";

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('Word Counter')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

    const sleep=()=>{
        return new Promise((res)=>{
            setTimeout(res,10000)
        })
    }
    async function paraInput() {
        const input=await inquirer.prompt([{
            name:"input",
            message:"Enter a Paragraph to Count?"
        }])
        let value = await input['input']
        return value
    }
    function paraDataOutput(para:string){
        let words= para.split(' ').filter((val)=>val !== '')
        let letter=words.join('')
        return {words:words.length,letter:letter.length}
    }
    while(true){
        const para = await paraInput()
        const {words, letter}= paraDataOutput(para)
        const spinner=createSpinner("Counting..").start()
        await sleep()
        console.log(`\nWords: ${words}`)
        console.log(`Letter: ${letter}`)
        spinner.success({text:"Counting Words And Letter Succesfully!"})

        const input=await inquirer.prompt([{
            name:"Do you want to exit?",
            type:"confirm"
        }])
        let value:boolean=await input['Do you want to exit?']
        if(value){
            break
        }
        console.log(chalk.whiteBright('\n================================================================\n'))
    }
    
