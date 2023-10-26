export class Person{
    private Personality:string;
    constructor(){
        this.Personality="Mystery"
    }
    askQuestion(answer:number){
        if(answer==1){
            this.Personality="Extrovert"
        }else if(answer==2){
            this.Personality="Introvert"
        }else{
            this.Personality="Mystery"
        }
    }
    getPersonality(){
        return this.Personality
    }
}