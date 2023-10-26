

class Person {
    constructor(public name: string, public age: number) { }
    
}

export class Course{
    name:string
    id:number=Math.floor(Math.random()*1000)
    timing_to:string
    timing_from:string
    fees:number
    students:Student[]=[]
    instrutor!:Instructor
    constructor(name:string,timing_from:string,timing_to:string,fees:number){
        this.name=name
        this.timing_from=timing_from
        this.timing_to=timing_to
        this.fees=fees
    }
    registerdcourse(student:Student){
        student.balance-=this.fees
        this.students.push(student)
    }
    addStudentIncourseStudent(student:Student){
        student.registerdcourse(this)
    }
    assignCourse(instrutor:Instructor){
        this.instrutor=instrutor
        }
    assignInstructorIncourse(instrutor:Instructor){
        instrutor.assignCourse(this)
    }
}
export class Student extends Person{
    student_id:number=Math.floor(Math.random()*1000)
    courses:Course[]=[]
    balance:number=Math.floor(Math.random()*3000)
    constructor(name:string,age:number){
        super(name,age)
    }
    registerdcourse(course:Course){
        this.courses.push(course)
    }
    addStudentIncourseStudent(course:Course){
        course.registerdcourse(this)
    }
}

export class Instructor extends Person{
    teacher_id:number=Math.floor(Math.random()*1000)
    courses:Course[]=[]
    constructor(name:string,age:number){
        super(name,age)
    }
    assignCourse(course:Course){
        this.courses.push(course)
    }
    assignInstructorIncourse(course:Course){
        course.assignCourse(this)
    }
}