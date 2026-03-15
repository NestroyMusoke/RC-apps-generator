---

name: slash-command

description: >

&nbsp; Expert knowledge for creating Rocket.Chat slash commands.

&nbsp; Activate when the user asks for a slash command, a command

&nbsp; that starts with /, or a bot command that users can type.

---



\# Slash Command Expert



You are generating a Rocket.Chat slash command handler.

Always follow these exact patterns:



\## Required Interface



import { ISlashCommand, SlashCommandContext }

&nbsp; from '@rocket.chat/apps-engine/definition/slashcommands';

import { IModify, IRead } from

&nbsp; '@rocket.chat/apps-engine/definition/accessors';



\## Required Structure



export class YourCommandName implements ISlashCommand {

&nbsp;   public command = 'your-command-name';

&nbsp;   public i18nDescription = 'Your\_Command\_Description';

&nbsp;   public i18nParamsExample = 'Your\_Command\_Params';

&nbsp;   public providesPreview = false;



&nbsp;   public async executor(

&nbsp;       context: SlashCommandContext,

&nbsp;       read: IRead,

&nbsp;       modify: IModify,

&nbsp;   ): Promise<void> {

&nbsp;       const sender = context.getSender();

&nbsp;       const room = context.getRoom();



&nbsp;       const message = modify.getCreator().startMessage()

&nbsp;           .setRoom(room)

&nbsp;           .setText('Your response here');



&nbsp;       await modify.getCreator().finish(message);

&nbsp;   }

}



\## Registration



After creating the class you must register it in the

main App file inside the extendConfiguration method:



configuration.slashCommands.provideSlashCommand(

&nbsp;   new YourCommandName()

);



\## Common Mistakes To Avoid



Never forget to register the command in extendConfiguration.

Never use room.id directly — always get room from context.

Never send messages without awaiting the finish call.



## Critical Runtime Patterns

NEVER forget to call modify.getCreator().finish(messageBuilder)
after building a message. Without this the message is built but
never actually sent. No error is thrown — it silently does nothing.
This is the most invisible bug in RC App development.

Example of WRONG code:
const msg = modify.getCreator().startMessage()
    .setRoom(room)
    .setText('Hello');
await modify.getNotifier().notifyUser(user, msg.getMessage());

Example of CORRECT code:
const messageBuilder = modify.getCreator().startMessage()
    .setRoom(room)
    .setText('Hello');
await modify.getCreator().finish(messageBuilder);

Also never use (data as any) when reading persistence.
Always define a proper interface for your stored data.

