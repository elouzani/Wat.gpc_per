import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {

  baseServerUrl = "https://localhost:44378/api/";
constructor(private http: HttpClient) { }

getAppareil(id:number){
  return this.http.get(this.baseServerUrl + "Lots/" +id);
}

}
