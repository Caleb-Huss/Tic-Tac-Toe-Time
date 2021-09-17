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
  //initialize everything used in the html
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
  //This detects when the player slider is changed and updates the value of total player
  //and the totalcpus if there are more cpus than players
  changePlayers(event)
  {
    this.totalPlayers=event.target.value;
    if(this.totalPlayers<this.totalCPUs)
    {
      this.totalCPUs = this.totalPlayers-1;
    }
  }
  //this detects when the cpu slider changes and updates the value
  changeCPUs(event)
  {
    this.totalCPUs=event.target.value;
  }

  newCode()
  {
    this.roomCode="";
    let c = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i =0; i<5; i++) //generates a "random" 5 character string to act as a pass code
    {
      this.roomCode += c.charAt(Math.floor(Math.random()*c.length));
    }
  }
  // Allows host to easily copy the room code and paste it in a social app like discord or myspace
  copyClipboard()
  {
    navigator.clipboard.writeText(this.roomCode);
  }
  // final func to run, adds the room to socket with the room options
  // also removes player from room if they were in one.
  // Lastly it takes them to the wait room
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
    this.socketService.joinRoom({user:this.username, room:this.roomCode, options:newOptions});
    sessionStorage.setItem("roomCode", this.roomCode);
    this.router.navigate(['/waitroom']);
  }
}
