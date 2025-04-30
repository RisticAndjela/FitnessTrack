export interface WeightTrack {
    id:number;
    date: Date;
    weight: number; // in kg
}
  
export interface Trainee {
    id: number;
    first_name: string;
    last_name: string;
    weight?: WeightTrack[]; 
    current_height?: number; // in cm
}
