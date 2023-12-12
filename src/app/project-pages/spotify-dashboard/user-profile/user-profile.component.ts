import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyAuthCoordinatorService } from '../spotify-utilities/SpotifyAuthCoordinator.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: any;

  constructor(
    private spotifyAuthCoordinator: SpotifyAuthCoordinatorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.spotifyAuthCoordinator.completeAuthentication(code);
    }

    // Subscribe to changes in the user profile
    this.spotifyAuthCoordinator.userProfile$.subscribe(profile => {
      this.profile = profile;
    });
  }
}
