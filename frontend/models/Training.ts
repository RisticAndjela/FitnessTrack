import { Exercise } from "./Exercise";

export interface TrainingCategory{
    id:number,
    name:string
}

export interface Training {
    id:number,
    name: string,    
    date: Date,
    category: TrainingCategory;
    exercises: Exercise[];
  }