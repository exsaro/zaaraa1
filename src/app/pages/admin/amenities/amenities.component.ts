import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css', '../admin.component.css']
})
export class AmenitiesComponent implements OnInit {

  router: any;


  constructor(private adminservice: AdminService,
    private actrouter: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder) { }

  amenities = [];
  ProjId;
  ProjName;
  BuildId;
  BuildName;
  loading = false;
  amanId: number;
  public succMsgFlag = false;
  succMsg = '';
  addAmenitiesForm;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [];


  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.fruits.push({name: value.trim()});
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // remove(amenList): void {
  //   const index = this.amenities.indexOf(amenList);
  //   if (index >= 0) {
  //     this.amenities.splice(index, 1);
  //   }
  // }

  // addAmenitiesPage(projId, projName, event){
  //   event.preventDefault();
  //   this.route.navigate(['/admin/addamenities', projId, projName]);
  // }

  getamenList(projId){
    this.loading = true;
    this.adminservice.listamenities(projId).subscribe((res)=>{
      this.amenities = res.response;
      this.loading = false;
      console.log(res.response);
    },err => {
      this.router.navigate(['admin']);
    }
);
  }

  // deleteAmenities(amenId){
  //   this.amanId = amenId;
  //   console.log(this.amanId);
  // }

  deleteAmenitiesConfirm(amenId){
    this.adminservice.deleteamenities(amenId).subscribe((res)=>{
      this.getamenList(this.ProjId);
      this.succMsgFlag = true;
      if(res.code === 'Success'){
        this.succMsg = 'Record deleted successfully.';
      }else if(res.code === 'Failed'){
        this.succMsg = 'Something went wrong, please try after some time.';
      }
      setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
    },err => {
      this.router.navigate(['admin']);
    }
);
  }

  addAmenities(){
    const amenForm = JSON.stringify(this.addAmenitiesForm.value);
    this.adminservice.addamenities(this.ProjId, amenForm).subscribe((res)=>{
      this.succMsgFlag = true;
      this.getamenList(this.ProjId);
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
      this.getamenList(this.ProjId);
      console.log(this.ProjId);
    });

    this.addAmenitiesForm = this.fb.group({
      amenities_name: ['',[Validators.required]],
      status : ['Active']
    });


    this.BuildId = localStorage.getItem('BuilderId');
    this.BuildName = localStorage.getItem('BuilderName');





  }



}
