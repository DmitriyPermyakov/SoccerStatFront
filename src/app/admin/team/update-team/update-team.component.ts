import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription, switchMap, tap} from 'rxjs';
import { League, Team } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { TeamService } from 'src/app/services/team-service.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public leagues: League[] = [];

  private updateSub: Subscription;
  private teamId: string = '';


  constructor(private teamService: TeamService,
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private router: Router) {
      this.form = new FormGroup({
        teamname: new FormControl(''),
        leaguename: new FormControl('')
      })
    }

  ngOnInit(): void {

    Promise.all([

      firstValueFrom(this.route.params.pipe(
          switchMap(params => {
            return this.teamService.getById(params['id']);
          }),
          tap(t => {
            this.teamId = t.id;
          })
        )
      ),

      firstValueFrom(this.leagueService.getAll())
        .then(l => this.leagues = l)
    ]).then(([team, leagues]) => {
      this.leagues = leagues;

      this.form = new FormGroup({
        teamname: new FormControl(team.name, Validators.required),
        leaguename: new FormControl(team.leagueId, Validators.required)
      });
    });
  }

  ngOnDestroy(): void {
    if(this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  submit() {
    const team: Team = {
      id: this.teamId,
      imageUrl: '',
      name: this.form.value.teamname,
      leagueId: this.form.value.leaguename
    };

    this.updateSub = this.teamService.update(team)
      .subscribe(
        () => this.router.navigate(['/teams']),
        (error) => { console.log(error) }
      )
  }

  clear() {
    this.form.reset();
  }

  toCards() {
    this.router.navigate(['/teams'])
  }
}
