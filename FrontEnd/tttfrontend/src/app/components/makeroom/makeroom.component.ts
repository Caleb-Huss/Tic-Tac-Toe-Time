import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomOptions } from 'src/app/models/RoomOptions';
import { RoomoptionsService } from 'src/app/services/roomoptions.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-makeroom',
  templateUrl: './makeroom.component.html',
  styleUrls: ['./makeroom.component.css']
})
export class MakeroomComponent implements OnInit {

  constructor(private router: Router, private socketService: SocketService, private optionsService: RoomoptionsService) { }
  totalPlayers:number = 4;
  totalCPUs: number = 3;
  roomName: string = "roomname";
  roomCode: string = "01010";
  username: string | null = "test";
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.newCode();
  }
  goHome(){
    this.router.navigate(['/']);
  }
  changePlayers(event)
  {
    this.totalPlayers=event.target.value;
    if(this.totalPlayers<this.totalCPUs)
    {
      this.totalCPUs = this.totalPlayers-1;
    }
  }
  changeCPUs(event)
  {
    this.totalCPUs=event.target.value;
  }

  newCode()
  {
    this.roomCode="";
    let c = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i =0; i<5; i++)
    {
      this.roomCode += c.charAt(Math.floor(Math.random()*c.length));
    }
  }
  copyClipboard()
  {
    navigator.clipboard.writeText(this.roomCode);
  }
  makeRoom()
  {
    let oldRoomCode: string |null = sessionStorage.getItem('roomCode');
    let newOptions:RoomOptions =
    {
      totalPlayers: this.totalPlayers,
      totalCPUs: this.totalCPUs,
      roomName: this.roomName,
      roomCode: this.roomCode
    };
    this.optionsService.updateOptions(newOptions);
    this.socketService.leaveRoom({user:this.username, room:oldRoomCode});
    this.socketService.joinRoom({user:this.username, room:this.roomCode, name:this.roomName});
    sessionStorage.setItem("roomCode", this.roomCode);
    this.router.navigate(['/waitroom']);
  }
}
