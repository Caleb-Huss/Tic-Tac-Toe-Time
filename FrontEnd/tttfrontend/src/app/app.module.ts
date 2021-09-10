import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MakeroomComponent } from './components/makeroom/makeroom.component';
import { TimerComponent } from './components/timer/timer.component';
import { GameComponent } from './components/game/game.component';
import { GameSquaresComponent } from './components/game-squares/game-squares.component';
import { Socket } from 'socket.io-client';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    MakeroomComponent,
    TimerComponent,
    GameComponent,
    GameSquaresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
