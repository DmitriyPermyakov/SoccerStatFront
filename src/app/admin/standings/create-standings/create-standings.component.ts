import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { League, Match, Team } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { MatchService } from 'src/app/services/match-service.service';
import { TeamService } from 'src/app/services/team-service.service';

@Component({
  selector: 'app-create-standings',
  templateUrl: './create-standings.component.html',
  styleUrls: ['./create-standings.component.scss']
})
export class CreateStandingsComponent implements OnInit, OnDestroy {
  public teams: Team[] = [];
  public leagues: League[] = [];
  public form: FormGroup;
  public submitted: boolean = false;

  private matchSub: Subscription;
  private leagueSub: Subscription;
  private teamSub: Subscription;
  
  constructor(private teamService: TeamService, private leagueService: LeagueService, private matchService: MatchService) {
    this.form = new FormGroup({
      dateInput: new FormControl('', Validators.required),
      timeInput: new FormControl('', Validators.required),
      statusInput: new FormControl('', [Validators.required]),
      league: new FormControl('', Validators.required),
      homeTeam: new FormControl('', [ Validators.required ]),
      awayTeam: new FormControl('', [ Validators.required]),
      homeTeamFulltime: new FormControl('0', [ Validators.required, Validators.min(0), Validators.max(100)]),
      awayTeamFulltime: new FormControl('0', [ Validators.required, Validators.min(0), Validators.max(100)]),
      homeTeamExtratime: new FormControl('0', [ Validators.min(0), Validators.max(100)]),
      awayTeamExtratime: new FormControl('0', [ Validators.min(0), Validators.max(100)]),
      homeTeamPenalties: new FormControl('0', [ Validators.min(0), Validators.max(100)]),
      awayTeamPenalties: new FormControl('0', [ Validators.min(0), Validators.max(100)])
    })  
  }

  ngOnInit(): void {
    this.leagueSub = this.leagueService.getAll()
      .subscribe(l => {
        this.leagues = l;
      });

    this.teamSub = this.teamService.getAll()
      .subscribe((t) => {
        this.teams = t; 
      });        
  }

  ngOnDestroy(): void {
    if(this.matchSub) {
      this.matchSub.unsubscribe();
    }

    if(this.leagueSub) {
      this.leagueSub.unsubscribe();
    }

    if(this.teamSub) {
      this.teamSub.unsubscribe();
    }
  }
  openPicker(target) {    
    if('showPicker' in Object.getPrototypeOf(target)) {
      target.showPicker();
    }
  }  

  validateScoreInput(event) {
    if(event.keyCode < 48 && event.keyCode > 57 && event.keyCode < 93 && event.keyCode > 105) {
      event.target.value = '';
    }
    
    if(event.target.value > 100 || event.target.value < 0) {
      event.target.value = '';
    }

    if(event.target.value.length > 1 && event.target.value[0] == 0) {
      event.target.value = event.target.value.slice(1);
    }
  }

  clickScore(event) {
    event.target.value = '';
  }

  validateTeam() {
    let awayTeam = this.form.get('awayTeam');
    let homeTeam = this.form.get('homeTeam');
    
    if(homeTeam.value === awayTeam.value || homeTeam.value == "" || awayTeam.value == "") {
      homeTeam.setErrors({ teamError: true});
      awayTeam.setErrors({ teamError: true });
      homeTeam.markAsTouched();
      awayTeam.markAsTouched();
    } else {
      homeTeam.setErrors(null);
      awayTeam.setErrors(null);
    }
  }

  clear() {    
    this.form.reset();
    this.form.patchValue({ statusInput: '' });
    this.form.patchValue({ league: ''});
    this.form.patchValue({ homeTeam: '' });
    this.form.patchValue({ awayTeam: ''});
    this.form.patchValue({ homeTeamFulltime: 0 });
    this.form.patchValue({ awayTeamFulltime: 0});
    this.form.patchValue({ homeTeamExtratime: 0});
    this.form.patchValue({ awayTeamExtratime: 0});
    this.form.patchValue({ homeTeamPenalties: 0});
    this.form.patchValue({ awayTeamPenalties: 0});
  }
 
  submit() {
    this.submitted = true;

    const date = new Date(Date.parse(this.form.value.dateInput + ' ' + this.form.value.timeInput));
    
    const match: Match = {
      id: '00000000-0000-0000-0000-000000000000',
      date: date,    
      status: this.form.value.statusInput,
      leagueId: this.form.value.league,
      homeTeamId: this.form.value.homeTeam,
      awayTeamId: this.form.value.awayTeam,
      homeTeamFullTime: this.form.value.homeTeamFulltime,
      awayTeamFullTime: this.form.value.awayTeamFulltime,
      homeTeamExtraTime: this.form.value.homeTeamExtratime == '' ? 0 : this.form.value.homeTeamExtratime,
      awayTeamExtraTime: this.form.value.awayTeamExtratime == '' ? 0 : this.form.value.awayTeamExtratime,
      homeTeamPenalties: this.form.value.homeTeamPenalties == '' ? 0 : this.form.value.homeTeamPenalties,
      awayTeamPenalties: this.form.value.homeTeamPenalties == '' ? 0 : this.form.value.awayTeamPenalties  
    }    

    this.matchSub = this.matchService.create(match)
      .subscribe(() => {
        this.submitted = false;
        this.form.reset();
      });
  }
}
