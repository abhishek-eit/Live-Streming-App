var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var twilio = require("twilio");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = "ACac01fcae37fe37daa8789ac923b3c65d";
const authToken = "a552748be47f8bc7778df5dffb587f89";
const client = require("twilio")(accountSid, authToken);

app.post("/create-room", (req, res) => {
  let data = req.body;
  client.video.rooms
    .create({
      type: "peer-to-peer",
      uniqueName: data.roomId,
    })
    .then(
      (room) => {
        console.log(room.sid);
        res.json({ status: 1, room_name: room.uniqueName });
      },
      (err) => {
        console.log(error);
        res.json({ status: 0 });
      }
    );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
