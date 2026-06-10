import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/networking";
@Service()
export class MyService implements OnStart {
  onStart(): void {
    Players.PlayerAdded.Connect((player) => {
      Events.sendThenPlayersNameToClient(player, player.Name);
    });
  }
}
