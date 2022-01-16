import { Message, CommandInteraction, CommandInteractionOption, ApplicationCommandType, Client, Collection } from "discord.js";

export interface LoaderOptions {
  commandsDir: string,
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
  public args: CommandInteractionOption[];
  public type: ApplicationCommandType;
  public execute(data: CommandExecuteData);
}

export class Command {
  public constructor(options: CommandOptions);
  public name: string;
  public description: string;
  public args: CommandInteractionOption[];
  public execute(data: CommandExecuteData);
}
