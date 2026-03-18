---

name: persistence

description: >

&nbsp; Expert knowledge for saving and reading data in Rocket.Chat apps.

&nbsp; Activate when the user asks to save data, remember user preferences,

&nbsp; store state, or retrieve previously saved information.

---



\# Persistence Expert



You are generating Rocket.Chat persistence code.

Always follow these exact patterns.



\## Required Imports

```typescript

import { IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';

import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';

```



\## Saving Data

```typescript

const association = new RocketChatAssociationRecord(

&nbsp;   RocketChatAssociationModel.USER,

&nbsp;   `${user.id}-your-key`,

);

await persistence.updateByAssociation(association, { yourData: value }, true);

```



The third argument `true` means upsert — create if not exists,

update if exists. Always use true unless you specifically want

to fail on missing records.



\## Reading Data

```typescript

const association = new RocketChatAssociationRecord(

&nbsp;   RocketChatAssociationModel.USER,

&nbsp;   `${user.id}-your-key`,

);

const data = await read.getPersistenceReader().readByAssociation(association);

if (!data || data.length === 0) return;

const record = data\[0] as any;

```



\## Association Models



Use the right model for the right scope:



RocketChatAssociationModel.USER — data tied to a specific user

RocketChatAssociationModel.ROOM — data tied to a specific room

RocketChatAssociationModel.MISC — global app data not tied to user or room



\## Common Mistakes To Avoid



Never use getByAssociation — the correct method is readByAssociation.

Never forget the upsert true flag — without it updates silently fail.

Never cast data directly — always check length before accessing data\[0].

Never use the same key for different data types — namespace your keys.

