import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ParkedVehicle } from '../model/parkedVehicle';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from '../model/vehicle';

@Component({
    selector: 'app-parkings',
    templateUrl: './parkings.component.html',
    styleUrls: ['./parkings.component.scss']
})
export class ParkingsComponent implements OnInit {

    // attributes
    licensePlate: string;
    cylinderPower: number;

    vehicleForm: FormGroup;
    displayedColumns: string[] = ['licensePlate', 'vehicleType', 'checkinDate', 'actions'];
    data: ParkedVehicle[] = [];
    trm: string;


    constructor(private api: ApiService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

    parkVehicle(form: NgForm) {
        if (this.vehicleForm.valid) {
            this.api.createParking(form)
                .subscribe(res => {
                    this.loadParkings();
                    this.vehicleForm.reset();
                }, (err) => {
                    this.toastrService.error(err.error.message, 'Error');
                });
        }

    }

    leaveParkingTable(tableElement: ParkedVehicle) {
        let vehicleToLeave = new Vehicle();
        vehicleToLeave.licensePlate = tableElement.licensePlate;
        vehicleToLeave.type = tableElement.vehicleType;
        this.leaveParking(vehicleToLeave);
    }

    leaveParking(vehicle) {
        this.api.leaveParking(vehicle)
            .subscribe(res => {
                this.loadParkings();
                this.vehicleForm.reset();
            }, (err) => {
                this.toastrService.error(err.error.message, 'Error');
            });
    }

    ngOnInit() {
        this.vehicleForm = this.formBuilder.group({
            licensePlate: [null, [Validators.required, Validators.pattern('^[A-Z]{3}[0-9]{2}([0-9]|[A-Z])$')]],
            cylinderPower: [null, Validators.required]
        });
        this.loadParkings();
        this.getTRM();
    }

    loadParkings() {
        this.api.getParkings().subscribe(res => {
            this.data = res;
        }, err => {
            this.toastrService.error(err.error.message, 'Error');
        });
    }

    getTRM() {
        this.api.getTRM().subscribe(res => {
            this.trm = res;
        }, err => {
            this.toastrService.error(err.error.message, 'Error');
        });
    }

    getVehicle(plate: string) {
        if (plate.length === 6) {
            this.api.getVehicle(plate).subscribe(res => {
                this.vehicleForm.get('cylinderPower').setValue(res.cylinderPower != null ? Number(res.cylinderPower) : null);
            });
        }
    }

}
