import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSquaresComponent } from './components/game-squares/game-squares.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { MakeroomComponent } from './components/makeroom/makeroom.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { RulesComponent } from './components/rules/rules.component';
import { StatsComponent } from './components/stats/stats.component';
import { WaitroomComponent } from './components/waitroom/waitroom.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'makeroom',component: MakeroomComponent},
  {path: 'game',component: GameComponent},
  {path: 'gamesquares',component: GameSquaresComponent},
  {path: 'rooms',component: RoomsComponent},
  {path: 'stats',component: StatsComponent},
  {path: 'waitroom',component: WaitroomComponent},
  {path: 'rules',component: RulesComponent}
];
// {path: ,component: },
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
