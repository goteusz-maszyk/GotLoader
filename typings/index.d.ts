import { Message, CommandInteraction, CommandInteractionOption, ApplicationCommandType, Client, Collection, ApplicationCommandOptionData, PermissionString, Guild } from "discord.js";

export interface LoaderOptions {
  commandsDir?: string
  featuresDir?: string
  client: Client,
  slashes: boolean,
  commandPrefix: string
  ignoreBots: boolean
  translationsDir?: string,
  mongoURL?: string
}

export class GotLoader {
  public constructor(options: LoaderOptions);
  public commands: Collection<string, Command>;
  commandsDir: string;
  public translate(guild: Guild, code: string)
}

export interface CommandExecuteData {
  message: Message,
  interaction: CommandInteraction,
  args: CommandInteractionOption[] | string[]
}

export interface CommandOptions {
  name: string;
  description: string;
  args?: ApplicationCommandOptionData[];
  type?: ApplicationCommandType;
  permissions?: PermissionString[];
  usage?: string;
  execute(data: CommandExecuteData);
}

export class Command {
  public constructor(options: CommandOptions);
  public name: string;
  public description: string;
  public args: ApplicationCommandOptionData[];
  public permissions: PermissionString[];
  public usage: string;
  public execute(data: CommandExecuteData);
}

export class Feature {
  public constructor(execute: (arg0: Client) => any);
}
