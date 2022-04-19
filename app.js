const express = require("express")
const Path = require("Path")
const app = express()
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")

const dataBasePath = Path.join(__dirname,"cricketTeam.db")

let dateBase = null

const intializeDbAndServer = ()=>{
    try{
        database = open({
        filename:dataBasePath,
        driver:sqlite3.Database,
    })
    app.listen(3000,()=>
    console.log("serve Running at http:Localhost:3000/"))
    }catch(error){
        console.log(`DB ERROR:${erro.message}`)
        process.exit(1)
    }
    
}
intializeDbAndServer()
const covertObjectToResponseObject = (dbObject){
    return playerid:dbObject.player_id,
           playerName:dbObject.player_name,
           playerNumber:dbObject.jersey_Number,
           role:dbObject.role
}
app.get("/players/",async (request,response)=>{
     let getPlayerQuery = `
     SELECT 
     * 
     FROM 
     cricket_team`
     const getPlayerList = await dateBase.all(getPlayerQuery)

     response.send(playerArray.map((eachPlayer)=>
     covertObjectToResponseObject(eachPlayer)))

})