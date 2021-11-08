import { Component, OnInit } from '@angular/core';
import { MedicResourcesService } from '../services/medic-resources.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  constructor(private medicService: MedicResourcesService) {}
  records: any = [];
  patientList: any;
  ngOnInit(): void {
    this.medicService.getRecords().subscribe((data: any) => {
      this.records = data.data;
      this.patientList = this.records.map((item: any) => {
        let diagnosis = JSON.parse(item.diagnosis);
        return { ...item, diagnosis };
      });
      console.log(this.patientList);
    });
  }
}
