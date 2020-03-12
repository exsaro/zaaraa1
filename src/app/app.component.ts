import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private recaptchaSiteKey = '6Lfki38UAAAAADienDrSAirDZ7LdEWmU3SnDtTdc';
  title = 'zaara-homes';


  constructor(public  router: Router) { }


  ngOnInit() {

  }
}
