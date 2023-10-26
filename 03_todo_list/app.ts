#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";


console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('TODO APP')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

const sleep=()=> new Promise((r)=>setTimeout(r,2000))
type Todos={
    text:string,
    id:number,
    completed:boolean,
}

let todos:Todos[]=[{text:"Dummy",id:Math.floor(Math.random()*9999999999),completed:false}]

const Options = async()=>{
    const input=await inquirer.prompt([
        {
            name:'What Do you Want to Do?',
            type:"list",
            choices:[
                {name:"Add Todo", value:"A"},
                {name:"Remove Todo", value:"R"},
                {name:"Display Todo", value:"D"},
            ]
        }
    ])
    let value:string=await input['What Do you Want to Do?']
    return value
}

const AddTodo = async () => {
    let value: string;
    while (true) {

        const input = await inquirer.prompt([
            {
                name: chalk.rgb(255, 148, 140)('Enter TODO')
            }
        ])
        value = await input['\x1B[38;2;255;148;140mEnter TODO\x1B[39m']
        if (value.trim()){
            break
        }
    }
    todos.push({ text: value.trim(), id: Math.floor(Math.random() * 9999999999), completed: false })
    const spinner = createSpinner('Adding Todo').start()
    await sleep()
    spinner.success({ text: chalk.bgRgb(200,148,132).whiteBright("Todo added successfully") })
}

const RemoveTodo = async () =>{
    if(!todos.length){
        console.log(chalk.redBright("No Todo Available"))
        return
    }
    let todo=todos.map((val)=>{return {name:val.text, value:val.id}})
    const input = await inquirer.prompt([
        {
            name: ('Delete TODO'),
            type: "list",
            choices: todo
        }
    ])
    let value: number = await input['Delete TODO']
    todos = todos.filter((val) => val.id !== value)
    const spinner = createSpinner('Deleting Todo').start()
    await sleep()
    spinner.success({text:"Todo Update Successfully!"})
    return value
}

const DisplaySingleTodo = async (todo: Todos) => {
    console.log(chalk.bgBlack.whiteBright(`Todo: ${todo.text}`))
    console.log(chalk.bgBlack.whiteBright(`Status: ${todo.completed ? 'Completed' : 'Not Completed'}`))
    if (!todo.completed) {
        const input = await inquirer.prompt([
            {
                name: ('Do you want to complete it ?'),
                type: "confirm",
            }
        ])
        let value = await input['Do you want to complete it ?']
        if (value) {
            todos = todos.map((val) => {
                if (val.id === todo.id) {
                    val.completed = true
                    return val
                }
                return val
            })
            const spinner = createSpinner('Updating Todo').start()
            await sleep()
            spinner.success({ text: "Todo updated successfully" })
        }
    }

}

const DisplayTodos = async () => {
    if (!todos.length) {
        console.log(chalk.redBright("No Todo Available"))
        return
    }

    let todo = todos.map((val) => {
        return { name: val.text, value: val }
    })
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)('Select TODO'),
            type: "list",
            choices: todo
        }
    ])
    let value = await input['\x1B[38;2;255;255;160mSelect TODO\x1B[39m']
    await DisplaySingleTodo(value)

}


while(true){
    let option = await Options()
    if(option==='A'){
        await AddTodo()
    }
    if(option==='D'){
        await DisplayTodos()
    }
    if(option==='R'){
        await RemoveTodo()
    }
    
    const input = await inquirer.prompt([
        {
            name: chalk.rgb(255, 255, 160)(`Do You Want To Exit?`),
            type: "confirm",
        }
    ])
    let value: boolean = await input['\x1B[38;2;255;255;160mDo You Want To Exit?\x1B[39m'] 
    if (value) {
        break;
    }
    console.log(chalk.whiteBright('\n================================================================\n'))
}

