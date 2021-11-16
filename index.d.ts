export interface LoaderOptions {
  commandsDir: string
}

export class GotLoader {
  public constructor(options: LoaderOptions);
}

export interface CommandOptions {
  commandsDir: string
}

export class Command {
  public constructor(options: CommandOptions);
}