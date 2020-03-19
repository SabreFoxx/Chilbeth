import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { FillableForm } from 'src/services/fillable-form';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public uploadImage(initiatingContainer: FillableForm, formData) {
    initiatingContainer.actionPending();
    this.http.post('http://localhost:3000/api/upload', formData, { headers: { "Authorization": "Bearer " + this.authService.getToken() } })
      .subscribe(res => {
        console.log(res); // TODO remove
        initiatingContainer.actionSuccess();
      });
  }

}
