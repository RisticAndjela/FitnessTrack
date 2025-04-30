export interface Characteristic{
    id : number,
    name: string,
    unit: string;    // "kg", "reps", "s"

}

export interface Rep {
    id:number,
    characteristic_one: Characteristic, // repetitions
    value_one: number,
    characteristic_two?: Characteristic, // weight
    value_two?: number,
    characteristic_three?: Characteristic, // hold in s
    value_three?: number,
}