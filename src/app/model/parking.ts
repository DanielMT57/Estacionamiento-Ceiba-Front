import { Vehicle } from './vehicle';

export class Parking {

    id: number;
    inDatetime: Date;
    outDatetime: Date;
    fare: number;
    totalTime: string;
    vehicle: Vehicle;
}
