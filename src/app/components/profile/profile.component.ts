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

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      role: [''],
      origin: [''],
      restaurant: ['']
    })
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
      },
      err=>{
        alert("Something went wrong")
      }
      )
  }

}
