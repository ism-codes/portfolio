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
import { any } from 'cypress/types/bluebird';
import { event } from 'cypress/types/jquery';
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
  public trythis!: string;
  constructor(public appService: PlaceFind) {}
  datas!: number;
  
  
  ngOnInit() {
    var IDParms;
    IDParms = "test"
    let testrun;
    testrun = 'Hello'
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
      search.on(("search-complete"),  (event) =>{ 
      document.getElementById("results")!.innerHTML = "";
      var html = event.searchTerm;
      
      
      
      document.getElementById("results")!.innerHTML = html;
    });
    
    search2.on(("search-complete"),  (event) =>{ 
      var startCoordLong = event.results[0].results[0].extent.center.longitude
      var startCoordLat = event.results[0].results[0].extent.center.latitude
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
        
        addGraphic("departure", point,view2)
        getRoute(view2, "DriveTimeResult2", "DriveDistanceResult2",map2,'instructions2');
      }
      return [startCoordLong,startCoordLat];
      
    });
    
      search3.on(("search-complete"),  (event) =>{ 
      console.log(event);
      
      var endCoordLong = event.results[0].results[0].extent.center.longitude
      var endCoordLat = event.results[0].results[0].extent.center.latitude
      
      
      let point = {
        type: "point",  // autocasts as new Point()
        longitude: endCoordLong,
        latitude: endCoordLat
      };
      
      let pt = new Point({
        x: endCoordLong,
        y: endCoordLat,
      });
      
      
      view2.center= pt
      view2.zoom= 10;
      view2
      if (view2.graphics.length === 1) {
        addGraphic("destination", point,view2);
        let resulter = getRoute(view2, "DriveTimeResult2", "DriveDistanceResult2",map2,'instructions2');
        
        console.log(view2.graphics);
        
      } else {
        view2.graphics.removeAt(1);
        view2.graphics.removeAt(1);
        console.log(view2.graphics)
        addGraphic("destination", point,view2)
        getRoute(view2, "DriveTimeResult2", "DriveDistanceResult2",map2,'instructions2');
        
      }
      
      
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
    view.ui.empty("top-left");
    view2.ui.empty("top-left");
    const feat = new Feature({
      container: "feature"

    })
    
    const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
    let resultusss = view.on("click", function(event){
      if (view.graphics.length === 0) {
        addGraphic("origin", event.mapPoint,view);
      } else if (view.graphics.length === 1) {
        addGraphic("destination", event.mapPoint,view);
        getRoute(view, "DriveTimeResult", "DriveDistanceResult", map,'instructions');
        
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
    function getRoute(viewoption:any, drivetimeout:string,drivedistout: string, mapchoice:any,viewinstructions: string ){
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: viewoption.graphics.toArray()
        }),
        startTime: 	1696554486,
        findBestSequence:true,
        returnDirections: true,
        
      });
    var routersss = route.solve(routeUrl, routeParams)
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
          const features = data.routeResults[0].directions.features;
          const DirectionData = document.getElementById(viewinstructions) //'instructions'
          document.getElementById(viewinstructions)!.innerHTML = "";
          features.forEach(function(result:any,i:any){
            let instructionoutput = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
            DirectionData!.innerHTML += `<li>${instructionoutput}</>`
            
          });
          var drivingTime$ = data.routeResults[0].directions.totalDriveTime
          var drivingDist$ = data.routeResults[0].directions.totalLength
          drivingTime$ = (drivingTime$).toFixed(0)
          drivingDist$ = (drivingDist$).toFixed(1)
          document.getElementById(drivetimeout)!.innerHTML = (drivingTime$+' minutes')
          document.getElementById(drivedistout)!.innerHTML = (drivingDist$+' miles')
          console.log('\nDriving Time: ',drivingTime$,'\nDriving Distantce: ',drivingDist$)
          
          
          
        }
        
      })
      
     
    }
  };
  
  testing(): any{
    console.log(this.trythis);
  };
  

  ngOnDestroy() {
    console.log('home destroyed')}
}


