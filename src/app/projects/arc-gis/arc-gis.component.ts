import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import Map from "@arcgis/core/Map.js";
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import Search from '@arcgis/core/widgets/Search';
import { PlaceFind } from './placefind/placefind.service';
import esriConfig from "@arcgis/core/config.js"
import * as route from "@arcgis/core/rest/route.js"
import RouteParameters from '@arcgis/core/rest/support/RouteParameters.js'
import FeatureSet from '@arcgis/core/rest/support/FeatureSet.js'
import Graphic from '@arcgis/core/Graphic.js'
import { over, round } from 'cypress/types/lodash';
@Component({
  selector: 'app-arc-gis',
  templateUrl: './arc-gis.component.html',
  styleUrls: ['./arc-gis.component.css']
})
export class ArcGISComponent implements OnInit {
  placeurl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?"
  appCall: any;
  coordCall: any;
  drivingTime: any;
  drivingDist: any;
  constructor(public appService: PlaceFind) {}
  datas!: number;
  ngOnInit() {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const search = new Search({
      container: "searchDiv"
    });

    search.on("search-complete",  (event) =>{ 
      document.getElementById("results")!.innerHTML = "";
      console.log('event', event);
      var html = "";
      event!.results[0].results.forEach(function (result) {
        html = html +''+ event.searchTerm
      });
      
      document.getElementById("results")!.innerHTML = html;
      this.appCall=this.appService.getConfig(html);
      this.coordCall=this.appService.getCoord(html);
      console.log(this.coordCall)
    });
    


    esriConfig.apiKey="AAPK5c928794591042709bc8fbfe5277f506L61TaOqI9tSpQ14zCyIoUivahGVw1OMcUR_gRPn38GmmQjsm8FqS9y0ak5mmdNjh";
    const map = new Map({
    basemap: "arcgis-navigation-night"
  });

    const view = new MapView({
      map: map,
      center: [-117.182270,34.055810], // Longitude, latitude
      zoom: 12, // Zoom level
      container: "mapDiv", // Div element
    });
    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    view.on("click", function(event){
      if (view.graphics.length === 0) {
        addGraphic("origin", event.mapPoint);
      } else if (view.graphics.length === 1) {
        addGraphic("destination", event.mapPoint);
        getRoute();
        
      } else {
        view.graphics.removeAll();
        addGraphic("origin",event.mapPoint);
      }
    });
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],  // Orange
      outline: {
        color: [255, 255, 255], // White
        width: 1
      }
    };
    const simpleLine = {
      type: "simple-line",
              color: [5, 150, 255],
              width: 3
    };
    function addGraphic(type: any, point: any) {
      const graphic = new Graphic({
        symbol: simpleMarkerSymbol,
        geometry: point
      });
      view.graphics.add(graphic);
    }
    function getRoute()  {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: view.graphics.toArray()
        }),
        
        returnDirections: true
        
      });
    route.solve(routeUrl, routeParams)
      .then(function(data: any) {
        data.routeResults.forEach(function(result: any) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
            };
          view.graphics.add(result.route);
        });
        if (data.routeResults.length > 0) {
          const directions = document.createElement("ol");
          directions.classList.value = "esri-widget esri-widget--panel esri-directions__scroller";
          directions.style.marginTop = "0";
          directions.style.padding = "15px 15px 15px 30px";
          var drive = data.routeResults[0].directions.totalDriveTime
          const dist = data.routeResults[0].directions.totalLength
          const features = data.routeResults[0].directions.features;
          
          features.forEach(function(result:any,i:any){
            const direction = document.createElement("li");
            direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
            directions.appendChild(direction);
            
          });
          view.ui.empty("top-right");
          view.ui.add(directions, "top-right");
          var drivingTime$ = data.routeResults[0].directions.totalDriveTime
          var drivingDist$ = data.routeResults[0].directions.totalLength
          drivingTime$ = (drivingTime$).toFixed(0)
          drivingDist$ = (drivingDist$).toFixed(1)
          document.getElementById("DTresult")!.innerHTML = (drivingTime$+' minutes')
          document.getElementById("DDresult")!.innerHTML = (drivingDist$+' miles')
          console.log('\nDriving Time: ',drivingTime$,'\nDriving Distantce: ',drivingDist$)
          return drivingTime$;
        }
        
      })
    }
  };
  
  

  ngOnDestroy() {
    console.log('home destroyed')}
}


