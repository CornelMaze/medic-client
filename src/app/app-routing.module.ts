import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { SymptomsComponent } from './symptoms/symptoms.component';

const routes: Routes = [
  { path: '', redirectTo: 'symptoms', pathMatch: 'full' },
  { path: 'symptoms', component: SymptomsComponent },
  { path: 'list', component: PatientListComponent },
  { path: '**', redirectTo: 'symptoms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
