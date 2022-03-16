const MongoClient = require("mongodb").MongoClient;
 // for support env
 const path = require("path");
 require("dotenv").config({
   path: path.resolve(__dirname, "../../../.env")
 });
 
 let database = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
 
 MongoClient.connect(
   database,
   {
     useUnifiedTopology: true
   },
   async function (err, client) {
     if (!err) {
        console.log(`==============>${process.env.DB_NAME} connected`);
        
        var dbo = client.db(process.env.DB_NAME);
  
        try {  
            await dbo.collection("users").deleteMany({ _id: { $ne: "" } });

            await dbo.collection("users").insertOne({
                emailAddress : "wappnet@gmail.com",
                password : "$2b$10$CEz6WvqkqDLHwvGBKPPL3eu7Ei8mJ5onLuifrHShJGjhSS9Eq8gBy"
            })
            console.error("==============>inserted login record");
        } catch (err) {
          console.error(err);
          console.error("==============>Failed");
        }
        client.close();
        process.exit();
     } else {
       console.error(`==============>Error while connect ${process.env.DB_NAME}`);
       console.error(err);
     }
   }
 );
 
 