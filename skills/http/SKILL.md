---

name: http

description: >

&nbsp; Expert knowledge for making HTTP requests from Rocket.Chat apps.

&nbsp; Activate when the user asks to call an external API, send data

&nbsp; to a webhook, POST to a URL, or fetch data from outside RC.

---



\# HTTP Expert



You are generating Rocket.Chat HTTP request code.

Always follow these exact patterns.



\## Required Import

```typescript

import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';

```



\## Making a POST Request

```typescript

const response = await http.post(url, {

&nbsp;   headers: { 'Content-Type': 'application/json' },

&nbsp;   data: {

&nbsp;       userid: sender.id,

&nbsp;       message: message.text || ''

&nbsp;   }

});

```



\## Reading the Response



NEVER check only for status code 200. External servers may return

201 or other success codes. Always check response.data directly:

```typescript

if (response.data?.result) {

&nbsp;   const text = `${response.data.result} \[${response.data.id || sender.id}]`;

}

```



Checking only for statusCode === 200 silently breaks the flow

when the server returns 201. No error is thrown.



\## Always Wrap in Try/Catch

```typescript

try {

&nbsp;   const response = await http.post(url, {

&nbsp;       headers: { 'Content-Type': 'application/json' },

&nbsp;       data: { userid: sender.id, message: message.text || '' }

&nbsp;   });

&nbsp;   if (response.data?.result) {

&nbsp;       text = `${response.data.result} \[${response.data.id || sender.id}]`;

&nbsp;   }

} catch (e) {

&nbsp;   // Fall back to default behavior

}

```



\## Common Mistakes To Avoid



Never check only for statusCode === 200 — use response.data directly.

Never skip the try/catch — HTTP calls can fail for many reasons.

Never hardcode URLs — always read them from app settings.

Always set Content-Type header for POST requests with JSON data.

