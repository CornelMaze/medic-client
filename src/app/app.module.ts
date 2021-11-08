import { MedicResourcesService } from './services/medic-resources.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from './patient-list/patient-list.component';
import { SymptomsComponent } from './symptoms/symptoms.component';

@NgModule({
  declarations: [AppComponent, PatientListComponent, SymptomsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MedicResourcesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
