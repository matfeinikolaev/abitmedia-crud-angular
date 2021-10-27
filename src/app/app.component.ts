import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'abitmedia-crud-angular';
  constructor(private router: Router) { 
    this.initializeApp();
  } 
  initializeApp () {
    this.router.navigateByUrl("/home", { replaceUrl: true });
  }
}
