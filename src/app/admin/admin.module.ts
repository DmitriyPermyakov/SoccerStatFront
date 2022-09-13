import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppAdminRoutingModule } from './app-admin-routing.module';
import { CreateLeagueComponent } from './league/create-league/create-league.component';
import { UpdateLeagueComponent } from './league/update-league/update-league.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { UpdateTeamComponent } from './team/update-team/update-team.component';

@NgModule({
  declarations: [
    CreateLeagueComponent,
    CreateTeamComponent,
    UpdateLeagueComponent,
    UpdateTeamComponent
  ],
  imports: [
    AppAdminRoutingModule,
    SharedModule
  ],
  exports: [
    AppAdminRoutingModule
  ]
})
export class AdminModule { }
