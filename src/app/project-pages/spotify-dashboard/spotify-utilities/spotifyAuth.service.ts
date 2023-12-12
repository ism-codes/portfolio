import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  private client_id = '047f6f34558846e4ac5ee0fe1de0f619';
  private client_secret = '9cb7315266614ca2b834d59aef786938';
  private redirect_uri = 'http://localhost:4200/spotify-demo'; // Update with your app's URL

  constructor(private http: HttpClient) { }

  // Step 1: Redirect to Spotify for user authorization
  initiateLogin() {
    const state = this.generateRandomString(16);
    const scope = 'user-read-private user-read-email';
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${scope}&redirect_uri=${this.redirect_uri}&state=${state}`;
    window.location.href = url;
  }

  // Step 2: Exchange code for access token (all done on the client side)
  exchangeCodeForToken(code: string): Observable<any> {
    const body = {
      code: code,
      redirect_uri: this.redirect_uri,
      grant_type: 'authorization_code'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret)
    });

    const options = { headers: headers };

    return this.http.post('https://accounts.spotify.com/api/token', this.urlEncode(body), options);
  }

  private generateRandomString(length: number): string {
    // Implement your own random string generation logic
    return 'randomString';
  }

  private urlEncode(obj: any): string {
    const urlSearchParams = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        urlSearchParams.append(key, obj[key]);
      }
    }
    return urlSearchParams.toString();
  }
}
