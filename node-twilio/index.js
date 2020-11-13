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
const twilioApiKey = "SK6508c2c84cadf75097b5ee18f617ee3a";
const twilioApiSecret = "A6havN7GyOJUWK8WLxSP8euUUHirfXkF";

const client = twilio(accountSid, authToken);
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.post("/create-room", (req, res) => {
  let data = req.body;
  client.video.rooms
    .create({
      type: "peer-to-peer",
      uniqueName: data.roomId,
    })
    .then(
      (room) => {
        // create Access Token
        const identity = data.userName;
        const videoGrant = new VideoGrant({
          room: data.roomId,
        });

        const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret, {
          identity: identity,
        });
        token.addGrant(videoGrant);

        console.log(token.toJwt());

        res.json({ status: 1, room_name: room.uniqueName, token: token.toJwt() });
      },
      (err) => {
        console.log(error);
        res.json({ status: 0 });
      }
    );
});

app.post("/join-room", (req, res) => {
  let data = req.body;
  try {
    // create Access Token
    const identity = data.userName;
    const videoGrant = new VideoGrant({
      room: data.roomId,
    });

    const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret, {
      identity: identity,
    });
    token.addGrant(videoGrant);

    console.log(token.toJwt());

    res.json({ status: 1, room_name: data.roomId, token: token.toJwt() });
  } catch (error) {
    console.log(error);
    res.json({ status: 0 });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
