import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomOptions } from '../models/RoomOptions';

@Injectable({
  providedIn: 'root'
})
export class RoomoptionsService {

  constructor() { }
  public options:RoomOptions = {
    totalPlayers: 4,
    totalCPUs: 3
  };

  private source = new BehaviorSubject(this.options);
  currentOptions = this.source.asObservable();


  updateOptions(i: RoomOptions)
  {
    this.source.next(i);
  }
}
