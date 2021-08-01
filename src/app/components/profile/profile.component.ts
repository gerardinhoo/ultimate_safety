import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import {ProfileModel} from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formValue !: FormGroup;
  profileModelObj: ProfileModel = new ProfileModel();
  memberData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      role: [''],
      origin: [''],
      restaurant: ['']
    })
    this.getAllMembers()
  }

  clickAddMember() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postMemberDetails() {
    this.profileModelObj.firstName = this.formValue.value.firstName;
    this.profileModelObj.lastName = this.formValue.value.lastName;
    this.profileModelObj.role = this.formValue.value.role;
    this.profileModelObj.origin = this.formValue.value.origin;
    this.profileModelObj.restaurant = this.formValue.value.restaurant;

    this.apiService.postMember(this.profileModelObj)
      .subscribe(res => {
        console.log(res);
        alert('Employee Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllMembers();
      },
      err=>{
        alert("Something went wrong")
      }
      )
  }

  getAllMembers() {
    this.apiService.getMember()
    .subscribe(res => {
      this.memberData = res;
    })
  }

  deleteSingleMember(row: any) {
    this.apiService.deleteMember(row.id)
    .subscribe(res => {
      alert('Member Deleted');
      this.getAllMembers();
    })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.profileModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['role'].setValue(row.role);
    this.formValue.controls['origin'].setValue(row.origin);
    this.formValue.controls['restaurant'].setValue(row.restaurant);
 }

 updateMemberDetails() {
    this.profileModelObj.firstName = this.formValue.value.firstName;
    this.profileModelObj.lastName = this.formValue.value.lastName;
    this.profileModelObj.role = this.formValue.value.role;
    this.profileModelObj.origin = this.formValue.value.origin;
    this.profileModelObj.restaurant = this.formValue.value.restaurant;

    this.apiService.updateMember(this.profileModelObj, this.profileModelObj.id)
    .subscribe(res => {
      alert('Updated Successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllMembers();
    })
 }
}
