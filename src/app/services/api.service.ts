import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ParkedVehicle } from '../model/parkedVehicle';
import { Parking } from '../model/parking';
import { Vehicle } from '../model/vehicle';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' })
};
const apiUrl = 'http://localhost:8080/parking';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getParkings(): Observable<ParkedVehicle[]> {
        const url = apiUrl + '/getVehicles';
        return this.http.get<ParkedVehicle[]>(url)
            .pipe(
                tap(parkings => console.log('retrieved parkings')),
                catchError(this.handleError<any>('getParkings')
                ));

    }

    createParking(vehicle): Observable<Parking> {
        const url = apiUrl + '/create';
        return this.http.post<Parking>(url, vehicle, httpOptions)
            .pipe(
                tap((parking: Parking) => console.log('parking created ${parking.id}')),
                catchError(this.handleError<any>('createParking')
                ));
    }

    leaveParking(vehicle): Observable<Parking> {
        const url = apiUrl + '/leave';
        return this.http.put<Parking>(url, vehicle, httpOptions)
            .pipe(
                tap((parking: Parking) => console.log('parking left ${parking.id}')),
                catchError(this.handleError<any>('leaveParking')
                ));
    }

    getTRM(): Observable<string> {
        const url = apiUrl + '/getTRM';
        return this.http.get<ParkedVehicle[]>(url)
            .pipe(
                tap(trm => console.log('retrieved trm')),
                catchError(this.handleError<any>('getParkings')
                ));

    }

    getVehicle(licensePlate: string): Observable<Vehicle> {
        const url = apiUrl + '/vehicle/get/' + licensePlate;
        return this.http.get<Vehicle>(url)
            .pipe(
                tap(trm => console.log('retrieved trm')),
                catchError(this.handleError<any>('getParkings')
                ));

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return throwError(error);
        };
    }


}