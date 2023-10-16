import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
const headerType: Object = {
  "Access-Control-Request-Headers": "*",
  "api-key": "MXuiOZsLA8IVvwQhguF3yS6cZMD9wvSlJzaR1RKMe5wyZhpigJ65TH7lJK0ZbvGd",
  "Accept": "application/json",
  "Content-Type": "application/json"
};
const MongoObject: Object = {}
export interface ProjectSingleObject{
  document?:{
  Description?:string,
  Name?:string,
  ProjectID?:number}
}
export interface ProjectMultiObject{
  documents?:{
    [indexValue: number]: {
      Description?:string,
    Name?:string,
    ProjectID?:number
    },
    length?: number
    
  }
  
}
export interface ProjectMultiObjectTable{
    
    Description?:string,
    Name?:string,
    ProjectID?:number
    
    
    
  }
  

@Component({
  selector: 'app-mongo-testing',
  templateUrl: './mongo-testing.component.html',
  styleUrls: ['./mongo-testing.component.css']
})



export class MongoTestingComponent {
  
  value = 1;
  url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/findOne";
  apiKey = "QdyzEIIL08I8SakMNJ6AD9Hz7enPxf2rjMchc61xVbUGuCM4MkjKyUcn4eKhQVbQ"
  clusterName = "PortfolioDB"
  databaseName = "IsmaelKhan"
  collectionName = "Portfolio"
  bodyType = {
  
  } 
  // /action/insertOne
  // /action/updateOne
  // /action/insertMany
  name!: string;
  description!: string;
  projectid!: number;
  constructor(private http: HttpClient){}
//Gets one object from database
  SingleProjectFormat:ProjectSingleObject[]=[]
  async getOne(){
    this.url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/findOne";
    this.bodyType= {
      "dataSource": "PortfolioDB",
     "database": "IsmaelKhan",
     "collection": "Portfolio",
     "filter": { "ProjectID": this.value }
    };
     this.SingleProjectFormat=[]
    const getOneObject = await this.http.post(this.url,this.bodyType,headerType).subscribe({
      next: (MongoObject) => {console.log(MongoObject);this.SingleProjectFormat.push(MongoObject); this.getOneObjectData()},
      error: (e) => console.error(e),
      complete: () => console.info('complete')}).unsubscribe;
  }
  async getOneObjectData(){
    let dataPulled = this.SingleProjectFormat[0].document
    this.name = dataPulled!.Name!;
    this.description = dataPulled!.Description!;
    this.projectid = dataPulled!.ProjectID!;
    }
//Gets multiple objects from database

    ManyProjectFormat:ProjectMultiObject[]=[]
    ManyProjectTableFormat:ProjectMultiObjectTable[]=[{Description: '',
      Name:'',
      ProjectID: 0 }]
    dataSource = this.ManyProjectTableFormat
    displayedColumns: string[] = ['ProjectID', 'Name', 'Description'];
    async getMany(){
      this.url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/find";
      this.bodyType= {
        "dataSource": "PortfolioDB",
       "database": "IsmaelKhan",
       "collection": "Portfolio",
       "filter": { "ProjectID": { "$gt": 0 } }
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
      this.dataSource=this.dataSource.sort((a,b) => a.ProjectID! - b.ProjectID!)
      console.log(this.dataSource)
    }
    ProjectSort(datas: any){
      for (let i = 0; i < datas.length!; i++) {
        const value = datas[i];
        this.ManyProjectTableFormat.push(value);
      }
    }

    projectIDSubmit = ''
    projectTitleSubmit = ''
    descriptionSubmit = ''
     async insertOne(){
      this.url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/insertOne";
      this.bodyType= {
        "dataSource": "PortfolioDB",
       "database": "IsmaelKhan",
       "collection": "Portfolio",
       "document": { 
        "ProjectID": Number(this.projectIDSubmit),
        "Name": this.projectTitleSubmit,
        "Description": this.descriptionSubmit }
      };
      const getOneObject = await this.http.post(this.url,this.bodyType,headerType).subscribe({
        next: (MongoObject) => {console.log(MongoObject)},
        error: (e) => console.error(e),
        complete: () => console.info('complete')}).unsubscribe;
    }
     }