import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { League } from 'src/app/interfaces/interfaces';
import { LeagueService } from 'src/app/services/league-service.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent implements OnInit, OnDestroy {
  public icon: string = '';
  public form: FormGroup;
  public uploading: boolean = false;
  @ViewChild('submitButton') button;

  private createSub: Subscription;  
  private uploadProgress: number = 0;
  private imageUrl: string = environment.defaultIcon;  

  constructor(private leagueService: LeagueService,
     private router: Router,
     private uploadService: UploadImageService) { }

  ngOnDestroy(): void {
    if(this.createSub)
      this.createSub.unsubscribe();    
  }

  ngOnInit(): void {
    this.form = new FormGroup({      
      leaguename: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    })
    this.icon = environment.defaultIcon;
  }

  uploadImage(files) {
    this.uploading = true;
    this.uploadService.uploadImage(files)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);          
        }          
        else if(event.type === HttpEventType.Response)
          this.icon = this.imageUrl = event.body.url;
      },
      error => {
        console.log(error);
      }).add(() => {
        this.uploading = false;
      });    
  }

  clear() {
    this.form.reset();
  }

  submit() {
    const league: League = {
      id: '00000000-0000-0000-0000-000000000000',
      imageUrl: this.imageUrl,
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
