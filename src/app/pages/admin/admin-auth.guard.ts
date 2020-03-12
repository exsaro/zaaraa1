import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private adminservice: AdminService, private route: Router){}

  canActivate(): boolean{
    if(this.adminservice.loggedIn()){
      return true;
    }else{
      this.route.navigate(['/admin/login']);
      return false;
    }
  }

}
