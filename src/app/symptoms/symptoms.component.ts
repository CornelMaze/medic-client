import { Component, OnInit } from '@angular/core';
import { MedicResourcesService } from '../services/medic-resources.service';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css'],
})
export class SymptomsComponent implements OnInit {
  symptomsArray: any = [];
  filteredData: any = [];
  symptoms = '';
  patientName = '';
  status = '';
  data: [] = [];
  message: string;
  newUser = false;
  tempRecord: {
    Issue: {
      ID: number;
      Name: string;
      Accuracy: number;
      Icd: string;
      IcdName: string;
      ProfName: string;
      Ranking: number;
    };
    Specialisation: {
      ID: number;
      Name: string;
      SpecialistID: number;
    }[];
  }[];
  diagnosis: any = [];
  patientRecord: any = [];
  trackRecord: any = [];
  result: { ID: number; Name: string };
  display: boolean = false;
  constructor(private medicService: MedicResourcesService) {}

  ngOnInit(): void {
    this.initializeSymptoms();
  }
  capitalizeFirstLetter(symptoms: string) {
    return symptoms.charAt(0).toUpperCase() + symptoms.slice(1);
  }
  initializeSymptoms() {
    this.medicService.getSymptoms(0).subscribe((data) => {
      // console.log(data);
      if (data.error == 'Invalid token') {
        // console.log('Token has expired');
      }
      this.symptomsArray = data;
      // console.log(this.symptomsArray);
    });
  }
  getSymptoms() {
    // this.filteredData = [];
    this.trackRecord = [];
    this.tempRecord = [];
    this.patientRecord = [];
    this.symptoms = this.capitalizeFirstLetter(this.symptoms);
    // console.log(this.symptoms);
    // this.searchData(this.symptoms);
    if (this.filteredData.length < 1) {
      this.message = 'No diagnosis Found';
      this.newUser = true;
      setTimeout(() => {
        this.newUser = false;
      }, 3000);
      return false;
    }
    // console.log(this.filteredData);
    // console.log(this.filteredData[0].ID);
    this.medicService
      .getDiagnosis(this.filteredData[0].ID)
      .subscribe((data) => {
        // console.log(data);
        // console.log(this.symptoms);
        this.result = data.find(
          (item: { ID: Number; Name: String }) => item.Name == this.symptoms
        );
        this.data = data;
        // console.log(this.result);
        this.display = true;
        this.filteredData = [];
        this.diagnosis = data;
        if (data.length < 1) {
          this.message = 'No diagnosis Found';
          this.newUser = true;
          setTimeout(() => {
            this.newUser = false;
          }, 3000);
        }
        // console.log(this.diagnosis);
      });
    this.display = true;
  }
  searchData(tip: string) {
    // console.log(this.symptomsArray);
    // console.log(tip.trim());
    this.filteredData = this.symptomsArray.filter(
      (item: { ID: number; Name: string }) => {
        return item.Name.toLowerCase().includes(tip.toLowerCase().trim());
      }
    );
    // console.log(this.filteredData);
  }
  addDiagnosis(newRecord: HTMLInputElement) {
    // console.log(newRecord);
    // console.log(newRecord.textContent);
    // console.log(this.diagnosis);

    this.tempRecord = this.diagnosis.filter((item: any) => {
      return item.Issue.ID == newRecord.textContent;
    });
    // console.log(this.tempRecord);
    let newList = true;
    if (this.trackRecord.length > 0) {
      newList = this.trackRecord.find((item: Number) => {
        // console.log('item', item);
        // console.log('newrecord', Number(newRecord.textContent));
        return item == Number(newRecord.textContent);
      });
    } else {
      newList = false;
    }
    if (newList == undefined) {
      newList = false;
    }
    // console.log('newList is ', newList);
    if (!newList) {
      this.trackRecord.push(Number(newRecord.textContent));
      this.patientRecord.push(this.tempRecord[0]);
    } else {
      this.trackRecord = this.trackRecord.filter((item: any) => {
        return item != Number(newRecord.textContent);
      });
      this.patientRecord = this.patientRecord.filter((item: any) => {
        return item.Issue.ID != newRecord.textContent;
      });
    }
    // console.log(this.trackRecord);
    // console.log(this.tempRecord);
    // console.log(this.patientRecord);
  }
  getValue(tipValue: HTMLSpanElement) {
    // console.log(tipValue.textContent);
    this.symptoms = tipValue.textContent?.trim() || '';
    let term = this.capitalizeFirstLetter(this.symptoms);
    // console.log(term);

    this.filteredData = this.symptomsArray.filter(
      (item: { ID: number; Name: string }) => item.Name == term
    );
    // this.filteredData = [];
    // console.log(this.symptoms);
    // console.log(this.filteredData);
  }
  getDiagnosis(item: { ID: number; Name: string }) {
    // this.filteredData = [];
    // console.log('button clicked');
    this.medicService.getDiagnosis(item.ID).subscribe((data) => {
      // console.log(data);
      this.data = data;
      this.diagnosis = this.data;
      if (data.length < 1) {
        this.message = 'No diagnosis Found';
        this.newUser = true;
        setTimeout(() => {
          this.newUser = false;
        }, 3000);
      }
      this.display = true;
    });
  }
  createRecord() {
    // this.patientName = patientName.textContent || '';
    // this.status = status.id || '';
    let postBody = [];
    postBody.push({ diagnosis: JSON.stringify(this.patientRecord) });
    postBody.push({ status: this.status });
    postBody.push({ name: this.patientName });
    // console.log(postBody);

    this.medicService.createRecord(postBody).subscribe((data: any) => {
      // console.log(data);
      if (data.success == true) {
        this.message = 'User Created Successfully';
        this.newUser = true;
        setTimeout(() => {
          this.newUser = false;
        }, 3000);
      }
    });
  }
  getPatientList() {
    // console.log('get patient list');

    this.medicService.getRecords().subscribe((data: any) => {
      // console.log(data);
    });
  }
}
