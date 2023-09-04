import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  AddEmployee(data: any) {
    return this.http.post<any>(`employee`, data);
  }
  GetEmployee() {
    return this.http.get(`employee`);
  }
  DeleteEmployee(id: number) {
    return this.http.delete(`employee/` + id);
  }

  UpdateEmployee(id: number, updatedData: any) {
    return this.http.put(`employee/${id}`, updatedData);
  }
}
