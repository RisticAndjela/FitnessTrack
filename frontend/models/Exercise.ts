import { Rep } from "./Rep"

export interface ExerciseType{
    id:number,
    name:string
}
export interface Exercise {
    id:number,
    type: ExerciseType,
    reps: Rep[]
}