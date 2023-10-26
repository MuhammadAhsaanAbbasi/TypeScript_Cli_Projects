import { Person } from "./person.js";

export class Student extends Person{
    private _name:string
    constructor(){
        super()
        this._name=""
    }
    get name(){
        return this._name
    }
    set name(name){
        this._name=name
    }
}