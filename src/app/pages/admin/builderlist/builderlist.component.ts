import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

declare let $: any;

@Component({
  selector: 'app-builderlist',
  templateUrl: './builderlist.component.html',
  styleUrls: ['./builderlist.component.css', '../admin.component.css']
})
export class BuilderlistComponent implements OnInit {

  constructor(private adminservice: AdminService, private fb: FormBuilder, private router: Router) { }

  builderList: any = [];
  editBuilderForm: FormGroup;
  editBuilderData: any = [];
  BuilderId: Number;
  public succMsgFlag = false;
  succMsg = '';
  loading = false;
  editLoading = false;
  editBuilderFormData = new FormData();
  builder_Status = ['Active', 'InActive'];
  display='none';

  showBuilderList() {
    this.loading = true;
    
    this.adminservice.listBuilderData().subscribe((res) => {
        this.builderList = res;
       this.loading = false;
    },err => {
          this.router.navigate(['admin']);
    });
  
  }
    onFileSelect(event) {
      if (event.target.files.length > 0) {
      const file = event.target.files[0];

         this.editBuilderFormData.set('logo', file, file.name);
         console.log(this.editBuilderFormData.get('logo'));
      // this.addBuilderForm.get('builders_logo').setValue(file);
    } else {
      this.editBuilderFormData.set('logo', this.editBuilderData.logo);
    }
  }



  editBuilderConfirm() {
    //this.loading = true;
    this.editBuilderFormData.set('builders_name', this.editBuilderForm.value['builders_name']);
    this.editBuilderFormData.set('builders_location', this.editBuilderForm.value['builders_location']);
    this.editBuilderFormData.set('builders_area', this.editBuilderForm.value['builders_area']);
    this.editBuilderFormData.set('totalprojects', this.editBuilderForm.value['totalprojects']);
    this.editBuilderFormData.set('ongoing', this.editBuilderForm.value['ongoing']);
    this.editBuilderFormData.set('status', this.editBuilderForm.value['status']);
    this.editBuilderFormData.set('builders_spec', this.editBuilderForm.value['builders_spec']);
   // this.editBuilderFormData.set('logo', this.editBuilderForm.value['logo']);
    this.adminservice.updateBuilder(this.BuilderId, this.editBuilderFormData).subscribe((res) => {
      this.succMsgFlag = true;
      this.showBuilderList();
      console.log(res);
      if (res.code === 'Success') {
        this.succMsg = 'Record Updated successfully.';
      } else if (res.code === 'Failed') {
        this.succMsg = 'Something went wrong, please try after some time.';
      }
      setTimeout(function() { this.succMsgFlag = false; }.bind(this), 4000);
      this.editBuilderForm.reset();
      //this.loading = false;
      $('#editBuilderModal').modal('hide');
    });

  }
  editBuilder(builderId) {
    this.BuilderId = builderId;
    this.editLoading = true;
    this.adminservice.editBuilderData(builderId).subscribe((res) => {
      this.editBuilderData = res[0];
      this.editBuilderFormData.set('logo', this.editBuilderData.logo);
      this.formValidation();
      this.editLoading = false;
    },err => {
      this.router.navigate(['admin']);
    });

    // this.formValidation();
  }
  deleteBuilder(builderId) {
    this.BuilderId = builderId;
  }
  deleteBuilderConfirm() {
    this.adminservice.deleteBuilder(this.BuilderId).subscribe((res) => {
        this.showBuilderList();
        this.succMsgFlag = true;
        if (res.code === 'Success') {
          this.succMsg = 'Record Deleted successfully.';
        } else if (res.code === 'Failed') {
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function() { this.succMsgFlag = false; }.bind(this), 4000);
    },err => {
      this.router.navigate(['admin']);
});
  }

  formValidation() {
    this.editBuilderForm = this.fb.group({
      builders_name: [this.editBuilderData.builders_name, [Validators.required]],
      builders_location: [this.editBuilderData.builders_location, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      builders_area: [this.editBuilderData.builders_area, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      totalprojects: [this.editBuilderData.totalprojects, [Validators.required, Validators.pattern('^[0-9]*$')]],
      ongoing: [this.editBuilderData.ongoing, [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: [this.editBuilderData.status, [Validators.required]],
      builders_spec: [this.editBuilderData.builders_spec, [Validators.required]]
    });
  }


  public projectList(builderId, builderName, event): void {
    event.preventDefault();
    this.router.navigate(['admin/projectlist',  builderId, builderName]);
 }

 updatebuilder() {
   console.log(this.editBuilderForm);
  this.adminservice.updateBuilder(this.BuilderId, this.editBuilderForm).subscribe((res) => {
    this.showBuilderList();
    this.succMsgFlag = true;
    if (res.code === 'Success') {
      this.succMsg = 'Record Updated successfully.';
    } else if (res.code === 'Failed') {
      this.succMsg = 'Something went wrong, please try after some time.';
    }
    setTimeout(function() { this.succMsgFlag = false; }.bind(this), 4000);
},err => {
  this.router.navigate(['admin']);
});

 }
  ngOnInit() {
    this.showBuilderList();
    this.formValidation();
    // localStorage.removeItem('BuilderId');
    // localStorage.removeItem('BuilderName');
  }



}
