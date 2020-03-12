import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css', '../admin.component.css']
})
export class AddprojectComponent implements OnInit {
  router: any;

  constructor(
    private adminservice: AdminService,
    private actrouter: ActivatedRoute,
    private fb: FormBuilder) { }


    addProjectForm: FormGroup;
    buildId;
    buildName;
    public succMsgFlag = false;
    succMsg = '';



    addProject(){
      //console.log(this.addProjectForm.value);
      const projForm = JSON.stringify(this.addProjectForm.value);
      this.adminservice.addProjectData(projForm).subscribe((res) => {
        this.succMsgFlag = true;
        if(res.code === 'Success'){
          this.succMsg = 'Record added successfully.';
        }else if(res.code === 'Failed'){
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
        this.addProjectForm.reset();
        console.log(res);
      }
      ,err => {
              this.router.navigate(['admin']);
            });
    }

  ngOnInit() {

    this.actrouter.params.subscribe((buildId) => {
      this.buildId = buildId.id;
      this.buildName = buildId.name;

    });

    this.addProjectForm = this.fb.group({
      BID : this.buildId,
      Project_name : ['', [Validators.required]],
      project_desc : ['', [Validators.required]],
      Possession_Date : [''],
      Launch_Date : [''],
      Project_location : ['', [Validators.required]],
      area : ['', [Validators.required]],
      lang_lat : ['', [Validators.required]],
      BHK : ['', [Validators.required]],
      minbuilduparea : ['', [Validators.required]],
      maxbuilduparea : ['', [Validators.required]],
      minprice : ['', [Validators.required]],
      total_units : [''],
      total_area : [''],
      availability : ['', [Validators.required]],
      Approvals : [''],
      status : ['Active', [Validators.required]],
    })

  }

}
