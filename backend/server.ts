import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose, { ConnectOptions } from 'mongoose';
const graphqlSchema = require("./schema")
const graphqlResolvers = require("./resolvers")

const app = express()
const port:Number = 4000

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)
const uri:string = `mongodb://admin:letmein@it2810-67.idi.ntnu.no:27017/songs?authSource=admin`
mongoose
  .connect(uri, { 
      useUnifiedTopology: true, 
      useNewUrlParser: true 
    } as ConnectOptions)
  .then(() => app.listen(port, () => console.log("Server is running on port", port)))
  .catch(error => {
    throw error
  })