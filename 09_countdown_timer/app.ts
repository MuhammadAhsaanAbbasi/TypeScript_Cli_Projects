import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('Count Down Timer')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}
// 
async function startTimer(name:string, regex:RegExp) {
    let isdate = name ==='Date'?true:false
    let timer:string
    while(true){
        const input= await inquirer.prompt({
            name:'date_and_time',
            message:`Enter Your ${name}`,
            default: isdate ? '12/23/2024':' 12:00 AM'
        })
        timer=await input['date_and_time']
        if(regex.test(timer)){
            break
        }else{
            console.log("Please Provide The Right Pattern!")
        }
    }
        return timer
}

function countTime(completedTime:string){
        console.log(chalk.bgRgb(255,0,0).whiteBright(` Days | Hours | Minute | Seconds `))
        setInterval(()=>{
        const newDate= (new Date() as unknown) as number
        const myDate=(new Date(completedTime) as unknown) as number
        const initialTime = myDate-newDate
        if(initialTime<=0){
            console.log(chalk.whiteBright(`=======================================================\n`))
            console.log(chalk.redBright.bold('Expired'))
            console.log(chalk.whiteBright(`=======================================================\n`))
            process.exit()
        }
            let sec_count=1000
            let minute_count=sec_count*60
            let hour_count=minute_count*60
            let day_count=hour_count*24
            
            let days= Math.floor(initialTime/day_count)
            let hours= Math.floor((initialTime % day_count)/ hour_count)
            let minute= Math.floor((initialTime % hour_count)/ minute_count)
            let seconds= Math.floor((initialTime % minute_count)/ sec_count)
            process.stdout.clearLine(0)
            process.stdout.cursorTo(0)
            process.stdout.write(` ${days>9? String(days): `0${days}`}   :   ${hours>9? String(hours): `0${hours}`}  :   ${minute>9? String(minute): `0${minute}`}   :   ${seconds>9? String(seconds): `0${seconds}`}`)
            },1000)
}

console.log(chalk.bgRgb(178,97,68).whiteBright(`  Instructions:  `))
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Date Format: ${chalk.bgRgb(35,91,168).whiteBright(' MM/DD/YYYY')} Example: ${chalk.bgRgb(35,91,168).whiteBright(' 02/24/2024 ')}.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Time Format: ${chalk.bgRgb(35,91,168).whiteBright(' Hours[0-12]:Minutes[0-59] PM/AM ')} Example: ${chalk.bgRgb(35,91,168).whiteBright(' 06:10 AM ')}.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Timer Will Be Expired If Time Is Ended.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------`))
console.log(`${chalk.whiteBright('=>')} Press ${chalk.bgRgb(35,91,168).whiteBright(' Ctrl + C ')} To Stop Timer.`)
console.log(chalk.whiteBright(`--------------------------------------------------------------------------\n`))

let timeRegex=/^(0?[0-9]|1[0-2])[:](0?[0-9]|[1-5][0-9])[ ]((a|p)m|(A|P)M)/;
let DateRegex=/^(0?[0-9]|1[012])[\/](0?[0-9]|[1-2][0-9]|3[0-1])[\/]((19|20)\d{2})$/
let date= await startTimer('Date',DateRegex)
let time=await startTimer('Time',timeRegex)
let completedTime=`${date} ${time}`
const spinner= createSpinner('Let Start Your Timer').start()
await sleep()
spinner.success({text:"Timer Start Successfully!"})
countTime(completedTime)