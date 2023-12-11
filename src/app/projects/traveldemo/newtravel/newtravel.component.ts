import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClient } from '@angular/common/http';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf,JsonPipe, formatDate, DatePipe,AsyncPipe } from '@angular/common';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import Search from '@arcgis/core/widgets/Search';

const headerType: Object = {
  "Access-Control-Request-Headers": "*",
  "api-key": "MXuiOZsLA8IVvwQhguF3yS6cZMD9wvSlJzaR1RKMe5wyZhpigJ65TH7lJK0ZbvGd",
  "Accept": "application/json",
  "Content-Type": "application/json"
};
const MongoObject: Object = {}
const LocationObject: Object = {}
export interface ProjectMultiObject{
  documents?:{
    [indexValue: number]: {
      EmployeeID?:number
      FirstName?:string,
      LastName?:string,
      TravelLocation?:string,
      TravelStartDate?:string,
      TravelEndDate?:string
    },
    length?: number
    
  }

  
}

export interface ProjectMultiObjectTable{
  EmployeeID?:number
  FirstName?:string,
  LastName?:string,
  TravelLocation?:string,
  TravelStartDate?:string,
  TravelEndDate?:string
  }
  interface LocationSuggestions {
    text: string;
    magicKey: string;
  }
  
  interface AutoSuggestions {
    suggestions: LocationSuggestions[];
  }
@Component({
  selector: 'app-newtravel',
  templateUrl: './newtravel.component.html',
  styleUrls: ['./newtravel.component.css']
})
export class NewtravelComponent implements OnInit {
  userInput!: string;
  locationControl = new FormControl();
  filteredOptions!: Observable<LocationSuggestions[]>;

  ngOnInit() {
    this.filteredOptions = this.locationControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((inputedLoc: string) => this.getSuggestions(inputedLoc))
    );
    const search = new Search({
      autoSelect: true,
      
      container: "searchDiv",
      locationEnabled:true
    });
    
  }
  
  
  public range = new FormGroup({
    'start': new FormControl(''),
    'end': new FormControl(''),
  });
  dateSend(){
    let formatStartDate  = this.travelStartSubmit = this.range.controls['start'].value
    let formatEndDate = this.travelEndSubmit = this.range.controls['end'].value
    let upD = formatDate(this.range.controls['start'].value, 'fullDate','en-US')
    console.log(formatStartDate)
    console.log(formatEndDate)
    console.log(upD)
  }
  value = 1;
  url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/findOne";
  apiKey = "QdyzEIIL08I8SakMNJ6AD9Hz7enPxf2rjMchc61xVbUGuCM4MkjKyUcn4eKhQVbQ"
  clusterName = "PortfolioDB"
  databaseName = "TravelDemoDB"
  collectionName = "TravelDemoData"
  bodyType = {
  
  } 
  // /action/insertOne
  // /action/updateOne
  // /action/insertMany
  name!: string;
  description!: string;
  projectid!: number;
  
//Gets one object from database
//Gets multiple objects from database
    TableShowing = false
    ManyProjectFormat:ProjectMultiObject[]=[]
    ManyProjectTableFormat:ProjectMultiObjectTable[]=[{
      EmployeeID:0,
      FirstName:'',
      LastName:'',
      TravelLocation:'',
      TravelStartDate:'',
      TravelEndDate:''
    }]
    
    dataSource = this.ManyProjectTableFormat
    displayedColumns: string[] = ['EmployeeID', 'FirstName', 'LastName','TravelLocation','TravelStartDate','TravelEndDate'];
    async getMany(){
      this.url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/find";
      this.bodyType= {
        "dataSource": "PortfolioDB",
       "database": "TravelDemoDB",
       "collection": "TravelDemoData",
       "filter": { "EmployeeID": { "$gt": 0 } }
      };
       this.ManyProjectFormat=[]
      const getManyObjects = await this.http.post(this.url,this.bodyType,headerType).subscribe({
        next: (MongoObject) => {console.log(MongoObject);this.ManyProjectFormat.push(MongoObject); this.getManyObjectData()},
        error: (e) => console.error(e),
        complete: () => console.info('complete')}).unsubscribe;
    }
    
    async getManyObjectData(){
      
      let dataPulled = this.ManyProjectFormat[0].documents!
      this.ManyProjectTableFormat = []
      let projects = {}
      for (let i = 0; i < dataPulled.length!; i++) {
        const value = dataPulled[i];
        this.ManyProjectTableFormat.push(value);
      }
      
      this.dataSource = this.ManyProjectTableFormat
      this.dataSource=this.dataSource.sort((a,b) => a.EmployeeID! - b.EmployeeID!)
      console.log(this.dataSource)
      this.TableShowing = true
    }
    employeeIDSubmit = ''
    firstNameSubmit = ''
    lastNameSubmit = ''
    travelLocationSubmit = ''
    travelStartSubmit = this.range.controls['start'].value
    travelEndSubmit = this.range.controls['end'].value
    
     async insertOne(){
      this.dateSend()
      this.travelStartSubmit = this.range.controls['start'].value
      this.travelEndSubmit = this.range.controls['end'].value
      this.travelLocationSubmit = this.locationControl.value
      this.url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/insertOne";
      this.bodyType= {
        "dataSource": "PortfolioDB",
       "database": "TravelDemoDB",
       "collection": "TravelDemoData",
       "document": { 
        "EmployeeID":Number(this.employeeIDSubmit),
        "FirstName":this.firstNameSubmit,
        "LastName":this.lastNameSubmit,
        "TravelLocation":this.travelLocationSubmit,
        "TravelStartDate":this.travelStartSubmit,
        "TravelEndDate":this.travelEndSubmit
        }
      };
      const getOneObject = await this.http.post(this.url,this.bodyType,headerType).subscribe({
        next: (MongoObject) => {console.log(MongoObject)},
        error: (e) => console.error(e),
        complete: () => console.info('complete')}).unsubscribe;
        this.employeeIDSubmit = ''
        this.firstNameSubmit = ''
        this.lastNameSubmit = ''
        this.locationControl.setValue('');
        this.range.controls['start'].setValue('');
        this.range.controls['end'].setValue('');
    }
    constructor(private http: HttpClient) {}






    
    
    getSuggestions(inputedLoc: string): Observable<LocationSuggestions[]> {
      const apiToken = "AAPK5c928794591042709bc8fbfe5277f506L61TaOqI9tSpQ14zCyIoUivahGVw1OMcUR_gRPn38GmmQjsm8FqS9y0ak5mmdNjh";
      const EsriUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${inputedLoc}&category=Populated%20Place&f=json&token=${apiToken}`;
  
      return this.http.get<AutoSuggestions>(EsriUrl).pipe(
        map((response: AutoSuggestions) => response.suggestions || [])
      );
    }
  
    displayFn(location: LocationSuggestions): string {
      return location && location.text ? location.text : '';
    }
  
    onOptionSelected(event: any) {
      const selectedLocation: LocationSuggestions = event.option.value;
      this.locationControl.setValue(selectedLocation.text);
      // Handle the selected option here
      console.log(this.locationControl.value)
    }
  
      
     ngOnDestroy() {
      console.log('home destroyed')};
  }