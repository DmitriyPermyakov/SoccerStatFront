import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { League } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  @ViewChild('submitButton') button;
  private createSub: Subscription;

  constructor(private leagueService: LeagueService, private router: Router) { }

  ngOnDestroy(): void {
    if(this.createSub)
      this.createSub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      //leagueimage: new FormControl(null),
      leaguename: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    })
  }

  clear() {
    this.form.reset();
  }

  submit() {
    const league: League = {
      id: '00000000-0000-0000-0000-000000000000',
      imageUrl: '',
      name: this.form.value.leaguename,
      country: this.form.value.country
    }

    this.button.nativeElement.innerText = 'Loading';

    this.createSub =  this.leagueService.create(league)
      .subscribe(() => {
        this.form.reset();
        this.button.nativeElement.innerText = 'Submit';
        this.router.navigate(['/leagues']);
    })
  }

  toCards() {
    this.router.navigate(['/leagues'])
  }
}
