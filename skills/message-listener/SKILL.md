---
name: message-listener
description: >
  Expert knowledge for creating Rocket.Chat message listeners.
  Activate when the user asks to respond to messages, watch
  for messages, trigger on messages, or react to chat activity.
---

# Message Listener Expert

You are generating a Rocket.Chat message listener.
Always follow these exact patterns.

## Critical Registration Rule

NEVER create a separate listener class and try to register it
through configuration. This does NOT work.

The ONLY correct way is to implement IPostMessageSent directly
on the main App class:
```typescript
export class YourApp extends App implements IPostMessageSent {
```

Without the implements declaration on the App class, the listener
is silently ignored. No error is thrown. The app deploys and
enables but the listener never fires. This is invisible.

## Required Imports
```typescript
import { IPostMessageSent, IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IRead, IHttp, IModify, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
```

## Required Structure
```typescript
export class YourApp extends App implements IPostMessageSent {

    public async checkPostMessageSent(message: IMessage, read: IRead, http: IHttp): Promise<boolean> {
        // Return true only for messages you want to handle
        // Return false to skip — this is efficient and prevents unnecessary processing
        const text = message.text || '';
        return text.includes('your-trigger-keyword');
    }

    public async executePostMessageSent(message: IMessage, read: IRead, http: IHttp, persistence: IPersistence, modify: IModify): Promise<void> {
        // Never fire on bot messages — causes infinite loops
        if (message.sender.type === 'bot') return;

        const sender = message.sender;
        const room = message.room;

        // For ephemeral messages (only visible to one user)
        // ALWAYS use read.getNotifier() — never modify.getCreator()
        const notifier = read.getNotifier();
        const builder = notifier.getMessageBuilder();
        builder.setText('Your message here');
        builder.setRoom(room);
        await notifier.notifyUser(sender, builder.getMessage());
    }
}
```

## Ephemeral vs Public Messages

Use read.getNotifier() when the message should only be visible
to one specific user (ephemeral).

Use modify.getCreator().startMessage() + finish() when the
message should be visible to everyone in the channel.

Using modify.getCreator() for ephemeral messages silently
fails — the message is never delivered.

## Common Mistakes To Avoid

Never create a separate listener class for registration.
Never skip the implements IPostMessageSent declaration.
Never use modify.getCreator() for ephemeral notifications.
Never skip the bot sender check — it causes infinite loops.