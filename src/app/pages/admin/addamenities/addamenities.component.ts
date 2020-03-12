import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addamenities',
  templateUrl: './addamenities.component.html',
  styleUrls: ['./addamenities.component.css', '../admin.component.css']
})
export class AddamenitiesComponent implements OnInit {
  router: any;

  constructor(private adminservice: AdminService,
    private actrouter: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder) { }

    ProjId;
    BuildId;
    BuildName;
    ProjName;
    addAmenitiesForm;
    public succMsgFlag = false;
    succMsg = '';

    addAmenities(){
      const amenForm = JSON.stringify(this.addAmenitiesForm.value);
      this.adminservice.addamenities(this.ProjId, amenForm).subscribe((res)=>{
        this.succMsgFlag = true;
        if(res.code === 'Success'){
          this.succMsg = 'Record added successfully.';
        }else if(res.code === 'Failed'){
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
        this.addAmenitiesForm.reset();
        console.log(res);
      },err => {
        this.router.navigate(['admin']);
      })
    }

  ngOnInit() {

    this.actrouter.params.subscribe((projId)=> {
      this.ProjId = projId.id;
      this.ProjName = projId.name;
      console.log(this.ProjId);
    });

    this.addAmenitiesForm = this.fb.group({
      amenities_name: ['', [Validators.required]],
      status : ['Active', [Validators.required]]
    });

    this.BuildId = localStorage.getItem('BuilderId');
    this.BuildName = localStorage.getItem('BuilderName');

  }

}
