import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../interfaces/interfaces';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: Status): string {    
    switch(Number(value)) {
      case 0: 
        return 'SCHEDULED';
      break;
      case 1: 
        return 'LIVE';
      break;
      case 2: 
        return 'IN_PLAY';
      break;
      case 3: 
        return 'PAUSED';
      break;
      case 4: 
        return 'FINISHED';
      break;
      case 5: 
        return 'POSTPONED';
      break;
      case 6:  
        return 'SUSPENDED';
      break;
      case 7: 
        return 'CANCELED';
      break;     
    }
    return null;
  }

}
