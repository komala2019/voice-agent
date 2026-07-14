# Tiger Voice Agent: Comprehensive AI Blueprint

Instead of repeating 15+ individual prompts, you can use this synthesized **Mega-Prompt Blueprint** next time you start a fresh session with an AI Agent. It combines the context of your entire workflow into highly optimized, comprehensive commands.

You can paste these prompts sequentially as you build out the project.

---

## Prompt 1: Foundation & Architecture Setup
**Use this to establish the project context, design the architecture, and upgrade static mock code.**

> "I have a starting codebase for a Tiger KYC voice agent. First, critique the current solution and tell me what is missing in the implementation based on the assignment requirements in `codex.md`. 
> 
> Next, design the High-Level Design (HLD) and Low-Level Design (LLD) architecture diagrams for this agent.
> 
> Finally, update the `lib/mock-agent.ts` file to use dynamic functions and logic instead of static responses, ensuring it can handle proper eKYC and VKYC state routing."

---

## Prompt 2: Core Capabilities (Voice, Guardrails, Multi-lingual)
**Use this to implement the complex business logic (Hinglish, PII, and Web Speech).**

> "Now we need to implement the core agent capabilities:
> 1. **Voice Input**: Update the Playground UI to take actual voice input using the browser's Web Speech API instead of just text simulation.
> 2. **Guardrails**: Implement strict guardrail metrics. If a user tries to provide PII (like OTP/CVV) or asks out-of-scope questions, the agent must reject it, log the guardrail failure, and redirect them to the correct KYC step.
> 3. **Multi-Lingual / Hinglish**: Update the NLU logic so the agent understands both English and Hindi (Hinglish). It needs to recognize Hindi agreements, greetings, and objections, and reply back contextually in Hinglish."

---

## Prompt 3: Automated Evaluation (The Golden Set)
**Use this to generate the test suite and evaluate the agent.**

> "I need to ensure the agent works perfectly across all scenarios. 
> 1. Create a 'Golden Set' of comprehensive test cases covering both English and Hinglish inputs, handling happy paths, objections, and guardrail breaches.
> 2. Write these test cases into a script (`lib/golden-tests.ts`) that programmatically runs the mock agent against these utterances.
> 3. Execute the tests and provide me with the evaluation results."

---

## Prompt 4: Production Architecture & Interview Presentation
**Use this to build the native interview presentation and map the path to a live deployment.**

> "Let's prepare for the interview presentation.
> 1. Update the HLD and LLD diagrams to include the 'Path to Production'. Specifically, add what is missing for an enterprise deployment: an LLM/NLU Engine, VAD/Low-Latency WebSockets, Post-Call Analytics, and an Identity/Auth Security Layer.
> 2. Embed these architecture diagrams and an interactive presentation slide deck directly into the Next.js prototype natively as their own routes (`/presentation` and `/architecture`). Add them to the sidebar navigation.
> 3. In the Playground UI, add an 'Engine Mode Toggle' to switch between 'Offline (Deterministic Regex)' and 'Online (Generative LLM)'.
> 4. Finally, prepare the `next.config.mjs` and GitHub Actions `.github/workflows/deploy.yml` so I can push this codebase to GitHub and host it publicly via GitHub Pages."
