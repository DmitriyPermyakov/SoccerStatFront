import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { RegisterComponent } from './register/register.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/leagues', pathMatch: 'full' },
  { path: 'leagues', component: LeaguesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/standings', component: StandingsComponent },
  { path: 'leagues/standings', component: StandingsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
