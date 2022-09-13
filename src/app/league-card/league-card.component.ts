import { AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { League } from '../interfaces/interfaces';
import { LeagueService } from '../services/league-service.service';

@Component({
  selector: 'app-league-card',
  templateUrl: './league-card.component.html',
  styleUrls: ['./league-card.component.scss']
})
export class LeagueCardComponent implements OnInit, OnDestroy {
  @Input() public league: League;
  @Output() public onLeagueDelete: EventEmitter<string> = new EventEmitter<string>();

  public isButtonVisible: boolean = true;

  private deleteSubscription: Subscription;

  constructor(private router: Router, private leagueService: LeagueService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if(this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  showPopup() {
    this.isButtonVisible = !this.isButtonVisible;
  }

  edit() {
    this.isButtonVisible = true;
    this.router.navigate([`/admin/leagues/${this.league.id}/edit`]);
  }

  delete() {
    this.deleteSubscription = this.leagueService.delete(this.league.id)
      .subscribe(() => {
        this.isButtonVisible = true;
        this.onLeagueDelete.emit(this.league.id);
      });
  }
}
