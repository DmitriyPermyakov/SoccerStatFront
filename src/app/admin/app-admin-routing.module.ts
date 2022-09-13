import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LeaguesComponent } from "../leagues/leagues.component";
import { CreateLeagueComponent } from "./league/create-league/create-league.component";
import { UpdateLeagueComponent } from "./league/update-league/update-league.component";
import { CreateTeamComponent } from "./team/create-team/create-team.component";
import { UpdateTeamComponent } from "./team/update-team/update-team.component";

const routes: Routes = [
    { path: '', redirectTo: '/leagues', pathMatch: 'full' },
    { path: 'leagues/create',component: CreateLeagueComponent },
    { path: 'leagues/:id/edit', component: UpdateLeagueComponent },
    { path: 'teams/create', component: CreateTeamComponent },
    { path: 'teams/:id/edit', component: UpdateTeamComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppAdminRoutingModule {}