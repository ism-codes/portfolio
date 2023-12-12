import { Injectable } from '@angular/core';
import { SpotifyAuthService } from './spotifyAuth.service';
import { SpotifyService } from './spotify.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthCoordinatorService {
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private spotifyService: SpotifyService
  ) { }

  loginAndFetchProfile() {
    this.spotifyAuthService.initiateLogin();
  }

  completeAuthentication(code: string) {
    this.spotifyAuthService.exchangeCodeForToken(code).subscribe(
      response => {
        const accessToken = response.access_token;
        this.spotifyService.getProfile(accessToken).subscribe(
          profile => {
            console.log('User Profile:', profile);
            this.userProfileSubject.next(profile); // Emit the profile to subscribers
          },
          error => {
            console.error('Error fetching user profile:', error);
          }
        );
      },
      error => {
        console.error('Error exchanging code for token:', error);
      }
    );
  }
}
