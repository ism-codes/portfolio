import { Component, OnInit } from '@angular/core';
import { SpotifyAuthCoordinatorService } from './spotify-utilities/SpotifyAuthCoordinator.service';

@Component({
  selector: 'app-spotify-dashboard',
  templateUrl: './spotify-dashboard.component.html',
  styleUrls: ['./spotify-dashboard.component.css']
})
export class SpotifyDashboardComponent implements OnInit {

  constructor(private spotifyAuthCoordinator: SpotifyAuthCoordinatorService) { }

  login() {
    this.spotifyAuthCoordinator.loginAndFetchProfile();
  }

  ngOnInit() {
  }

}
