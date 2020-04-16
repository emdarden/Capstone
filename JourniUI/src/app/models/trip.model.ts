import { Place } from './place.model';

export class Trip {
    constructor(
    public Img: string,
    public Name: string,
    public Places: Place[],
    ){}
}
