import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { MainSearchService } from './main-search.service';
import { Projects} from '../../shared/models/projects.model';
import { ProjectSummaryService } from '../../shared/components/project-summary/project-summary.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {ProjectDetailsService} from '../project-details/project-details.service';
declare let $: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild("refersite") inputvalue;
  @ViewChild("btnclose") btnclose : ElementRef;
  referSite = '';
  private recaptchaSiteKey = '6Lfki38UAAAAADienDrSAirDZ7LdEWmU3SnDtTdc';
  leadForm: FormGroup;
  leadFormnew: FormGroup;
  public searchResults: string[] = [];
  public searchAllResults: Projects.SearchModel;
  public searchRequestParams;
  public succMsgFlag = false;
  succMsg = '';
  progressFlag = false;

  @ViewChild('mainSearch') mainSearch:ElementRef;
  showSuggest = true;
  disBtn = false;
  loading = false;
  selected = false;
  clients = [];
  quickSearchs = ['Chennai', 'Coonoor', 'Trichy']

  constructor(private router: Router, private searchservice: MainSearchService, private summeryservice: ProjectSummaryService,private fb: FormBuilder,private projectDetailsService:ProjectDetailsService) {}
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}
leads_form(form){
  
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
    }else{
      this.succMsg = res;
    }
    setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
    form.reset();
    this.btnclose.nativeElement.click();
  });
  
 
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
    }else{
      this.succMsg = res;
    }
    setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
  });
  form.reset();
  //form.close();
}
  public displaySuggest(query: string) {
      this.loading = true;
      this.selected = false;
      let searchList: string[] = [];
      //let searchKeys: string[] = [];
      if (query.length > 3) {
        this.searchservice.search(query).subscribe((apiData: Projects.SearchModel) => {
          //searchKeys = Object.keys(apiData);
          this.loading = false;
          //console.log(apiData);
          if (apiData && Object.keys(apiData).length) {
            this.searchAllResults = apiData;
              // if (apiData.Builders.response.length) {
              //   this.searchAllResults.Builders.response = apiData.Builders.response;
              // }

              if (apiData.Location.response.length) {
                this.searchAllResults.Location.type = 'Location';
                this.searchAllResults.Location.response = apiData.Location.response;
                console.log(this.searchAllResults.Location.response)
              }

              if (apiData.Projects.response.length) {
                this.searchAllResults.Projects.type = 'Projects';
                this.searchAllResults.Projects.response = apiData.Projects.response;
                console.log(this.searchAllResults.Projects.response)
              }
              // this.searchAllResults.Builders.response,
              this.searchResults = searchList.concat(this.searchAllResults.Location.response,
                                        this.searchAllResults.Projects.response
                                      );
           }
           if (this.selected === true){
            this.searchResults = [];
            this.showSuggest = true;
            this.disBtn = false;
           }else{
            this.showSuggest = false;
            this.disBtn = true;
           }

        },
        (error) => {
          console.log(error);
        });
      } else {
        this.searchResults = [];
        this.showSuggest = true;
        this.disBtn = false;
     }
    }

    getData(e: any, value) {
      e.returnValue = false;
      this.mainSearch.nativeElement.value = value;
      this.selected = true
      this.showSuggest = true;
    }



    showProjects(e: any, projects: string) {

      e.returnValue = false;
      this.selected = true
      this.searchResults = [];
      this.searchRequestParams = projects;
      this.disBtn = false;
      this.showSuggest = true;
      this.mainSearch.nativeElement.value = '';

      window.scrollTo(0, 1300);

    }

    public navigateToProjectDetails(): void {
      this.router.navigate(['/project-details']);
    }

getclients(){
  this.searchservice.clients().subscribe((res) => {
  this.clients = res;
  console.log(this.clients);
},
(error) => {
  console.log(error);
});
}


  ngOnInit() {
    // this.leadForm = this.fb.group({
    //   Last_Name: ['', [Validators.required]],
    //   Email: ['', [Validators.required, Validators.email]],
    //   Mobile: ['', [Validators.required, Validators.pattern(/^(\+)?\d+$/)]],
    //   Message: ['', [Validators.required]],
    //   recaptchaReactive: ['', [Validators.required]],
    //   Referrer: [`${window.location.href}?=refer_site=${this.referSite}`]
    // });
    this.leadFormObj();
    this.getclients();
    $('.owl-carousel').owlCarousel({
      items: 5,
      nav: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 3
          },
          1000: {
              items: 5
          }
      }
  });
  $('.owl-prev').html('<img src="assets/images/svg/arrow-left.svg" width="32" />');
  $('.owl-next').html('<img src="assets/images/svg/arrow-right.svg" width="32" />');

  }

  leadFormObj(){
    this.leadForm = this.fb.group({
      Last_Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Mobile: ['', [Validators.required, Validators.pattern(/^(\+)?\d+$/)]],
      Message: ['', [Validators.required]],
      recaptchaReactive: ['', [Validators.required]],
      Referrer: [`${window.location.href}?=refer_site=${this.referSite}`]
    });
    this.leadFormnew = this.fb.group({
      Last_Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Mobile: ['', [Validators.required, Validators.pattern(/^(\+)?\d+$/)]],
      Message: ['', [Validators.required]],
      recaptchaReactive: ['', [Validators.required]],
      Referrer: [`${window.location.href}?=refer_site=${this.referSite}`]
    });

  }

  getRef(value){
      //console.log(this.inputvalue.nativeElement.value);
    this.referSite = value;
    setTimeout(()=>{
      this.leadFormObj();
    },500)

  }

}
