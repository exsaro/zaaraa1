import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Projects} from '../../shared/models/projects.model';
import { ActivatedRoute } from "@angular/router";
import {ProjectDetailsService} from './project-details.service';

declare let $: any;


@Component({
    selector:'app-view',
    templateUrl:'project-details.component.html',
    styleUrls: ['./project-details.component.css']
})

export class ProjectDetailsComponent implements OnInit{

  leadForm: FormGroup;
  public succMsgFlag = false;
  succMsg = '';
  progressFlag = false;

  loading = false;
  latLang = [];
  lat: number;
  lang: number;
  selectedImg: number;
  //mapUrl = "https://www.google.com/maps/embed/v1/place?q=40.7127837,-74.0059413&amp;key=AIzaSyBlVqyB--wrkGpks1i74mHuZLpGu1pwVq8"
    public projectDetails:Projects.ResponseModel;
    constructor(private route:ActivatedRoute,
                private projectDetailsService:ProjectDetailsService,
                private fb: FormBuilder, private title:Title
    ){ }

    showPop(index) {
      this.selectedImg = index;
    }

    leads(form){
      let leadData = JSON.stringify(form.value);
      console.log(form.value);
      this.progressFlag = true;
      this.projectDetailsService.postProjectLeads(leadData).subscribe( (res)=>{
        console.log(res.code);
        this.succMsgFlag = true;
        this.progressFlag = false;

        if(res.code === 'Success'){
          this.succMsg = 'Your details added successfully, Our Representative will get back to you soon.';
        }else if(res.code === 'Failed'){
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
      });
      form.reset();
    }
    // `${window.location.href}`

    // resolved(captchaResponse: string) {
    //   console.log(`Resolved captcha with response: ${captchaResponse}`);
    // }

    ngOnInit(){

      this.leadForm = this.fb.group({
        Last_Name: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Mobile: ['', [Validators.required, Validators.pattern(/^(\+)?\d+$/)]],
        Message: ['', [Validators.required]],
        // recaptchaReactive: ['', [Validators.required]],
        Referrer: [`${window.location.href}`]
      });

      $('.carousel').carousel();

      $('#galleryModel').on('hidden.bs.modal', function (e) {
        $('.carousel-item').removeClass('active');
      })

        this.route.params.subscribe((projectDetailsRoutingData)=>{
            this.setProjectDetails(projectDetailsRoutingData);
        });

        window.scrollTo(0, 0);

     }

     public setProjectDetails(projectDetailsRoutingData):void{
      this.loading = true;
         const projectDetailsRequestParams = `${projectDetailsRoutingData.location}/${projectDetailsRoutingData.project}`;
         this.projectDetailsService.getProjectDetails(projectDetailsRequestParams).subscribe((apiData)=>{
          this.loading = false;
          this.title.setTitle(apiData[0].Project_name+" at "+apiData[0].Project_location+","+apiData[0].area);

          this.latLang = apiData[0].lang_lat.split(',');
          this.lat = this.latLang[0];
          this.lang = this.latLang[1];
          // tslint:disable-next-line:max-line-length
          //this.mapUrl = `https://www.google.com/maps/embed/v1/place?q=${this.lat},${this.lang}&amp;key=AIzaSyBlVqyB--wrkGpks1i74mHuZLpGu1pwVq8`
          console.log(this.latLang[0]);
            if(apiData && apiData.length){
                this.projectDetails = apiData[0];
            }
         },
        error => {
            console.log(error);
        });

     }
}
