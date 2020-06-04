import  { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HomeComponent} from './home/home.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectDetailsComponent} from './project-details/project-details.component';
import  { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { SharedModule } from "../shared/shared.module";
import { ProjectDetailsService} from '../pages/project-details/project-details.service';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/adminlogin.component';
import { BuilderlistComponent } from './admin/builderlist/builderlist.component';
import { AddbuilderComponent } from './admin/addbuilder/addbuilder.component';
import { AdminSidebarComponent } from './admin/adminsidebar.component';
import { AgmCoreModule } from '@agm/core';
import { SafePipe } from './safe.pipe';
import { AdminAuthGuard } from './admin/admin-auth.guard';
import { ProjectlistComponent } from './admin/projectlist/projectlist.component';
import { AddprojectComponent } from './admin/addproject/addproject.component';
import { AmenitiesComponent } from './admin/amenities/amenities.component';
import { PricingComponent } from './admin/pricing/pricing.component';
import { AddpricingComponent } from './admin/addpricing/addpricing.component';
import { AddamenitiesComponent } from './admin/addamenities/addamenities.component';
import { AddgalleryComponent } from './admin/addgallery/addgallery.component';
import { GallerylistComponent } from './admin/gallerylist/gallerylist.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
// import { TokenInterceptorService } from '../pages/admin/token-interceptor.service';


const routes:Routes = [

  // {
  //   path : 'admin',
  //   component: AdminLoginComponent
  // },
  {
    path: 'admin',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },
{
  path : 'admin/login',
  component : AdminLoginComponent
},
  {
    path : 'admin/builderlist',
    component: BuilderlistComponent
  },
  {
    path : 'admin/addbuilder',
    component: AddbuilderComponent
  },
  {
    path : 'admin/projectlist/:id/:name',
    component: ProjectlistComponent
  },
  {
    path : 'admin/addproject/:id/:name',
    component: AddprojectComponent
  },
  // {
  //   path : 'admin/addamenities/:id/:name',
  //   component: AddamenitiesComponent
  // },
  {
    path : 'admin/addgallery/:id/:name',
    component: AddgalleryComponent
  },
  {
    path : 'admin/addpricing/:id/:name',
    component: AddpricingComponent
  },
  {
    path : 'admin/amenitieslist/:id/:name',
    component: AmenitiesComponent
  },
  {
    path : 'admin/pricinglist/:id/:name',
    component: PricingComponent
  },
  {
    path : 'admin/gallerylist/:id/:name',
    component: GallerylistComponent
  }
];

@NgModule({
    declarations : [
        HomeComponent,
         ProjectDetailsComponent,
         AdminLoginComponent,
         BuilderlistComponent,
         AddbuilderComponent,
         AdminSidebarComponent,
         AdminComponent,
         SafePipe,
         ProjectlistComponent,
         AddprojectComponent,
         AmenitiesComponent,
         PricingComponent,
         AddpricingComponent,
         AddamenitiesComponent,
         AddgalleryComponent,
         GallerylistComponent
    ],
    imports :[
         SharedModule,
         CommonModule,
         FormsModule,
         ReactiveFormsModule,
         RecaptchaModule,
         MatChipsModule,
         MatFormFieldModule,
         MatIconModule,
         RecaptchaFormsModule,
         AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBlVqyB--wrkGpks1i74mHuZLpGu1pwVq8',
          libraries: ['places'] 
        }),
        // ProjectSummaryComponent
       RouterModule.forChild(routes) 
    ],
    exports: [

        RouterModule
    ],
    providers:[ProjectDetailsService, AdminAuthGuard]

})

export class AppPagesModule{

}
