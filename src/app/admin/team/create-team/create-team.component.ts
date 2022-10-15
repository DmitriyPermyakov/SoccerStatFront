import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { League, Team } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { TeamService } from 'src/app/services/team-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public leagues: League[];
  public uploading: boolean = false;
  public icon: string = ''
  public uploadProgress: number = 0;

  @ViewChild('submitButton') button;
  private createSub: Subscription;  
  private imageUrl: string = '';

  constructor(private teamService: TeamService, 
    private leagueService: LeagueService, 
    private router: Router,
    private uploadService: UploadImageService) { }

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

    this.icon = environment.defaultIcon;
  }

  uploadImage(files) {
    this.uploading = true;
    this.uploadService.uploadImage(files)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if(event.type == HttpEventType.Response) {
          this.icon = this.imageUrl = event.body.url;
        }
      },
      error => {
        console.log(error)
      }).add(() => {
        this.uploading = false
      })
  }

  submit() {
    this.button.nativeElement.innerText = 'Loading';

    const team: Team = {
      id: '00000000-0000-0000-0000-000000000000',
      name: this.form.value.teamname,
      imageUrl: this.imageUrl,
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
