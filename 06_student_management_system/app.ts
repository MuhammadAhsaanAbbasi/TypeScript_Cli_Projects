#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { Course , Student, Instructor  } from "./classes/classes.js"
import { AddCourse ,ViewCourse } from "./category/course.js";
import { AddStudent,ViewStudents } from "./category/student.js";
import { AddingInstructor,AssignInstructor } from "./category/teacher.js";

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('Student Management System')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));


let course:Course[]=[]
let student:Student[]=[]
let instructor:Instructor[]=[]

const DetailsInput=async (type:string,name:string)=>{
    let value:string|number
    while(true){
        const input=await inquirer.prompt([
            {
                name:"input",
                message:`Enter ${name}`,
                type:type
            }
        ])
        value=await input['input']
        if(value){
            break
        }
    }
    return value
}

async function IndividualDetails(val:string,...options:string[]) {
    const input=await inquirer.prompt([
        {
            name:'input',
            message:`${val} Options`,
            type:"rawlist",
            choices:options
        }
    ])
    let value=await input['input']
    return value
}

async function makeChoices() {
    const input = await inquirer.prompt([
        {
            name:'input',
            message:"Select Options",
            type:"rawlist",
            choices:['Student',"Instructor","Courses"]
        }
    ])
    let value=await input['input']
    // return value
    if(value==="Student"){
        const choice = await IndividualDetails("Student","Add Student","View Student")
        if(choice==="Add Student"){
            await AddStudent(DetailsInput,student)
        }
        if(choice==="View Student"){
            await ViewStudents(course,student)
        }
    }
    if(value==="Instructor"){
        const choice = await IndividualDetails("Instructor","Add Instructor","Assign Instructor")
        if(choice==="Add Instructor"){
            await AddingInstructor(DetailsInput,instructor)
        }
        if(choice==="Assign Instructor"){
            await AssignInstructor(course,instructor)
        }
    }
    if(value==="Courses"){
        const choice = await IndividualDetails("Courses","Add Course","View Courses")
        if(choice==="Add Course"){
            await AddCourse(DetailsInput,course)
        }
        if(choice==="View Courses"){
            await ViewCourse(course,student,instructor)
        }
    }
}


while(true){
    let choices = await makeChoices()
    const input=await inquirer.prompt([
        {
            name:'Do you Want to Exit?',
            type:"confirm",
            default:false
        }
    ])
    let value:boolean=await input['Do you Want to Exit?']
    if(value){
        break
    }
    console.log(chalk.whiteBright('\n================================================================\n'))
}