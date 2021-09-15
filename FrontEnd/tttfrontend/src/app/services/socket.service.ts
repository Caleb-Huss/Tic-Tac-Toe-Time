import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject  } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { GameState } from '../models/GameState';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';
  //private url = 'wss://revabox.eastus.cloudapp.azure.com/dotnetroyalesocket/';
  //private url = 'wss://revabox.eastus.cloudapp.azure.com';

  private socket: Socket;

  private playerList = new BehaviorSubject<any>({});
  currentPlayerList = this.playerList.asObservable();

  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'pulling', 'flashsocket'], secure: true });
  }
  // ================= General Room Stuff ==============================
  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  reloadRoomList(username): void {
    this.socket.emit('reloadRoomList', username);
  }
  leaveRoom(data): void {
    this.socket.emit('leave', data);
    sessionStorage.removeItem('roomId');
  }

  getRoomList(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('updatedRoomList', (roomList) => {
        observer.next(roomList);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  goToGame(): Observable<any> {
    return new Observable<any>(obs => {
      this.socket.on('goto game', (data) => {
        obs.next(data);
      });
    });
  }

  sendGameId(data): void {
    this.socket.emit('play game', data);
  }
  //========================= General Player Stuff ========================
  getPlayers(data): void {
    this.socket.emit('getPlayers', data);
  }
  findPlayers(): Observable<any> {
    return new Observable(obs => {
      this.socket.on('foundPlayers', (data) => {
        console.log("got players from socket");
        console.log(data);
        obs.next(data);
      });
    });
  }

  //================ General Audio Stuff ============================
  sendAudioTrigger(data): void {
    this.socket.emit('play audio', data)
  }
  getAudioTrigger(): Observable<any> {
    return new Observable<string>(observer => {
      this.socket.on('receive audio', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  //====================== Tic Tac Toe Time Stuff ==================
  sendTicTacToeData(data): void {
    this.socket.emit('gameboard', data);
  }

  getTicTacToeData(): Observable<GameState> {
    return new Observable(obs => {
      this.socket.on('new gameboard', (data) =>{
        obs.next(data);
      });
    });
  }
}

