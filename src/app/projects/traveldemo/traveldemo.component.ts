import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
export const BUTTONS: ButtonLayout[] = [
  {pagename: "", name: 'Main Page'},
  {pagename: "current-projects/TravelDemo", name: 'My Travel'},
  {pagename: "current-projects/TravelDemo", name: 'New Travel'},
  {pagename: "current-projects/TravelDemo", name: 'Search Travel'},
]
const headerType: Object = {
  "Access-Control-Request-Headers": "*",
  "api-key": "MXuiOZsLA8IVvwQhguF3yS6cZMD9wvSlJzaR1RKMe5wyZhpigJ65TH7lJK0ZbvGd",
  "Accept": "application/json",
  "Content-Type": "application/json"
};
const MongoObject: Object = {}

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
  export interface ButtonLayout {
    pagename: string;
    name: string;
}

@Component({
  selector: 'app-traveldemo',
  templateUrl: './traveldemo.component.html',
  styleUrls: ['./traveldemo.component.css']
})
export class TraveldemoComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public buttonList = BUTTONS
  constructor(private breakpointObserver: BreakpointObserver, public router: Router,private http: HttpClient) {}
  
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
    displayedColumns: string[] = ['EmployeeID', 'FirstName', 'LastName'];
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
     }


