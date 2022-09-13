import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from '../interfaces/interfaces';
import { TeamService } from '../services/team-service.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnDestroy {
  @Input() team: Team;
  @Output() onDeleteTeam: EventEmitter<string> = new EventEmitter<string>();

  public isButtonVisible: boolean = true;

  private deleteTeamSubscription: Subscription;

  constructor(private router: Router, private teamService: TeamService) { }

  ngOnDestroy(): void {
    if(this.deleteTeamSubscription) {
      this.deleteTeamSubscription.unsubscribe();
    }
  }

  showPopup() {
    this.isButtonVisible = !this.isButtonVisible;
  }

  edit() {
    this.isButtonVisible = true;
    this.router.navigate([`/admin/teams/${this.team.id}/edit`]);
  }

  delete() {
    this.deleteTeamSubscription = this.teamService.remove(this.team.id)
      .subscribe(() => {
        this.isButtonVisible = true;
        this.onDeleteTeam.emit(this.team.id);
      });
  }

}
