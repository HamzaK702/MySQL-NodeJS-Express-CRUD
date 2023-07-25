// server.js
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import database from './database.js';

const app = express();
const upload = multer();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
// 

// CORS configuration
app.use(cors());

app.get("/goals", (req, res) => {
    const q = "SELECT * FROM goals";
    console.log("GET /goals")
    database.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });


app.post("/addGoal", (req, res) => {
    const q = "INSERT INTO goals(`title`, `desc`, `cover`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
    console.log("POST /addGoal")
    database.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      console.log("New goal added")
      return res.json(data);
      
    });
  });
 
  app.delete("/goal/:id", (req, res) => {
    
    const goalId = req.params.id;
    console.log(`DELETE /goal/`+goalId)
    const q = " DELETE FROM goals WHERE id = ? ";
  
    database.query(q, [goalId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.put("/goal/:id", (req, res) => {
    const goalId = req.params.id;
    const q = "UPDATE goals SET `title`= ?, `desc`= ?, `cover`= ? WHERE id = ?";
    console.log(`UPDATE /goal/`+goalId)
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
  
    database.query(q, [...values,goalId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });


const port = 3001;  
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
