import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { League } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';

@Component({
  selector: 'app-update-league',
  templateUrl: './update-league.component.html',
  styleUrls: ['./update-league.component.scss']
})
export class UpdateLeagueComponent implements OnInit, OnDestroy {

  @ViewChild('submitButton') button;
  public form: FormGroup;

  private updateSub: Subscription;
  private currentId: string;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService, private router: Router) {
    this.form = new FormGroup({
      leagueimage: new FormControl(''),
      country: new FormControl(''),
      leaguename: new FormControl('')
    })
   }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        return this.leagueService.getById(params['id'])
      })
    ).subscribe((league: League) => {
      this.currentId= league.id;
      this.form = new FormGroup({
        leagueimage: new FormControl('', Validators.required),
        country: new FormControl(league.country, Validators.required),
        leaguename: new FormControl(league.name, Validators.required)
      });
    })
  }

  ngOnDestroy(): void {
    if(this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  clear() {
    this.form.reset();
  }

  submit() {
    this.button.nativeElement.innerText = "Loading";

    const league: League = {
      id: this.currentId,
      country: this.form.value.country,
      imageUrl: '',
      name: this.form.value.leaguename
    }

    this.updateSub = this.leagueService.update(league)
      .subscribe(() => {
        this.button.nativeElement.innerText = "Update";
        this.router.navigate(['/leagues']);
      },
      error => {
        console.log(error)
      });
  }

  toCards() {
    this.router.navigate(['/leagues']);
  }

}
