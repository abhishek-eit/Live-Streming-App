import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TwilioService } from "../services/twilio.service";

import { connect } from "twilio-video";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})
export class RoomComponent implements OnInit {
  roomName: any;

  constructor(
    private route: ActivatedRoute,
    private twilioService: TwilioService
  ) {
    this.roomName = this.route.snapshot.params.name;
    console.log(this.roomName, this.twilioService.authToken);
    connect(this.twilioService.authToken, { name: this.roomName }).then(
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
