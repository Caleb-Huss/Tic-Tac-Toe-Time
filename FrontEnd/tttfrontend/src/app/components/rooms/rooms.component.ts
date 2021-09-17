import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomOptions } from 'src/app/models/RoomOptions';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private router: Router, private socketService: SocketService) { }
  roomList: RoomOptions[] = [
    {
      roomName: "test",
      roomCode: "abcde",
      totalCPUs: 3,
      totalPlayers: 6
    },
    {
      roomName: "test2",
      roomCode: "abeee",
      totalCPUs: 0,
      totalPlayers: 5
    }
  ]
  actualPlayers: number[] = [0, 4]
  enterCode: boolean[] = [false, false];
  tempCode: string = "";
  username: string | null = "test";


  roomSub: Subscription;
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.roomSub = this.socketService.getRoomList().subscribe(rooms => {
      this.roomList = [];
      this.actualPlayers = [];
      this.enterCode = [];
      rooms.forEach(element => {
        this.roomList.push(element.options);
        this.actualPlayers.push(element.users.length);
        this.enterCode.push(false);
      });
      console.log("gotrooms");
      console.log(this.roomList);
    });
    this.reloadRooms();
  }
  showCodeBox(i: number) {
    this.tempCode = "";
    if (this.enterCode[i]) {
      this.enterCode[i] = !this.enterCode[i];
    } else {
      for (let x = 0; x < this.enterCode.length; x++) {
        this.enterCode[x] = false;
      }
      this.enterCode[i] = true;
    }
  }


  gotoRoom(i: number) {
    if(this.tempCode == this.roomList[i].roomCode)
    {
      let oldRoomCode: string |null = sessionStorage.getItem('roomCode');
      this.socketService.leaveRoom({user:this.username, room:oldRoomCode});
      this.socketService.joinRoom({user:this.username, room:this.roomList[i].roomCode, name:this.roomList[i].roomName});
      sessionStorage.setItem("roomCode", this.roomList[i].roomCode);
      this.router.navigate(['/waitroom']); 
    }
  }
  reloadRooms()
  {
    this.socketService.reloadRoomList(this.username);
  }
  goHome() {
    this.router.navigate(['/']);
  }
}
