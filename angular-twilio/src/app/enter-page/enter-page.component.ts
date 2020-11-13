import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TwilioService } from "../services/twilio.service";

@Component({
  selector: "app-enter-page",
  templateUrl: "./enter-page.component.html",
  styleUrls: ["./enter-page.component.css"],
})
export class EnterPageComponent implements OnInit {
  joinForm: FormGroup;
  createForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private twilioService: TwilioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.joinForm = this.fb.group({
      userName: ["", Validators.required],
      roomId: ["", Validators.required, Validators.min(5)],
    });

    this.createForm = this.fb.group({
      userName: ["", Validators.required],
      roomId: ["", [Validators.required, Validators.min(5)]],
    });
  }

  join() {}

  create() {
    if (this.createForm.valid) {
      this.twilioService
        .createRoom(this.createForm.value)
        .subscribe((res: any) => {
          if (res.status) {
            this.router.navigate(["/room", res.room_name]);
          }
        });
    }
  }
}
