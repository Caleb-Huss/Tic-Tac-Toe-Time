import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['/']);
  }
}
