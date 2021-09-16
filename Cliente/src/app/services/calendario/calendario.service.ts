import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private http: HttpClient) { }

  data: any ={access_token:""}

  getEvents(mr,tmin,tmax){
    let token = localStorage.getItem('apiToken')
    let params = {
      access_token: token,
      maxResults:mr,
      timeMin:tmin,
      timeMax:tmax
    }
    return this.http.get('https://www.googleapis.com/calendar/v3/calendars/primary/events',{params,observe: 'response'});
  }

  insertEvent(event){
    const token = localStorage.getItem('apiToken');
    return this.http.post('https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token='+token,event);
  }

  refreshToken(): Observable <any>{

    let token = {
      "client_id": "357505571325-6s6v5d4m6401hi3d0i7gf7m3joqvtn5a.apps.googleusercontent.com",
      "client_secret": "tEg3Of6OzzuJydtaUYji1rQF",
      "refresh_token": localStorage.getItem('refresh_token'),
      "grant_type": "refresh_token"
    }
    return this.http.post('https://oauth2.googleapis.com/token',token)
  }
}
