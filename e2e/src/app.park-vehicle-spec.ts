import { ParkingsPage } from './app.parkings';
import { browser, logging, by } from 'protractor';

describe('Prueba funcional para crear un nuevo parqueo', () => {
    let page: ParkingsPage;
    const licensePlate = 'PLR082';

    beforeEach(() => {
        page = new ParkingsPage();
    });

    it('Debe mostrar la tabla de elementos parqueados', () => {
        page.navigateTo();
        expect(page.getParkedVehiclesTable().all(by.tagName('tr')).count()).toBe(1);
    });

    it('Escribe los elementos del vehiculo a parquear y presiona el boton guardar', () => {
        page.getVehicleLicensePlateInput().sendKeys(licensePlate);
        page.getVehicleCylinderPowerInput().sendKeys(1400);

        page.getParkVehicleButton().click();

        expect(page.getParkedVehiclesTable().all(by.tagName('tr')).count()).toBe(2);
    });

    it('Escribe la placa del vehiculo y presiona el boton salir', () => {
        page.getVehicleLicensePlateInput().sendKeys(licensePlate);
        
        page.getLeaveParkingVehicleButton().click();

        expect(page.getParkedVehiclesTable().all(by.tagName('tr')).count()).toBe(1);
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
