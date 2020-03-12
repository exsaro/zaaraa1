import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addpricing',
  templateUrl: './addpricing.component.html',
  styleUrls: ['./addpricing.component.css', '../admin.component.css']
})
export class AddpricingComponent implements OnInit {
  router: any;

  constructor(private adminservice: AdminService,
    private actrouter: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder) { }

    ProjId;
    BuildId;
    BuildName;
    ProjName;
    addPricingForm;
    public succMsgFlag = false;
    succMsg = '';

    addPricing(){
      const priceData = JSON.stringify(this.addPricingForm.value);
      this.adminservice.addpricing(this.ProjId, priceData).subscribe((res)=>{
        this.succMsgFlag = true;
        if(res.code === 'Success'){
          this.succMsg = 'Record added successfully.';
        }else if(res.code === 'Failed'){
          this.succMsg = 'Something went wrong, please try after some time.';
        }
        setTimeout(function(){ this.succMsgFlag = false; }.bind(this), 4000);
        this.addPricingForm.reset();
        console.log(res);
      },err => {
        this.router.navigate(['admin']);
      });
    }

    ngOnInit() {
      this.actrouter.params.subscribe((projId)=> {
        this.ProjId = projId.id;
        this.ProjName = projId.name;
        console.log(this.ProjId);
      });

      this.addPricingForm = this.fb.group({
        type: ['', [Validators.required]],
        area_size: ['', [Validators.required]],
        sqft_price: ['', [Validators.required]],
        status: ['Active', [Validators.required]]
      });
      this.BuildId = localStorage.getItem('BuilderId');
      this.BuildName = localStorage.getItem('BuilderName');
    }

}
