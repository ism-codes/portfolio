import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private apiBaseUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  getProfile(accessToken: string): Observable<any> {
    const url = `${this.apiBaseUrl}/me`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    const options = { headers: headers };

    return this.http.get(url, options);
  }
}
