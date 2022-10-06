import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  public uploadImage(files):Observable<any> {
    if(files.lenght === 0)
      return null;

    let fileToUpload = <File>files.item(0);    
    let formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);    
    return this.http.post<any>(`${environment.resourceServerUrl}/UploadImage`, formData, { reportProgress: true, observe: 'events'})
  }
}
