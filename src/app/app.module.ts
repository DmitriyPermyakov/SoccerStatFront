import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TeamsComponent } from './teams/teams.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { LeagueCardComponent } from './league-card/league-card.component';
import { SearchComponent } from './search/search.component';
import { StandingsComponent } from './standings/standings.component';
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { SharedModule } from './shared/shared.module';
import { ModalComponent } from './modal/modal.component';
import { SearchPipe } from './pipes/search.pipe';
import { EditDeleteButtonComponent } from './admin/edit-delete-button/edit-delete-button.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamsComponent,
    LeaguesComponent,
    TeamCardComponent,
    LeagueCardComponent,
    SearchComponent,
    StandingsComponent,
    PlayersComponent,
    PlayerCardComponent,
    ModalComponent,
    SearchPipe,
    EditDeleteButtonComponent,
    ClickOutsideDirective,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
