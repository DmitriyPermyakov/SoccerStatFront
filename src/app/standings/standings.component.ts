import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { MatchResponse } from '../interfaces/interfaces';
import { MatchService } from '../services/match-service.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit, OnDestroy {  
  public standings: MatchResponse[] = [];
  private matchSub: Subscription;  
  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    console.log(id);
    let typeOfQuery = this.route.snapshot.queryParams['type'];
    if(typeOfQuery === 'team') {
      this.matchSub = this.matchService.getMatchByTeamId(id)
        .subscribe(m => {
          this.standings = m;
        });
    } else if(typeOfQuery === 'league') {
      this.matchSub = this.matchService.getMatchByLeagueId(id)
        .subscribe(m => {
          this.standings = m;
        });
    }
    
  }

  ngOnDestroy(): void {
    if(this.matchSub) {
      this.matchSub.unsubscribe();
    }
  }
}
