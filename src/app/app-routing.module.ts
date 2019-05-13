import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParkingsComponent} from './parkings/parkings.component'

const routes: Routes = [
    {
        path: 'parkings',
        component: ParkingsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
