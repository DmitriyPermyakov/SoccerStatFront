import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrentIdServiceService {
  public currentId$: Subject<string> = new Subject<string>();

  setId(id: string) {
    this.currentId$.next(id);
  }
}
