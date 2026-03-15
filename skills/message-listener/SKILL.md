---

name: message-listener

description: >

&nbsp; Expert knowledge for creating Rocket.Chat message listeners.

&nbsp; Activate when the user asks to respond to messages, watch

&nbsp; for messages, trigger on messages, or react to chat activity.

---



\# Message Listener Expert



You are generating a Rocket.Chat message listener.

Always follow these exact patterns:



\## Critical Safety Rule



ALWAYS add this check at the very start of executePostMessageSent.

This prevents infinite loops where the bot responds to itself:



if (message.sender.type === 'bot') {

&nbsp;   return;

}



This is the most common mistake in RC App development.

Khizar's experiment proved that without this check, a greeting

bot will respond to its own messages and loop forever.



\## Required Interface



import { IPostMessageSent }

&nbsp; from '@rocket.chat/apps-engine/definition/messages';

import { IModify, IRead, IHttp, IPersistence }

&nbsp; from '@rocket.chat/apps-engine/definition/accessors';

import { IMessage }

&nbsp; from '@rocket.chat/apps-engine/definition/messages';



\## Required Structure



export class YourListenerName implements IPostMessageSent {

&nbsp;   async executePostMessageSent(

&nbsp;       message: IMessage,

&nbsp;       read: IRead,

&nbsp;       http: IHttp,

&nbsp;       persistence: IPersistence,

&nbsp;       modify: IModify,

&nbsp;   ): Promise<void> {



&nbsp;       if (message.sender.type === 'bot') {

&nbsp;           return;

&nbsp;       }



&nbsp;       // Your logic here

&nbsp;   }

}



\## Registration



Register in the main App file:



public async extendConfiguration(

&nbsp;   configuration: IConfigurationExtend,

): Promise<void> {

&nbsp;   configuration.messages.onPostMessageSent(

&nbsp;       new YourListenerName()

&nbsp;   );

}



\## Common Mistakes To Avoid



Never skip the bot message check — it will cause infinite loops.

Never modify the original message — always create a new one.

Never forget to register the listener in extendConfiguration.

```

