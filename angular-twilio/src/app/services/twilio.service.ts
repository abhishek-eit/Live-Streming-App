import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TwilioService {
  serverURL = "http://localhost:5000";
  readonly accountSid = "ACac01fcae37fe37daa8789ac923b3c65d";
  readonly authToken = "a552748be47f8bc7778df5dffb587f89";

  constructor(private http: HttpClient) {}

  createRoom(value) {
    return this.http.post(`${this.serverURL}/create-room`, value);
  }

  joinRoom(value) {
    return this.http.post(`${this.serverURL}/join-room`, value);
  }
}
