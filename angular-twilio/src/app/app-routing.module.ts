import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnterPageComponent } from "./enter-page/enter-page.component";
import { RoomComponent } from "./room/room.component";

const routes: Routes = [
  { path: "", redirectTo: "enter", pathMatch: "full" },
  { path: "enter", component: EnterPageComponent },
  { path: "room/:name", component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
