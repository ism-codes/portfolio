import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { type } from 'os';
import { entries } from 'cypress/types/lodash';
import { any } from 'cypress/types/bluebird';
const headerType: Object = {
  "Access-Control-Request-Headers": "*",
  "api-key": "MXuiOZsLA8IVvwQhguF3yS6cZMD9wvSlJzaR1RKMe5wyZhpigJ65TH7lJK0ZbvGd",
  "Accept": "application/json",
  "Content-Type": "application/json"
};
const testmong: Object = {}
export interface typerrs{
  document?:{
  Description?:string,
  Name?:string,
  ProjectID?:number}
}
@Component({
  selector: 'app-mongo-testing',
  templateUrl: './mongo-testing.component.html',
  styleUrls: ['./mongo-testing.component.css']
})



export class MongoTestingComponent {
  url = "https://us-west-2.aws.data.mongodb-api.com/app/data-byvgz/endpoint/data/v1/action/findOne";
  apiKey = "QdyzEIIL08I8SakMNJ6AD9Hz7enPxf2rjMchc61xVbUGuCM4MkjKyUcn4eKhQVbQ"
  clusterName = "PortfolioDB"
  databaseName = "IsmaelKhan"
  collectionName = "Portfolio"
  bodyType = {
    "dataSource": "PortfolioDB",
    "database": "IsmaelKhan",
    "collection": "Portfolio",
    "filter": {
        "ProjectID": 1
    }
  
} 
  testerrr:typerrs[]=[]
  name!: string;
  description!: string;
  projectid!: number;
  constructor(private http: HttpClient){}
  async getPost() {
     const guy = await this.http.post(this.url,this.bodyType,headerType).subscribe({
      next: (testmong) => {this.testerrr.push(testmong); this.getMon()},
    error: (e) => console.error(e),
    complete: () => console.info('complete')}).unsubscribe;
    
    
    }
    async getMon(){
      
      let dataPulled = this.testerrr[0].document
      this.name = dataPulled!.Name!;
      this.description = dataPulled!.Description!;
      this.projectid = dataPulled!.ProjectID!;
      
      
      
      }
     
     
     }
  
  /**client = new MongoClient(this.uri);
  async getter() {
    try {
        
        const database = this.client.db('IsmaelKhan');
        const porfoliodb = database.collection('Portfolio');
    
        // Query for a movie that has the title 'Back to the Future'
        const query = { ProjectID: 1 };
        const project = await porfoliodb.findOne(query);
        //const doc = { ProjectID: 4, Name: "New Project", Description: "Testing" };
        //const result = await porfoliodb.insertOne(doc);
        //console.log(`A document was inserted with the _id: ${result.insertedId}`,);
        
        console.log(project);
        console.log(project!['Name'])
        
      } finally {
        // Ensures that the client will close when you finish/error
        await this.client.close();
      }
}*/

  


