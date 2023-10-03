import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import Search from '@arcgis/core/widgets/Search';
import { PlaceFind } from './placefind/placefind.service';
@Component({
  selector: 'app-arc-gis',
  templateUrl: './arc-gis.component.html',
  styleUrls: ['./arc-gis.component.css']
})
export class ArcGISComponent implements OnInit {
  placeurl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?"
  appCall: any;
  coordCall: any;
  constructor(public appService: PlaceFind) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const search = new Search({
      container: "searchDiv"
    });

    search.on("search-complete",  (event) =>{ 
      document.getElementById("results")!.innerHTML = "";
      // console.log('event', event);
      var html = "";
      event!.results[0].results.forEach(function (result) {
        html = html +''+ event.searchTerm
      });
      
      document.getElementById("results")!.innerHTML = html;
      this.appCall=this.appService.getConfig(html);
      this.coordCall=this.appService.getCoord(html);
    });
  };
  

  ngOnDestroy() {
    console.log('home destroyed')}
}


