import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToPage(i: number)
  {
    switch(i){
      case i=1: {
        this.router.navigate(['/makeroom']);
        break;
      }
      case i=2: {
        this.router.navigate(['/rooms']);
        break;
      }
      case i=3: {
        this.router.navigate(['/stats']);
        break;
      }
      case i=4: {
        this.router.navigate(['/rules']);
        break;
      }
      default: {
        break;
      }
    }
  }

}
