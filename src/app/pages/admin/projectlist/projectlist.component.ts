import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import * as $AB from 'jquery';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css', '../admin.component.css']
})
export class ProjectlistComponent implements OnInit {

  constructor(private adminservice: AdminService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  listProjects = [];
  loading = false;
  editLoading = false;
  BuildId;
  BuildName;
  projId: number;
  public succMsgFlag = false;
  succMsg = '';
  editProjectForm;
  editProjectData = [];
  editProjectFormData = new FormData();




  formValidation() {
    this.editProjectForm = this.fb.group({
      BID: this.BuildId,
      Project_name: [this.editProjectData['Project_name']],
      project_desc: [this.editProjectData['project_desc']],
      Possession_Date: [this.editProjectData['Possession_Date']],
      Launch_Date: [this.editProjectData['Launch_Date']],
      Project_location: [this.editProjectData['Project_location']],
      area: [this.editProjectData['area']],
      lang_lat: [this.editProjectData['lang_lat']],
      BHK: [this.editProjectData['BHK']],
      minbuilduparea: [this.editProjectData['minbuilduparea']],
      maxbuilduparea: [this.editProjectData['maxbuilduparea']],
      minprice: [this.editProjectData['minprice']],
      total_units: [this.editProjectData['total_units']],
      total_area: [this.editProjectData['total_area']],
      availability: [this.editProjectData['availability']],
      Approvals: [this.editProjectData['Approvals']],
      status: [this.editProjectData['status']]
    });
  }

  editProject(projId) {
    this.editLoading = true;
    this.projId = projId;
    this.adminservice.editProjectData(projId).subscribe((res) => {
      this.editLoading = false;
      this.editProjectData = res[0];
      this.formValidation();
    },err => {
      this.router.navigate(['admin']);
    });
  }

  deleteProject(projId) {
    this.projId = projId;
    console.log(this.projId);
  }

  editProjectConfirm() {
    this.loading = true;
    const obj = {
      Project_name: this.editProjectForm.value['Project_name'],
      project_desc: this.editProjectForm.value['project_desc'],
      Possession_Date: this.editProjectForm.value['Possession_Date'],
      Launch_Date: this.editProjectForm.value['Launch_Date'],
      Project_location: this.editProjectForm.value['Project_location'],
      area: this.editProjectForm.value['area'],
      lang_lat: this.editProjectForm.value['lang_lat'],
      BHK: this.editProjectForm.value['BHK'],
      minbuilduparea: this.editProjectForm.value['minbuilduparea'],
      maxbuilduparea: this.editProjectForm.value['maxbuilduparea'],
      minprice: this.editProjectForm.value['minprice'],
      total_units: this.editProjectForm.value['total_units'],
      total_area: this.editProjectForm.value['total_area'],
      availability: this.editProjectForm.value['availability'],
      Approvals: this.editProjectForm.value['Approvals'],
      status: this.editProjectForm.value['status']
    };
    // this.editProjectFormData.set('Project_name', this.editProjectForm.value['Project_name']);
    // this.editProjectFormData.set('project_desc', this.editProjectForm.value['project_desc']);
    // this.editProjectFormData.set('Possession_Date', this.editProjectForm.value['Possession_Date']);
    // this.editProjectFormData.set('Launch_Date', this.editProjectForm.value['Launch_Date']);
    // this.editProjectFormData.set('Project_location', this.editProjectForm.value['Project_location']);
    // this.editProjectFormData.set('area', this.editProjectForm.value['area']);
    // this.editProjectFormData.set('lang_lat', this.editProjectForm.value['lang_lat']);
    // this.editProjectFormData.set('BHK', this.editProjectForm.value['BHK']);
    // this.editProjectFormData.set('minbuilduparea', this.editProjectForm.value['minbuilduparea']);
    // this.editProjectFormData.set('maxbuilduparea', this.editProjectForm.value['maxbuilduparea']);
    // this.editProjectFormData.set('minprice', this.editProjectForm.value['minprice']);
    // this.editProjectFormData.set('total_units', this.editProjectForm.value['total_units']);
    // this.editProjectFormData.set('total_area', this.editProjectForm.value['total_area']);
    // this.editProjectFormData.set('availability', this.editProjectForm.value['availability']);
    // this.editProjectFormData.set('Approvals', this.editProjectForm.value['Approvals']);
    // this.editProjectFormData.set('status', this.editProjectForm.value['status']);

   // this.editProjectFormData.set('logo', this.editProjectForm.value['logo']);
    this.adminservice.updateproject(this.projId, JSON.stringify(obj)).subscribe((res) => {
      this.succMsgFlag = true;
      this.getProjectList(this.BuildId);
      console.log(res);
      if (res.code === 'Success') {
        this.succMsg = 'Record Updated successfully.';
      } else if (res.code === 'Failed') {
        this.succMsg = 'Something went wrong, please try after some time.';
      }
      setTimeout(function() { this.succMsgFlag = false; }.bind(this), 4000);
      this.editProjectForm.reset();
      this.loading = false;
      (<any>$('#editProjModal')).modal('hide');
           },err => {
            this.router.navigate(['admin']);
          });
  }

  deleteProjectConfirm() {
    this.adminservice.deleteproject(this.projId).subscribe((res) => {
      console.log(res);
      this.getProjectList(this.BuildId);
      this.succMsgFlag = true;
        if (res.code === 'Success') {
          this.succMsg = 'Record deleted successfully.';
        } else if (res.code === 'Failed') {
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function() { this.succMsgFlag = false; }.bind(this), 4000);
    },err => {
      this.router.navigate(['admin']);
    });
  }

  public getProjectList(builderId): void {
    this.loading = true;
    this.adminservice.listProjectData(builderId.id).subscribe((res) => {
      this.listProjects = res;
      this.loading = false;
      console.log(res);
    },err => {
      this.router.navigate(['admin']);
    });
  }

  public addProject(BuildId, BuildName, event?): void {
    event.preventDefault();
    this.router.navigate(['admin/addproject', BuildId.id, BuildName]);
    // console.log(BuildId);
 }


 ngOnInit() {

  this.actRoute.params.subscribe((builderId) => {
    this.BuildId = builderId;
    this.BuildName = builderId.name;
    this.getProjectList(builderId);
    localStorage.setItem('BuilderId', builderId.id);
    localStorage.setItem('BuilderName', builderId.name);
  });

  this.formValidation();

}

}
