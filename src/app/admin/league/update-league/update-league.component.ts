import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { League } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-league',
  templateUrl: './update-league.component.html',
  styleUrls: ['./update-league.component.scss']
})
export class UpdateLeagueComponent implements OnInit, OnDestroy {

  @ViewChild('submitButton') button;
  @ViewChild('leagueImage') leagueImage: ElementRef;
  public form: FormGroup;
  public uploading: boolean = false;
  public uploadProgress: number = 0;
  public icon: string = '';

  private updateSub: Subscription;
  private currentId: string;  

  constructor(private route: ActivatedRoute,
    private leagueService: LeagueService, 
    private router: Router,
    private uploadService: UploadImageService) {
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
      this.leagueImage.nativeElement.src = league.imageUrl;
      this.form = new FormGroup({        
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

  uploadImage(files) {
    this.uploading = true;

    this.uploadService.uploadImage(files)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total)
        } else if (event.type === HttpEventType.Response) {
          this.icon = this.leagueImage.nativeElement.src = event.body.url;
        }
      },
      error => {
        console.log(error)
      }).add(() => {
        this.uploading = false;
      })
  }

  submit() {
    this.button.nativeElement.innerText = "Loading";

    const league: League = {
      id: this.currentId,
      country: this.form.value.country,
      imageUrl: this.leagueImage.nativeElement.src,
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
