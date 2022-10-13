import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose';
const graphqlSchema = require("./schema")
const graphqlResolvers = require("./resolvers")

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)
const uri = `mongodb://admin:letmein@it2810-67.idi.ntnu.no:27017/songs?authSource=admin`
mongoose
  .connect(uri, { 
      useUnifiedTopology: true, 
      useNewUrlParser: true 
    })
  .then(() => app.listen(3000, console.log("Server is running")))
  .catch(error => {
    throw error
  })