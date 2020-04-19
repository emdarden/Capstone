import { Day } from './day.model';

export class Trip {
    public _id: string

    constructor(
    public Img: string,
    public Name: string,
    public Days: Day[],
    ){}
}
