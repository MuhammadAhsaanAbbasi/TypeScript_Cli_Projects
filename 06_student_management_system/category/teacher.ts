import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { Course , Instructor, } from "../classes/classes.js";

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}

export async function AddingInstructor(DetailInput:(type:string,name:string)=>Promise<string|number>,instrutor:Instructor[]) {
    const name=await DetailInput('',"Name")as string
    const age=await DetailInput('',"Age")as number
    let instrutors=new Instructor(name,age)
    const spinner=createSpinner("Adding Teacher").start()
    instrutor.push(instrutors)
    await sleep()
    spinner.success({text:"Your Data is Registerd!"})
}

export async function AssignInstructor(course:Course[],instrutor:Instructor[]){
    if(!instrutor.length){
        console.log("No Instructor Available!!")
        return 
    }
    console.table(instrutor.map((val)=>{
        return{
            Id:val.teacher_id,
            Name:val.name,
            Age:val.age,
            Courses:val.courses.length?val.courses.map((instrutor:any)=>instrutor.name).join(''):"No Course Assign"
        }
    }))
    const input=await inquirer.prompt([
        {
            name:'input',
            message:"Enter a index a number to Assign Instructor in Course?",
            type:"number"
        }
    ])
    let index:number=await input['input']
    if(index<=instrutor.length-1&&index>=0){
        if (!course.length) {
            console.log(chalk.redBright('############ NO COURSE AVAILABLE ############'))
            return
        }
        const input=await inquirer.prompt([
            {
                name:"choices",
                message:"Select Course?",
                type:"list",
                choices:course.map((val)=>{return{name:val.name,value:val.id}})
            }
        ])
        let Course_id:number=await input['choices']
        let courses=course.filter((val)=>val.id===Course_id)[0]
        let instrutors = instrutor.at(index)
        const spinner= createSpinner("Assigning").start()
        await sleep()
        if(instrutors?.courses.includes(courses)){
            spinner.error({ text: chalk.redBright("############ STUDENT ALREADY ENROLLED IN THIS COURSE ############")})
            return
        }
        instrutors?.assignCourse(courses)
        instrutors?.assignInstructorIncourse(courses)
        spinner.success({text:`${instrutors?.name} has been assigned for ${courses.name}`})
    }
}
