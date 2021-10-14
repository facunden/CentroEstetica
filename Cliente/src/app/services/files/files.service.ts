import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {defer, Observable, of} from "rxjs";
import {catchError, delay, retry, retryWhen, switchMap, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File,fileOptions){
    const token = localStorage.getItem('apiToken');
    const endpoint = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&access_token=${token}`;
    const formData: FormData = new FormData();
    let jsonse = JSON.stringify(fileOptions);
    let blob = new Blob([jsonse], {type: "application/json"});
    formData.append('name', blob);
    formData.append('file', fileToUpload);
    return this.http.post(endpoint, formData, {observe: "response"});
  }

  getFolders(){
    const token = localStorage.getItem('apiToken');
    const q = `mimeType = 'application/vnd.google-apps.folder' and '17hDLuWfKnffSBEbT4BUuQykc3WiUbsUX' in parents`
    const endpoint = `https://www.googleapis.com/drive/v3/files?access_token=${token}&q=${q}`
    return this.http.get(endpoint);
  }

  findClientFolder(name){
    let token = localStorage.getItem('apiToken');
    let q = `mimeType = 'application/vnd.google-apps.folder' and name = '${name}'`;
    return this.http.get('https://www.googleapis.com/drive/v3/files?access_token='+token+'&q='+q).pipe(
      retryWhen(errors => errors.pipe(
        tap(() => this.refreshToken().subscribe(res =>{
          localStorage.setItem('apiToken',res.access_token);
          window.location.reload();
        })),
        take(1)))
    );
  }

  findItemsInFolder(id){
    const token = localStorage.getItem('apiToken');
    const q = `'${id}' in parents`;
    const endpoint = `https://www.googleapis.com/drive/v3/files?access_token=${token}&q=${q}&fields=files(*)`;
    return this.http.get(endpoint);
  }

  getFile(id){
    const token = localStorage.getItem('apiToken');
    const endpoint = `https://www.googleapis.com/drive/v3/files/${id}?access_token=${token}&fields=webViewLink`;
    return this.http.get(endpoint);
  }

  createFolder(name){
    const token = localStorage.getItem('apiToken');
    let folder = {
      "name": name,
      "mimeType": "application/vnd.google-apps.folder"
    }
    return this.http.post('https://www.googleapis.com/drive/v3/files?access_token='+token,folder);
  }

  refreshToken(): Observable <any>{
    let token = {
      "client_id": "9993682516-6hlon9lugbouemnpjl24e59kjcek0fff.apps.googleusercontent.com",
      "client_secret": "p92yIypMWII55gfGNjEVpfve",
      "refresh_token": localStorage.getItem('refresh_token'),
      "grant_type": "refresh_token"
    }
    return this.http.post('https://oauth2.googleapis.com/token',token)
  }

}
