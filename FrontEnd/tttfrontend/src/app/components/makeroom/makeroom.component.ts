import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-makeroom',
  templateUrl: './makeroom.component.html',
  styleUrls: ['./makeroom.component.css']
})
export class MakeroomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['/']);
  }
}
