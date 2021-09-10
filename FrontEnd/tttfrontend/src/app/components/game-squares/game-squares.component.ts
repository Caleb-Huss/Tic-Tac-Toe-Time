import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-squares',
  templateUrl: './game-squares.component.html',
  styleUrls: ['./game-squares.component.css']
})
export class GameSquaresComponent {

  @Input() value;
  @Input() fontSize: number;
}
