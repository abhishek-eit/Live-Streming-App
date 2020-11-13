import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TwilioService } from "../services/twilio.service";

import { connect, createLocalTracks } from "twilio-video";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent implements OnInit {
  roomName: any;
  accessToken: any;

  constructor(
    private route: ActivatedRoute,
    private twilioService: TwilioService,
    private cookieService: CookieService
  ) {
    this.roomName = this.route.snapshot.params.name;
    this.accessToken = this.cookieService.get("access_token");
    console.log(this.roomName, this.accessToken);

    createLocalTracks({
      audio: true,
      video: { width: 640 },
    })
      .then((localTracks) => {
        console.log(localTracks);
        return connect(this.accessToken, {
          name: this.roomName,
          tracks: localTracks,
        });
      })
      .then(
        (room: any) => {
          console.log(`Successfully joined a Room: ${room}`);
          room.on("participantConnected", (participant) => {
            console.log(`A remote Participant connected: ${participant}`);
          });
        },
        (error) => {
          console.error(`Unable to connect to Room: ${error.message}`);
        }
      );
  }

  ngOnInit(): void {}
}
