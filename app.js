const express = require("express");
const app = express();
const path = require("Path");
const { open } = required("sqlite");
const sqlite3 = reqired("sqlite3");
const dataPath = path.join(__dirname, "cricketTeam.db");
app.use(express.json())
let dataBase = null;

const intializeDbAndServer = async () => {
  try {
     dataBase = await open({
      filename: dataPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => 
      console.log("Server Running at https://localhost:3000/");
    );
  } catch (error) {
    console.log(`DB Error:${error.message}`);
    process.exit(1);
  }
};
intializeDdAndServer();


const covertDbObjectToResponseObject = (dbObject)=>{
    return{
        playerId:dbObject.player_id,
        playerName:dbObject.player_name,
        jerseyNumber:dbObject.jersey_number,\
        role:dbObject.role,
    }
}

//API//

app.get("/players/",async (request,response)=>{
    const getQueryPlayer = `
    SELECT * FROM cricket_team`
    const player_get = await dataBase.all(getQueryPlayer)
    response.send(player_get.map((eachPlayer)=>covertDbObjectToResponseObject(eachPlayer)
    )
    )
)}

//API 2 //

app.get("/players/",async(request,response)=>{
    const {playerName,jerseyName,role} = request.body

    const creatingPlayerDetails = `
    INERT INTO cricket_team(player_name,jersey_name,role)
    VALUES
    (${playerName},${jersetName},${role})`
    const playerDetails = await dataBase.run(creatingPlayerDetails)
    response.send("Player Added to Team")
})

//API 3 // 

app.get("/players/:playerId/",async (request,response)=>{
    const {playerId} = request.params
    const getQueryBasedOnId =`
    SELECT
    * FROM cricket_team WHERE player_id = ${playerId};`
    const playerDetails = await.dataBase.run(getQueryBasedOnId)
    response.send(covertDbObjectToResponseObject(playerDetails))
}

//API 4 //

app.put("/players/:playerId/",async(request,response)=>{
    const {playerId} = request.params
    const {playerName,jerseyName,role} = request.body
    const updateDetailsOfPlayer = `
    UPDATE cricket_team
    SET
    player_name = ${playerName},
    jersey_name = ${jerseyName},
    role = ${role}
    WHERE player_id = ${playerId}`
    const updateDetails = await dataBase.run(updateDetailsOfPlayer)
    response.send("Player Details Updated")

})

)

// API 5 // 

app.delete("/players/:playerId/",async (request ,response)=>{
    const {playerId} = request.params

    const Deletequery = `
    DELETE 
     FROM cricket-team WHERE player_id = ${playerId}`
     await dataBase.run(Deletequery)
     response.send("Player Removed")
})

module.exports = app;