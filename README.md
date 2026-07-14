# Tiger AI Voice Onboarding Prototype

This repository contains two deliverables:

1. A working Next.js prototype for the Tiger Credit Card AI voice onboarding operations system.
2. A production-ready architecture scaffold for a real voice agent.

## Prototype features

- Overview dashboard
- Customer queue
- Customer detail / journey view
- Agent playground with both Offline (Rule-based Regex) and Online (Google Gemini 1.5 Flash LLM) voice modes
- Golden test evaluation page
- Interactive architecture diagram and presentation views
- Embedded reference documents (Codex Spec, Prompt Blueprint, Agent Mega-Prompt)
- Deterministic stage and next-best-action logic in pure functions
- Seeded data with browser persistence

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Demo storyline

1. Open Overview and explain funnel drop-off.
2. Open Priya in Customer Queue.
3. Show `EKYC_PENDING -> GUIDE_EKYC`.
4. Open Agent Playground and click `Ye KYC bahut complicated hai.`
5. Show objection detection and Hinglish response.
6. Ask for WhatsApp and review the tool call.
7. Change Priya eKYC to COMPLETED in Customer Detail.
8. Refresh and show `VKYC_PENDING`.
9. Open Evaluations and click Run All Tests.
10. Review guardrails such as OTP handling and failed-tool behavior.

## Production-ready voice agent scaffold

See `../voice-agent-production/` for a production architecture package with:

- domain orchestration layer
- provider adapter interfaces
- policy and guardrail services
- telephony, ASR, TTS, and WhatsApp boundaries
- observability and deployment configuration examples
