import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { Course , Student, Instructor } from "../classes/classes.js";


const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}
export  async function AddCourse(DetailInput:(type:string,name:string)=>Promise<string|number>,courses:Course[]) {
    const const_name= await DetailInput('',"Name")as string
    const const_timing_from = await DetailInput('',"Timing_From")as string
    const const_timing_to= await DetailInput('',"Timing_to")as string
    const const_fees= await DetailInput('number',"Fees")as number
    let course=new Course(const_name,const_timing_from,const_timing_to,const_fees)
    //spineer
    const Spinner = createSpinner("Adding Course!").start()
    await sleep()
    courses.push(course)
    Spinner.success({text:"Course Adding Succesfully!"})
}

export async function ViewCourse(courses:Course[],students:Student[],Instructor:Instructor[]) {
    if(!courses.length){
        console.log("No Courses Available!")
        return
    }
    console.table(courses.map((val)=>{
        return{
            Name:val.name,
            Timing:`${val.timing_from} To ${val.timing_to}`,
            Student:val.students.length?val.students.map((student:any)=>student.name).join(''):"No Students Enrolled",
            Teacher:val.instrutor?val.instrutor.name:"No Teacher Assigned",
        }
    }))
    const input=await inquirer.prompt([
        {
            name:"Input",
            message:"Enter a Index number Of Course for More Options?",
            type:"number",
        }
    ])
    const index:number=await input['Input']
    if(index<=courses.length-1 && index>=0){
        let course= courses.at(index)as Course
        const indexoption = await inquirer.prompt([
            {
                name:"choice",
                message:"Select Option",
                type:"list",
                choices:["Add Student","Assign Teacher","Exit"]
            }
        ])
        let value=await indexoption['choice']
        if(value==="Exit"){
            return
        }
        if(value==="Add Student"){
            const input2=await inquirer.prompt([
                {
                    name:"student",
                    message:"Enter a Student id to Register this Course",
                    type:"number"
                }
            ])
            let value=await input2['student']
            let student = students.find((val)=>val.student_id===value)
            const spinner= createSpinner("Adding Student").start()
            await sleep()
            if(!student){
                spinner.error({text:"############ No Student With this Roll No ############"})
                return
            }
            if(student.courses.includes(course)){
                spinner.error({text:"############ Student Alerady Enrolled ############"})
                return
            }
            if (student.balance < course.fees) {
                spinner.error({ text: chalk.redBright("############ STUDENT DOESN'T HAVE ENOUGH BALANCE TO PAY FEE ############") })
                return
            }
            course?.registerdcourse(student)
            course.addStudentIncourseStudent(student)
            spinner.success({text:`Student Added In Course Successfully and RS: ${course.fees} Fee Minus From Student's Balance`})
            return
        }
        if(value==="Assign Teacher"){
            const input3= await inquirer.prompt([
                {
                    name:"choice",
                    message:"Enter a Teacher id to Assign in this Course",
                    type:"number"
                }
            ])
            let value=await input3['choice']
            const instrutor=Instructor.find((val)=>val.teacher_id===value)
            const spinner=createSpinner("Assign Teacher").start()
            await sleep()
            if(!instrutor){
                spinner.error({text:"############ No Teacher With this Id No ############"})
                return
            }
            if(instrutor.courses.includes(course)){
                spinner.error({text:"############ Teacher Already Assigned ############"})
            }
            course?.assignCourse(instrutor)
            course.assignInstructorIncourse(instrutor)
            spinner.success({text:`${instrutor.name} has been Assign for ${course.name}`})
            return
        }
    }
}