const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const app = express();

app.use(express.json());

// database connection
let dbConnectionObject
connectToDb((err) => {
  if( !err ) {
    app.listen(5000,() => {
      console.log("listning");
    })
    dbConnectionObject = getDb();
  }
});

// home path
app.get("/",(req,res) => {
    res.json({data:["task 1", "task 2", "task 4"]});
})

// get requests
app.get("/anime",(req,res) => {getResolver(res,"anime","Watch")});
app.get("/manga",(req,res) => {getResolver(res,"manga","Read")});
app.get("/movie",(req,res) => {getResolver(res,"movie","Watch")});
app.get("/tv-series",(req,res) => {getResolver(res,"tv-series","Watch")});
app.get("/book",(req,res) => {getResolver(res,"book","Read")});
app.get("/audio-book",(req,res) => {getResolver(res,"audio-book","Listen")});
app.get("/webtoon",(req,res) => {getResolver(res,"webtoon","Read")});
app.get("/documentary",(req,res) => {getResolver(res,"documentary","Watch")});
app.get("/songs",(req,res) => {getResolver(res,"songs","Listen")});

function getResolver(res,type,deed) {
  let List = [];
  dbConnectionObject.collection(type)
  .find()
  .forEach(item => List.push(item))
  .then(() => {
    let completed = type == "songs" ? "Listened" : "Completed";
    let data = [];
    if( type != "songs" ) {
      data.push({"status": `Currently ${deed}ing`, "list": List.filter( item => item.status === 1 )});
    }
    data.push({"status": `${completed}`, "list": List.filter( item => item.status === 2 )});
    if( type != "songs" ) {
      data.push({"status": `On Hold`, "list": List.filter( item => item.status === 3 )});
    }
    data.push({"status": `Dropped`, "list": List.filter( item => item.status === 4 )});
    data.push({"status": `Plan to ${deed}`, "list": List.filter( item => item.status === 6 )});
    res.status(200).json(data);
  })
  .catch(() => {
    res.status(500).json({error: "Couldn't fetch documents!!!!"})
  });
}

// get by id requests
app.get("/anime/:id",(req,res) => {getByIDResolver(req,res,"anime")});
app.get("/manga/:id",(req,res) => {getByIDResolver(req,res,"manga")});
app.get("/movie/:id",(req,res) => {getByIDResolver(req,res,"movie")});
app.get("/tv-series/:id",(req,res) => {getByIDResolver(req,res,"tv-series")});
app.get("/book/:id",(req,res) => {getByIDResolver(req,res,"book")});
app.get("/audio-book/:id",(req,res) => {getByIDResolver(req,res,"audio-book")});
app.get("/webtoon/:id",(req,res) => {getByIDResolver(req,res,"webtoon")});
app.get("/documentary/:id",(req,res) => {getByIDResolver(req,res,"documentary")});
app.get("/songs/:id",(req,res) => {getByIDResolver(req,res,"songs")});

function getByIDResolver(req,res,type) {
  if( !ObjectId.isValid(req.params.id) ) {
    return res.status(500).json({error: "Invalid ID"})
  }
  dbConnectionObject.collection(type)
  .findOne({_id: ObjectId(req.params.id)})
  .then(item => {
    res.status(200).json(item);
  })
  .catch(() => {
    res.status(500).json({error: "Couldn't fetch documents!!!!"})
  });
}

// get carousel images request
app.get("/carousel-image/:type",(req,res) => {getCarouselImagesResolver(req,res,"carousel-image")});

function getCarouselImagesResolver(req,res,type) {
  let contentType = req.params.type;
  dbConnectionObject.collection(type)
  .findOne({contentType: contentType})
  .then(item => {
    res.status(200).json(item);
  })
  .catch(() => {
    res.status(500).json({error: "Couldn't fetch documents!!!!"})
  });
}

// post requests ~ create new element
app.post("/add-new", async (req,res) => {
  const obj = req.body;
  try {
    const x = await dbConnectionObject.collection(obj.collection).insertOne(obj.data);
    res.status(200).json(x);
  } catch(error) {
    res.status(400).json({error: error});
  }
});

// delete requests
app.delete("/anime/:id",(req,res) => {deleteResolver(req,res,"anime")});
app.delete("/manga/:id",(req,res) => {deleteResolver(req,res,"manga")});
app.delete("/movie/:id",(req,res) => {deleteResolver(req,res,"movie")});
app.delete("/tv-series/:id",(req,res) => {deleteResolver(req,res,"tv-series")});
app.delete("/book/:id",(req,res) => {deleteResolver(req,res,"book")});
app.delete("/audio-book/:id",(req,res) => {deleteResolver(req,res,"audio-book")});
app.delete("/webtoon/:id",(req,res) => {deleteResolver(req,res,"webtoon")});
app.delete("/documentary/:id",(req,res) => {deleteResolver(req,res,"documentary")});
app.delete("/songs/:id",(req,res) => {deleteResolver(req,res,"songs")});

function deleteResolver(req,res,type) {
  if( !ObjectId.isValid(req.params.id) ) {
    return res.status(500).json({error: "Invalid ID"});
  }
  dbConnectionObject.collection(type)
  .deleteOne({_id: ObjectId(req.params.id)})
  .then(item => {
    res.status(200).json(item);
  })
  .catch(() => {
    res.status(500).json({error: "Couldn't fetch documents!!!!"});
  });
}

// update requests
app.patch("/anime/:id",(req,res) => {updateResolver(req,res,"anime")});
app.patch("/manga/:id",(req,res) => {updateResolver(req,res,"manga")});
app.patch("/movie/:id",(req,res) => {updateResolver(req,res,"movie")});
app.patch("/tv-series/:id",(req,res) => {updateResolver(req,res,"tv-series")});
app.patch("/book/:id",(req,res) => {updateResolver(req,res,"book")});
app.patch("/audio-book/:id",(req,res) => {updateResolver(req,res,"audio-book")});
app.patch("/webtoon/:id",(req,res) => {updateResolver(req,res,"webtoon")});
app.patch("/documentary/:id",(req,res) => {updateResolver(req,res,"documentary")});
app.patch("/songs/:id",(req,res) => {updateResolver(req,res,"songs")});

function updateResolver(req,res,type) {
  if( !ObjectId.isValid(req.params.id) ) {
    return res.status(500).json({error: "Invalid ID"});
  }
  dbConnectionObject.collection(type)
  .updateOne({_id: ObjectId(req.params.id)},{$set: req.body},{new:true})
  .then(item => {
    res.status(200).json(item);
  })
  .catch(() => {
    res.status(500).json({error: "Couldn't fetch documents!!!!"});
  });
}
