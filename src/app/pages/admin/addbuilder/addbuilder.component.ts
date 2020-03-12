import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addbuilder',
  templateUrl: './addbuilder.component.html',
  styleUrls: ['./addbuilder.component.css', '../admin.component.css']
})
export class AddbuilderComponent implements OnInit {

  addBuilderForm: FormGroup;
  uploadfile: any;
  public succMsgFlag = false;
  succMsg = '';
  builderData = new FormData();
  router: any;
  constructor(private fb: FormBuilder, private adminservice: AdminService, private route: Router) {

   }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
         this.builderData.set('logo', file, file.name);
      // this.addBuilderForm.get('builders_logo').setValue(file);
    }
  }

  addBuilder() {

    this.builderData.set('builders_name', this.addBuilderForm.value['builders_name']);
    this.builderData.set('builders_location', this.addBuilderForm.value['builders_location']);
    this.builderData.set('builders_area', this.addBuilderForm.value['builders_area']);
    this.builderData.set('totalprojects', this.addBuilderForm.value['totalprojects']);
    this.builderData.set('ongoing', this.addBuilderForm.value['ongoing']);
    this.builderData.set('status', this.addBuilderForm.value['status']);
    this.builderData.set('builders_spec', this.addBuilderForm.value['builders_spec']);
    this.adminservice.addBuilderData(this.builderData).subscribe(
      (res) => {
        this.succMsgFlag = true;
        if (res.code === 'Success') {
          this.succMsg = 'Record added successfully.';
        } else if (res.code === 'Failed') {
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function() { this.succMsgFlag = false; }.bind(this), 4000);
        this.addBuilderForm.reset();
      },err => {
        this.router.navigate(['admin']);
      }

    );
  }

  ngOnInit() {
    this.addBuilderForm = this.fb.group({
      builders_name: ['', [Validators.required]],
      builders_location: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      builders_area: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      totalprojects: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      ongoing: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: ['Active', [Validators.required]],
      builders_spec: ['', [Validators.required]],
      builders_logo: ['']
    });
  }

}
