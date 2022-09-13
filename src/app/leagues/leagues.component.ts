import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, Subscription } from 'rxjs';
import { League } from '../interfaces/interfaces';
import { LeagueService } from '../services/league-service.service';
import { CreateModalService } from '../services/create-modal.service';
import { UpdateModalService } from '../services/update-modal.service';


@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit, OnDestroy {
  public leagues: League[];
  public searchTerm: string = '';

  private getSubsctiption: Subscription;

  constructor(private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.getSubsctiption =  this.leagueService.getAll()
      .subscribe((l) => {
        this.leagues = l;
      });
  }
  ngOnDestroy(): void {
    if(this.getSubsctiption) {
      this.getSubsctiption.unsubscribe();
    }
  }

  updateLeagues(id: string) {
    this.leagues = this.leagues.filter((league) => league.id !== id);
  }


}
