import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicResourcesService {
  private _medicUrl = 'https://sandbox-healthservice.priaid.ch';
  private _token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImNvbGxpbnNjb3JuZWxpdXM5QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTg3MiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyMS0xMS0wNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNjM2Mzg2MTA3LCJuYmYiOjE2MzYzNzg5MDd9.VY8MP9ScMcHWCL1tmy_V2XuR5DNLDkICV8rCmMRANSU';
  constructor(private http: HttpClient) {}
  // login() {
  //   let uri = 'https://sandbox-authservice.priaid.ch/login';
  //   let api_key = 'collinscornelius9@gmail.com';
  //   let secret_key = 'Cornelius9@apimedic';
  //   let httpHeaders = new HttpHeaders({
  //     'content-type': 'application/json',
  //     api_key: `${api_key}`,
  //     secret_key: `${secret_key}`,
  //   });
  //   const httpParams = new HttpParams({
  //     fromObject: {
  //       token: this._token,
  //       language: 'en-gb',
  //       api_key: `${api_key}`,
  //       secret_key: `${secret_key}`,
  //     },
  //   });
  //   return this.http.post<any>(this._medicUrl, {
  //     headers: httpHeaders,
  //   });
  // }
  createRecord(data: any) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.post('http://localhost:3002/create-record', data, {
      headers: httpHeaders,
    });
  }
  getRecords() {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.get('http://localhost:3002/get-records', {
      headers: httpHeaders,
    });
  }
  getSymptoms(symptoms: Number) {
    let _sublink = 'symptoms';
    let _symptoms;
    let withSymptoms = false;
    if (symptoms == 0) {
      withSymptoms = true;
    }
    const httpParams = new HttpParams({
      fromObject: {
        token: this._token,
        language: 'en-gb',
        _symptoms: `${withSymptoms}: [${_symptoms}] ? ''`,
      },
    });
    return this.http.get<any>(this._medicUrl + '/' + _sublink, {
      params: httpParams,
    });
  }
  getDiagnosis(item: number) {
    let _sublink = 'diagnosis';
    let gender = 'male';
    let year_of_birth = 1988;
    let _symptoms = [item];
    const httpParams = new HttpParams({
      fromObject: {
        token: this._token,
        language: 'en-gb',
        symptoms: JSON.stringify(_symptoms),
        gender: `${gender}`,
        year_of_birth: `${year_of_birth}`,
      },
    });
    return this.http.get<any>(this._medicUrl + '/' + _sublink, {
      params: httpParams,
    });
  }
}
