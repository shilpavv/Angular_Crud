import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { SharedComponent } from 'src/app/shared/conformModal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() id: any;
  employeeForm!: FormGroup;
  @Input() currentEmployee: any;
  editMode = true;
  isDisabled: boolean = false;

  
  employeeList: any;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    // Create form controls with validation
  }
  ngOnInit(): void {
    this.editMode = !!this.id; // Set editMode based on id 
    this.employeeForm = this.fb.group({
      id: [this.currentEmployee?.id],
      name: [
        this.currentEmployee ? this.currentEmployee.name : '',
        Validators.required,
      ],
      age: [
        this.currentEmployee ? this.currentEmployee.age : '',
        Validators.required,
      ],
      dob: [
        this.currentEmployee ? this.currentEmployee.dob : '',
        Validators.required,
      ],
      email: [
        this.currentEmployee ? this.currentEmployee.email : '',
        [Validators.required, Validators.email],
      ],
      mob: [
        this.currentEmployee ? this.currentEmployee.mob : '',
        [Validators.required],
      ],
      gender: [
        this.currentEmployee ? this.currentEmployee.gender : '',
        Validators.required,
      ],
      department: [
        this.currentEmployee ? this.currentEmployee.department : '',
        Validators.required,
      ],
    });
  } 
  submitForm(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      // Check if an existing employee is being updated
      if (this.id) {
        const updateModal = this.modalService.open(SharedComponent);
        //set action message
        updateModal.componentInstance.actionMessage = "update";
        updateModal.componentInstance.employee ='' ;
        updateModal.result.then((result) => {
          //if employee comfirm  then update
          if (result === true) {
            const formData = this.employeeForm.value;
            
            //Api Call
            this.apiService.UpdateEmployee(this.id, formData).subscribe((updatedEmployee: any) => {
              console.log('Employee updated:', updatedEmployee);
              const index = this.employeeList.findIndex((employee: any) => employee.id === updatedEmployee.id);
              // update the employee in the list.
              if (index !== -1) {
                this.employeeList[index] = updatedEmployee;
              }
               // close the active modal
              this.activeModal.close(updatedEmployee);
            });
          } else {
            console.log('Update canceled');
          }
        });
      } else {
        // Otherwise, add a new employee
       // Call the AddEmployee
        this.apiService.AddEmployee(formData).subscribe((newEmployee: any) => {
          console.log('Employee added:', newEmployee);
          // Push the newEmployee into the  employeeList[]
          this.employeeList.push(newEmployee); 
          this.activeModal.close(newEmployee); 
        });
      }
    } else {
  Object.values(this.employeeForm.controls).forEach(control => {
    control.markAsTouched();
  });
    }
  }
  cancel() {
    this.activeModal.dismiss();
    
  }
}
