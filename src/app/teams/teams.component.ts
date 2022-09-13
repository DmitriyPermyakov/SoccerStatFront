import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Team } from '../interfaces/interfaces';
import { CreateModalService } from '../services/create-modal.service';
import { TeamService } from '../services/team-service.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {
  public teams: Team[];
  public searchTerm: string = '';

  private getSubscription: Subscription;


  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getSubscription = this.teamService.getAll()
      .subscribe((t) => {
        this.teams = t;
      });
  }

  ngOnDestroy(): void {
    if(this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }

  updateTeams(id: string) {
    this.teams = this.teams.filter((t) => t.id !== id);
  }
}
