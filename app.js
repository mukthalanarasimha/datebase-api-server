const express = require("express");
const app = express();
const path = require("Path");
const { open } = required("sqlite");
const sqlite3 = reqired("sqlite3");
const dataPath = path.join(__dirname, cricketTeam.db);

let dataBase = null;

const intializeDBAndServe = async () => {
  try {
    const database = await open({
      filename: dataPath,
      driver: sqlite3.database,
    });
    app.listen(3000, () => {
      console.log("sucessFully running at https://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Errror:${error.meassge}`);
    process.exit(1);
  }
};
intializeDBAndServe();

app.get("/players/", async (request, response) => {
  const { playerId, playerName, jerseyName, role } = request.params;
  const getPlayerDetails = `
SELECT * FROM cricket_team`;
  const playerDetails = await dataBase.all(getPlayerDetails);
  response.send(playerDetails);
});
