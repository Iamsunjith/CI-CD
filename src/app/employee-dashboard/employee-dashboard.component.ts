import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeModelObj: EmployeeModel = new EmployeeModel();
  employeeData: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit(): void {



    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],

    })
    this.getAllEmployee();
  }

  postEmpoyeeDetails() {
    this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salary = this.formValue.value.salary;

    this.apiService.postEmployee(this.employeModelObj).subscribe(emp => {
      console.log(emp);
      alert("Employee Added SuccessFully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    },
      err => {
        alert("Something Went Wrong")
      }
    )

  }

  getAllEmployee() {
    this.apiService.getEmployee().subscribe(empDetails => {
      console.log(empDetails);
      this.employeeData = empDetails;
    });
  }

  deleteEmployee(row: any) {
    this.apiService.deleteEmployee(row.id).subscribe(res => {
      console.log(res);
      alert('Employee Deleted')
      this.getAllEmployee();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  updateEmpoyeeDetails() {
    this.employeModelObj.firstName = this.formValue.value.firstName;
    this.employeModelObj.lastName = this.formValue.value.lastName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salary = this.formValue.value.salary;

    this.apiService.updateEmployee(this.employeModelObj, this.employeModelObj.id).subscribe(data => {
      alert('Updated Successfully');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  clickAddEmp() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

}
