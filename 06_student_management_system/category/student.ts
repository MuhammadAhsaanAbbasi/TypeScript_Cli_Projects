import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { Course , Student, } from "../classes/classes.js";

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}

export async function AddStudent(DetailsInputs: (type: string, name: string) => Promise<string | number>, students: Student[]) {
    const name = await DetailsInputs('', 'Name') as string
    const age = await DetailsInputs('number', 'Age') as number

    let student = new Student(name, age)
    //Spinner
    const spinner = createSpinner('Adding Student').start()
    await sleep()
    students.push(student)
    spinner.success({ text: chalk.greenBright("Student Added Successfully") })
}



export async function ViewStudents(courses:Course[],students:Student[]) {
    if(!students.length){
        console.log("No Students Available!!")
        return
    }
    console.table(students.map((val)=>{
        return{
            Id:val.student_id,
            Name:val.name,
            Age:val.age,
            Balance:`${val.balance}`,
            Courses:val.courses.length?val.courses.map((courses:any)=>courses.name).join(''):"No Courses Enrolled!"
        }
    }))
    const input=await inquirer.prompt([
        {
            name:"input",
            message:"Enter a index number of Student to Assign in Course?",
            type:"number"
        }
    ])
    let index:number=await input['input']
    if(index<=students.length-1&&index>=0){
        if (!courses.length) {
            console.log(chalk.redBright('############ No Course Available ############'))
            return
        }
        const input2=await inquirer.prompt([
            {
                name:"Choices",
                message:"Select Course",
                type:"list",
                choices:courses.map((val)=>{return {name:`${val.name}, (fees: Rs ${val.fees})`, value:val.id}})
            }
        ])
        let Course_id:number=await input2['Choices']
        let course = courses.filter((val)=>val.id===Course_id)[0]
        let student=students.at(index)as Student
        const spinner=createSpinner("Register to Course").start()
        await sleep()
        if(student?.courses.includes(course)){
            spinner.error({ text: chalk.redBright("############ STUDENT ALREADY ENROLLED IN THIS COURSE ############") })
        return
        }if(student?.balance<course.fees){
            spinner.error({ text: chalk.redBright("############ Sorry Your Balance is Low ############") })
            return
        }
        student?.registerdcourse(course)
        student?.addStudentIncourseStudent(course)
        spinner.success({text:`Student Added In Course Successfully and RS: ${course.fees} Fee Minus From Student's Balance`})
    }
}