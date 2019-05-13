import { browser, by, element } from 'protractor';

export class ParkingsPage {
    navigateTo() {
        return browser.get(browser.baseUrl) as Promise<any>;
    }

    getTitleText() {
        return element(by.css('app-root h1')).getText() as Promise<string>;
    }

    getParkedVehiclesTable() {
        return element(by.id('parkedVehiclesTable'));
    }

    getVehicleLicensePlateInput() {
        return element(by.id('licensePlate'));
    }

    getVehicleCylinderPowerInput() {
        return element(by.id('cylinderPower'));
    }

    getParkVehicleButton() {
        return element(by.id('parkVehicle'));
    }

    getLeaveParkingVehicleButton() {
        return element(by.id('leaveParking'));
    }

    getParkedVehicleExitButtonByLicensePlate(licensePlate: string) {
        return element(by.id('leftParkingTable' + licensePlate));
    }
}
