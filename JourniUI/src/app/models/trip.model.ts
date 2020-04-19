import { Day } from './day.model';

export class Trip {
    constructor(
    public Img: string,
    public Name: string,
    public Days: Day[],
    ){}
}
