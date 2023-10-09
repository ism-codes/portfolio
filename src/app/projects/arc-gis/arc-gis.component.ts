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
import {Observable, Observer} from 'rxjs';
import {MatTabsModule} from '@angular/material/tabs';
import Feature from "@arcgis/core/widgets/Feature.js";

import Point from "@arcgis/core/geometry/Point.js";
export interface TabTest{
  label: string;
  content: Component;
}

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
      autoSelect: true,
      
      container: "searchDiv",
      locationEnabled:true
    });



    const search2 = new Search({
      autoSelect: true,
      
      container: "searchDiv2",
      locationEnabled:true
    });
    const search3 = new Search({
      autoSelect: true,
      
      container: "searchDiv3",
      locationEnabled:true
    });
    const map2 = new Map({
      basemap: "arcgis-navigation-night"
    });
    
    const view2 = new MapView({
      map: map2,
      center:[ 0,0],
      zoom: 1, // Zoom level
      container: "mapDivRoute", // Div element
    });
    search2.on(("search-complete"),  (event) =>{ 
      console.log(event.results[0].results[0].extent.xmax);
      console.log(event.results[0].results[0].extent.ymax);
      console.log(event);
      var startCoordLong = event.results[0].results[0].extent.xmax
      var startCoordLat = event.results[0].results[0].extent.ymax
      let point = {
        type: "point",  // autocasts as new Point()
        longitude: startCoordLong,
        latitude: startCoordLat
      };
      let pt = new Point({
        x: startCoordLong,
        y: startCoordLat,
      });
      view2.center = pt;
      view2.zoom= 10;
      if (view2.graphics.length <= 1) {
        addGraphic("departure", point,view2);
        
        
      } else {
        view2.graphics.removeAt(0);
        view2.graphics.removeAt(1);
        console.log(view2.graphics)
        addGraphic("departure", point,view2)
        getRoute(view2)
      }
      
    });
    search3.on(("search-complete"),  (event) =>{ 
      console.log(event.results[0].results[0].extent.xmax);
      console.log(event.results[0].results[0].extent.ymax);
      console.log(event);
      
      var endCoordLong = event.results[0].results[0].extent.xmax
      var endCoordLat = event.results[0].results[0].extent.ymax
      
      let point = {
        type: "point",  // autocasts as new Point()
        longitude: endCoordLong,
        latitude: endCoordLat
      };
      let point2 = {  // autocasts as new Point()
        longitude: endCoordLong,
        latitude: endCoordLat
      };
      let pt = new Point({
        x: endCoordLong,
        y: endCoordLat,
      });
      view2.center = pt;
      view2.zoom= 10;
      console.log(view2.graphics)
      if (view2.graphics.length === 1) {
        addGraphic("destination", point,view2);
        getRoute(view2);
        
      } else {
        view2.graphics.removeAt(1);
        view2.graphics.removeAt(1);
        console.log(view2.graphics)
        addGraphic("destination", point,view2)
        getRoute(view2);
      }
      
      
    });

    const po = new Point()

    search.on(("search-complete"),  (event) =>{ 
      document.getElementById("results")!.innerHTML = "";
      console.log(event.results[0].results[0].extent.xmax);
      console.log(event.results[0].results[0].extent.ymax);
      console.log(event);
      var html = event.searchTerm;
      
      
      
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


    const feat = new Feature({
      container: "feature"

    })
    
    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    view.on("click", function(event){
      if (view.graphics.length === 0) {
        addGraphic("origin", event.mapPoint,view);
      } else if (view.graphics.length === 1) {
        addGraphic("destination", event.mapPoint,view);
        getRoute(view);
        
      } else {
        view.graphics.removeAll();
        addGraphic("origin",event.mapPoint,view);
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
    function addGraphic(type: any, point: any ,selectedview: any) {
      const graphic = new Graphic({
        symbol: simpleMarkerSymbol,
        geometry: point
      });
      selectedview.graphics.add(graphic);
    }
    function getRoute(viewoption:any)  {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: viewoption.graphics.toArray()
        }),
        startTime: 	1696554486,
        findBestSequence:true,
        returnDirections: true,
        
      });
    route.solve(routeUrl, routeParams)
      .then(function(data: any) {
        data.routeResults.forEach(function(result: any) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
            };
            viewoption.graphics.add(result.route);
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
          viewoption.ui.empty("top-right");
          viewoption.ui.add(directions, "top-right");
          var drivingTime$ = data.routeResults[0].directions.totalDriveTime
          var drivingDist$ = data.routeResults[0].directions.totalLength
          drivingTime$ = (drivingTime$).toFixed(0)
          drivingDist$ = (drivingDist$).toFixed(1)
          document.getElementById("DriveTimeResult")!.innerHTML = (drivingTime$+' minutes')
          document.getElementById("DriveDistanceResult")!.innerHTML = (drivingDist$+' miles')
          console.log('\nDriving Time: ',drivingTime$,'\nDriving Distantce: ',drivingDist$)
          return drivingTime$;
        }
        
      })
    }
  };
  
  

  ngOnDestroy() {
    console.log('home destroyed')}
}


