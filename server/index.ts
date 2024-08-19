import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { MongoClient, ServerApiVersion } from "mongodb";


dotenv.config();
const port = process.env.PORT || 5844;
const app = express();
const password = encodeURIComponent(process.env.SECRET_MONGODB);
const uri = `mongodb+srv://pokemonsv2:${password}@pokemonsv2.uczp40b.mongodb.net/?retryWrites=true&w=majority&appName=Pokemonsv2`;



//middlewares
app.use(express.json());
app.use(cors());

//mongo URI
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  const run = async () => {
    try{
        await client.connect();

         await client.db("admin").command({ ping: 1 });
        console.log(
          "Pinged your deployment. You successfully connected to MongoDB!"
        );
    }
    finally{

    }
    }

    run().catch(error => console.log)

    app.get('/',(req,res)=>{
        res.send('Car Junction Backend Server Running...')
    })

    app.listen(port,()=>{
        console.log(console.log(`Server is running on port ${port}`))
    })

