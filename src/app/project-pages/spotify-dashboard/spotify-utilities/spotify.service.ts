import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Add your Spotify API token logic here
    const token = 'BQDsiAKLRNe6xRTEjKM7M3c58zjfgQqgTwBva9hQ0TN5jwve8AMDLNw5j-v4bxvN-T451bpYJN9LPUHHLdIlS7HNrKwDJf9pk1Z9ftXJYtsDZdZ5gwY';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserProfile(): Observable<any> {
    const url = `${this.apiUrl}/me`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getUserPlaylists(): Observable<any> {
    const url = `${this.apiUrl}/me/playlists`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getPlaylistTracks(playlistId: string): Observable<any> {
    const url = `${this.apiUrl}/playlists/${playlistId}/tracks`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }
}