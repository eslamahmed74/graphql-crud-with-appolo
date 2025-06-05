import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import { usersCompanyLoader, companyUsersLoader } from "./utils/dataloader.js";

const PORT = process.env.PORT || 8000;

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// route
app.get("/", (req, res) => {
  res.send("Welcome To Express Server!");
});

// Connect to MongoDB with error handling
connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully");

    // route
    app.get("/", (req, res) => {
      res.send("Welcome To Express Server!");
    });

    // it willbe excuted
    app.use(
      "/graphql",
      graphqlHTTP((req, res, graphQLParams) => {
        return {
          schema,
          graphiql: { headerEditorEnabled: true },
          context: {
            token: req.headers.authorization || null,
            usersCompanyLoader: usersCompanyLoader(),
            companyUsersLoader: companyUsersLoader()
          },
          customFormatErrorFn: err => {
            // graphiql: true,
            console.error("GraphQL Error:", err.message);
            return {
              message: err.message,
              locations: err.locations,
              path: err.path
            };
          }
        };
      })
    );

    // General error handling middleware (catch all errors)
    app.use((err, req, res, next) => {
      console.error("Express Error:", err.stack);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: err.message });
    });

    app.listen(PORT, () => {
      console.log(`Express server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
