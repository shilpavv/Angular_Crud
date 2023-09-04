import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ApiService } from '../service/api.service';
import { SharedComponent } from '../shared/conformModal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeList: any;
  employeeForm: any;
  isDeleting: boolean = false;
  constructor(private modalService: NgbModal, private apiService: ApiService) {}
  // Fetch employee data when the component initialize
  ngOnInit(): void {
    this.fetchdata();
  }
  // Open the modal to add or update an employee
  openModal(id?: any) {
    const openModal = this.modalService.open(ModalComponent);
    // Set the id and employeeList property of the modal componentInstance
    openModal.componentInstance.id = id;
    openModal.componentInstance.employeeList = this.employeeList;
    // Find the employee with the given id from the employeeList
    let currentEmployee = this.employeeList.find((e: any) => e.id === id);
    console.log(currentEmployee);
    // If  currentEmployee is found then assign to the currentEmployee property of the modalcomponent
    if (currentEmployee) {
      openModal.componentInstance.currentEmployee = currentEmployee;
    }
  }
  private fetchdata() {
    this.apiService.GetEmployee().subscribe((value) => {
      console.log('object', value);
      this.employeeList = value;
    });
  }
  //Delete the Employee
  deleteEmployee(employee: any) {
    //show the SharedComponent
    const deleteModal = this.modalService.open(SharedComponent);
    // set the action message
    deleteModal.componentInstance.actionMessage = 'delete';
    deleteModal.componentInstance.employee = employee.name;
    deleteModal.result.then((result) => {
      // check if the user confirmed the deletion
      if (result === true) {
        this.isDeleting = true; // Show the loader
        // call the ApiService
        this.apiService.DeleteEmployee(employee.id).subscribe(() => {
          console.log('Deleted', employee.id);
          // remove the deleted employee.
          this.employeeList = this.employeeList.filter(
            (e: any) => e.id !== employee.id
          );
          // Display for 3 sec
          setTimeout(() => {
            this.isDeleting = false; // Hide the loader
          }, 3000); 
        });
      } else {
        console.log('Deletion canceled');
      }
    });
  }
  // openEditModal(employee: Employee) {
  //   this.selectedEmployee = employee;
  //   this.employeeForm.patchValue({
  //     name: employee.name,
  //     age: employee.age,
  //     dob: employee.dob,
  //     email: employee.email,
  //     mob: employee.mob,
  //     gender: employee.gender,
  //     department: employee.department,
  //   });
  //   const EditModal = this.modalService.open(ModalComponent);
  //   EditModal.componentInstance.employeeForm = this.employeeForm;
  //   EditModal.componentInstance.selectedEmployee = this.selectedEmployee;
  //   EditModal.componentInstance.result.subscribe((modalResult: any) => {
  //     if (this.selectedEmployee) {
  //       Object.assign(this.selectedEmployee, modalResult.data);
  //       this.selectedEmployee = null;
  //     } else {
  //       this.employeeList.push(modalResult.data);
  //     }
  //     this.modalService.dismissAll();
  //   });
  // }
  clearForm(): void {
    this.employeeForm.reset();
  }

  formatDate(date: NgbDateStruct): string {
    const year = date.year;
    const month = date.month < 10 ? '0' + date.month : date.month;
    const day = date.day < 10 ? '0' + date.day : date.day;
    return `${year}-${month}-${day}`;
  }
}
