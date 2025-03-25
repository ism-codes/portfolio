import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
}
)
export class PlaceFind {
  constructor(private http: HttpClient) { }
  placeURL = 'https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&token=AAPK5c928794591042709bc8fbfe5277f506L61TaOqI9tSpQ14zCyIoUivahGVw1OMcUR_gRPn38GmmQjsm8FqS9y0ak5mmdNjh&text=';
  coordURL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&token=AAPK5c928794591042709bc8fbfe5277f506L61TaOqI9tSpQ14zCyIoUivahGVw1OMcUR_gRPn38GmmQjsm8FqS9y0ak5mmdNjh&address=';
getConfig(val: string) {
  return this.http.get(this.placeURL+val);
}
getCoord(val: string) {
  console.log(this.http.get(this.coordURL+val))
    return this.http.get(this.coordURL+val);
}

}
