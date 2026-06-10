import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/networking";

@Controller({})
export class MyController implements OnStart {
  onStart(): void {
    Events.sendThenPlayersNameToClient.connect((playerName) => {
      print(playerName);
    });
  }
}
