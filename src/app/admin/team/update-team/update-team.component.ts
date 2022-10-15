import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription, switchMap, tap} from 'rxjs';
import { League, Team } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { TeamService } from 'src/app/services/team-service.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public leagues: League[] = [];
  public icon: string = '';
  public uploading: boolean = false;
  public uploadProgress: number = 0;

  private updateSub: Subscription;
  private teamId: string = '';
  private imageUrl: string = '';


  constructor(private teamService: TeamService,
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadImageService) {
      this.form = new FormGroup({
        teamname: new FormControl(''),
        leaguename: new FormControl('')
      });
      this.icon = environment.defaultIcon;
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

  uploadImage(file) {
    this.uploading = true;
    this.uploadService.uploadImage(file)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if(event.type === HttpEventType.Response) {
          this.icon = this.imageUrl = event.body.url
        }
      },
      error => {
        console.log(error)
      }).add(() => {
        this.uploading = false;
      })
  }

  submit() {
    const team: Team = {
      id: this.teamId,
      imageUrl: this.imageUrl,
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
