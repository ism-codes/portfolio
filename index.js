const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://AngularPortfolioAccount:Xcktc2EXnTpLH1iA@portfoliodb.ziq3ida.mongodb.net/PortfolioDB?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function getter() {
    try {
        
        const database = client.db('IsmaelKhan');
        const porfoliodb = database.collection('Portfolio');
    
        // Query for a movie that has the title 'Back to the Future'
        const query = { ProjectID: 1 };
        const project = await porfoliodb.findOne(query);
        //const doc = { ProjectID: 4, Name: "New Project", Description: "Testing" };
        //const result = await porfoliodb.insertOne(doc);
        //console.log(`A document was inserted with the _id: ${result.insertedId}`,);
        
        console.log(project);
        console.log(project.Name)
        
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}
async function run() {
  try {
    
    // Query for a movie that has the title 'Back to the Future'
    //const query = { ProjectID: 1 };
    //const project = await porfoliodb.findOne(query);
    const doc = { ProjectID: 4, Name: "New Project", Description: "Testing" };
    const result = await porfoliodb.insertOne(doc);
    console.log(
    `A document was inserted with the _id: ${result.insertedId}`,
    );
    
    //console.log(project);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

getter().catch(console.dir);