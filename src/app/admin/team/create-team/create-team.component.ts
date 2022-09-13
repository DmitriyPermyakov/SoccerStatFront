import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { League, Team } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { TeamService } from 'src/app/services/team-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public leagues: League[];

  private createSub: Subscription;
  @ViewChild('submitButton') button;

  constructor(private teamService: TeamService, private leagueService: LeagueService, private router: Router) { }

  ngOnDestroy(): void {
    if(this.createSub)
      this.createSub.unsubscribe();
  }

  ngOnInit(): void {
    this.leagueService.getAll()
      .subscribe((resp) => {
        this.leagues = resp;
      });

    this.form = new FormGroup({
      teamname: new FormControl(null, Validators.required),
      leaguename: new FormControl('Select league', [Validators.required]) // Create regex validator
    });
  }

  submit() {
    this.button.nativeElement.innerText = 'Loading';

    const team: Team = {
      id: '00000000-0000-0000-0000-000000000000',
      name: this.form.value.teamname,
      imageUrl: '',
      leagueId: this.form.value.leaguename
    }

    this.createSub = this.teamService.create(team)
      .subscribe(() => {
        this.form.reset();
        this.button.nativeElement.innerText = 'Submit';
        this.router.navigate(['/teams']);
      },
      (error) => {
        console.log(error);
      });
  }

  clear() {
    this.form.reset();
  }

  toCards() {
    this.router.navigate(['/teams']);
  }
}
