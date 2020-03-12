import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminForm: FormGroup;
  validateFlag = false;
  validateMsg = '';

  constructor(private fb: FormBuilder, private adminservice: AdminService, private route: Router) { }

  adminLogin(loginData) {
    const username = this.adminForm.get('adminLogin').value.toLowerCase();
    const password = this.adminForm.get('adminPass').value.toLowerCase();

    loginData = JSON.stringify({
      username: username,
      password: password
    });

    console.log(loginData);

    if ( username === 'admin' && password === 'admin' ) {
      this.adminservice.adminLogin(loginData).subscribe((res) => {
          if (!!res['token']) {
            localStorage.setItem('Auth', res['token']);
            this.route.navigate(['/admin', 'builderlist']);
          }
        },
        (err) => console.log(err) 
      );
    } else {
      this.validateFlag = true;
      this.validateMsg = 'Username and password incorrect';
    }
  }

  ngOnInit() {
    localStorage.removeItem('Auth');

    this.adminForm = this.fb.group({
      adminLogin: ['', [Validators.required]],
      adminPass: ['', [Validators.required]]
    });
  }

}

