import { Message, CommandInteraction, CommandInteractionOption, ApplicationCommandType, Client, Collection, ApplicationCommandOptionData, PermissionString } from "discord.js";

export interface LoaderOptions {
  commandsDir: string
  featuresDir?: string
  client: Client,
  slashes: boolean,
  commandPrefix: string
  ignoreBots: boolean

}

export class GotLoader {
  public constructor(options: LoaderOptions);
  public commands: Collection<string, Command>;
  commandsDir: string;
}

export interface CommandExecuteData {
  message: Message,
  interaction: CommandInteraction,
  args: CommandInteractionOption[] | string[]
}

export interface CommandOptions {
  public name: string;
  public description: string;
  public args: ApplicationCommandOptionData[];
  public type: ApplicationCommandType;
  public permissions: PermissionString[];
  public execute(data: CommandExecuteData);
}

export class Command {
  public constructor(options: CommandOptions);
  public name: string;
  public description: string;
  public args: ApplicationCommandOptionData[];
  public permissions: PermissionString[];
  public execute(data: CommandExecuteData);
}

export class Feature {
  public constructor(execute: function(Client));
}
