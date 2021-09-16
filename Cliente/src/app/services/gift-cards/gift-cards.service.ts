import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appSettings} from "../../models/appSettings";
import {Observable} from "rxjs";
import {GiftCard} from "../../models/giftCard";

@Injectable({
  providedIn: 'root'
})
export class GiftCardsService {

  token = localStorage.getItem('token');
  
  constructor(private http: HttpClient) { }

  crearGiftCard(giftCard): Observable<any> {
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.post(`${appSettings.API_URI}/gift-cards/`,giftCard,{headers});
  }

  getAllGiftCards(): Observable<GiftCard[]> {
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.get<GiftCard[]>(`${appSettings.API_URI}/gift-cards/getAll`,{headers});
  }

  changeState(giftCard): Observable<any> {
    const headers = ({'authorization': "Bearer " + this.token})
    return this.http.put(`${appSettings.API_URI}/gift-cards/`,giftCard,{headers});
  }
  
}
