import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueService } from 'src/app/services/league-service.service';

@Component({
  selector: 'app-edit-delete-button',
  templateUrl: './edit-delete-button.component.html',
  styleUrls: ['./edit-delete-button.component.scss']
})
export class EditDeleteButtonComponent implements OnInit {
  public isVisible: boolean = true;
  @Input() cardId: string;

  constructor(private router:Router, private leagueService: LeagueService) { }

  ngOnInit(): void {
  }

  showPopup() {
    this.isVisible = !this.isVisible;
  }

  edit() {
    this.isVisible = !this.isVisible;
    console.log(this.cardId);
    this.router.navigate([`/admin/leagues/${this.cardId}/edit`]);
  }

  delete() {
    this.leagueService.delete(this.cardId)
      .subscribe(() => {
        this.isVisible = !this.isVisible
      });
  }

}
