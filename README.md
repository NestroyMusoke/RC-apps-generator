# AI Rocket.Chat Apps Generator

**Gemini CLI Extension** — Prototype for Google Summer of Code 2026

This extension adds Rocket.Chat-specific context to Gemini CLI so it generates apps that are both structurally correct and behaviourally compatible with real workspaces.

### The Problem It Addresses
Without platform context, Gemini produces code that:
- Compiles cleanly
- Deploys successfully
- Fails silently at runtime (wrong notifier, missing bot checks, public instead of ephemeral messages, version mismatches)

This prototype implements the exact 4-layer pipeline 
Below is a use case example of how this extension currrently works when given a command "Create a slash command that sends an ephemeral thank-you message on mention" after probing the target workspace environment
![Exhibit 1 ](Sc.png)


