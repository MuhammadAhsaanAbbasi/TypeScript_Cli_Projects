import inquirer from "inquirer";
import { Student } from "./student.js";
import chalk from "chalk";

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('OOPs')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

const {input}:{input:number}=await inquirer.prompt({
    name:'input',
    message:'Type 1 if you talk to other and Type 2 if you would rather it to yourself',
    type:"number",
})
const MyPerson= new Student()
MyPerson.askQuestion(input)
console.log(`You are: ${MyPerson.getPersonality()}`)

const {name}:{name:string}=await inquirer.prompt({
    name:'name',
    message:'Enter Your Name?',
    type:"input",
})

MyPerson.name=name
console.log(`Your Name is: ${MyPerson.name} and your Personality Type is ${MyPerson.getPersonality()}`)
