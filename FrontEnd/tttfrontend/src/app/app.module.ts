import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MakeroomComponent } from './components/makeroom/makeroom.component';
import { TimerComponent } from './components/timer/timer.component';
import { GameComponent } from './components/game/game.component';
import { GameSquaresComponent } from './components/game-squares/game-squares.component';
import { Socket } from 'socket.io-client';
import { StatsComponent } from './components/stats/stats.component';
import { RulesComponent } from './components/rules/rules.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitroomComponent } from './components/waitroom/waitroom.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    MakeroomComponent,
    TimerComponent,
    GameComponent,
    GameSquaresComponent,
    StatsComponent,
    RulesComponent,
    HomeComponent,
    WaitroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
