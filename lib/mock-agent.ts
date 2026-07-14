import { Customer } from './types';
import { orchestrationFor } from './orchestration';
import { AgentTurnResult, Objection, ToolCall } from './types';
import { createHumanEscalation, getCustomerStage, logCallOutcome, logObjection, scheduleCallback, sendWhatsApp } from './tools';

const feeReply = 'The ₹499 is a one-time joining fee — after that, the card is lifetime free. Plus you get ₹500 cashback and one year of Prime worth ₹1,499 as welcome rewards, so it more than pays for itself.';
const jewelsReply = 'Jewels convert at 5 Jewels = ₹1. You earn 10% cashback on Amazon, Flipkart, Myntra, 5% on travel, and 1% on everything else including UPI. Would you like me to walk you through the next step?';
const limitReply = 'I understand your concern. I cannot promise a limit increase as that is decided by the credit team. However, completing onboarding unlocks your full card features. Shall I help with that?';
const existingCardReply = 'Your existing card will continue working — this is a separate Tiger credit line with its own rewards. The two are completely independent.';
const usageConcernReply = 'I understand the concern. Tiger provides 24/7 fraud monitoring, instant freeze from the app, and zero-liability protection. You are always in control.';
const complexityReply = 'Samajh gaya. Main chhote steps mein help karta hoon — eKYC sirf 2 minute ka hai aur kabhi bhi ho sakta hai. Kya aap abhi try karna chahenge?';

function detectLanguage(text: string): 'English' | 'Hindi' | 'Hinglish' {
  const lower = text.toLowerCase();
  if (/(hai|kal|kyc|bahut|kya|nahi|mujhe|bhej|bolo|achchha|haan|ruko|minute|samajh|karun|chahiye|batao|kaise)/.test(lower)) return 'Hinglish';
  if (/(namaste|kripya|aaj|samay)/.test(lower)) return 'Hindi';
  return 'English';
}

function detectObjection(text: string): Objection | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('499') || lower.includes('fee') || lower.includes('charge') || lower.includes('paisa')) return 'JOINING_FEE';
  if (lower.includes('jewel') || lower.includes('cashback') || lower.includes('reward')) return 'JEWELS_VALUE';
  if (lower.includes('credit limit') || lower.includes('limit kam') || lower.includes('low limit')) return 'LOW_CREDIT_LIMIT';
  if (lower.includes('already have another') || lower.includes('existing card') || lower.includes('pehle se') || lower.includes('another card')) return 'EXISTING_CARD';
  if (lower.includes('usage') || lower.includes('deactivate') || lower.includes('band karna') || lower.includes('cancel')) return 'CARD_USAGE_CONCERN';
  if (lower.includes('complicated') || lower.includes('complex') || lower.includes('mushkil') || lower.includes('lamba') || lower.includes('difficult') || lower.includes('hard')) return 'KYC_COMPLEXITY';
  if (lower.includes('advert') || lower.includes('ad ') || lower.includes('dispute') || lower.includes('false')) return 'ADVERTISEMENT_DISPUTE';
  return undefined;
}

type Intent = 'GREETING' | 'AGREEMENT' | 'QUESTION' | 'FRUSTRATION' | 'CONFUSION' | 'THANKS' | 'HOLD' | 'OUT_OF_SCOPE';

function detectIntent(text: string): Intent {
  const lower = text.toLowerCase();
  if (/(wait|hold on|ek minute|1 minute|ruko|give me a sec|ek sec|one moment|abhi nahi)/.test(lower)) return 'HOLD';
  if (/(thank|thanks|dhanyavaad|shukriya|appreciate)/.test(lower)) return 'THANKS';
  if (/(frustrated|angry|not getting|not listening|are you even|hello\?|listen to me|sun|samajh nahi|not understand)/.test(lower)) return 'FRUSTRATION';
  if (/(confused|don't understand|what do you mean|kya matlab|samajh nahi aa|unclear|I don't get)/.test(lower)) return 'CONFUSION';
  if (/(what is|how does|can you explain|tell me about|kya hai|kaisa hai|how long|kitna time|when|kab)/.test(lower)) return 'QUESTION';
  if (/\b(okay|yes|sure|tell me|karo|haan|ji|let's do it|proceed|go ahead|start|shuru)\b|how to|kya karna|what to|what should|next step|aage kya|batao|kaise|whats next|what's next|what next/.test(lower)) return 'AGREEMENT';
  if (/\b(hello|hi|hey|namaste|kem chho|kimchho|good morning|good afternoon|good evening)\b/.test(lower)) return 'GREETING';
  return 'OUT_OF_SCOPE';
}

function getStageLabel(action: string): string {
  if (action === 'GUIDE_EKYC') return 'eKYC';
  if (action === 'START_VKYC_NOW' || action === 'SCHEDULE_VKYC_REMINDER') return 'VKYC';
  return 'card activation';
}

function getStageGuidance(action: string, lang: 'English' | 'Hindi' | 'Hinglish'): string {
  if (action === 'GUIDE_EKYC') {
    return lang === 'Hinglish'
      ? 'Aapka next step eKYC hai — yeh sirf 2 minute ka hai aur aap isse kabhi bhi complete kar sakte hain. Kya main link share karun?'
      : 'Your next step is eKYC verification — it takes just 2 minutes and you can do it anytime. Shall I send you the link?';
  }
  if (action === 'START_VKYC_NOW') {
    return lang === 'Hinglish'
      ? 'Aapka next step VKYC hai — yeh abhi available hai (9 AM se 9 PM tak). Kya aap abhi video call start karna chahenge?'
      : 'Your next step is VKYC — it is available right now (9 AM to 9 PM). Would you like to start the video verification now?';
  }
  if (action === 'SCHEDULE_VKYC_REMINDER') {
    return lang === 'Hinglish'
      ? 'VKYC sirf 9 AM se 9 PM tak hota hai. Main kal subah ke liye reminder set kar deta hoon?'
      : 'VKYC is only available between 9 AM and 9 PM. Shall I schedule a reminder for the next available window?';
  }
  return lang === 'Hinglish'
    ? 'Aapka next step Tiger app mein card activation hai. Activate karne ke baad virtual card turant mil jayega aur physical card 5-7 din mein.'
    : 'Your next step is card activation in the Tiger app. After activation, you get your virtual card instantly, and the physical card arrives in 5-7 days.';
}

// ── ANTI-LOOP: Conversation memory ──
// Tracks last 2 replies per customer to prevent repetition
const replyHistory: Map<string, string[]> = new Map();
let fallbackIndex = 0;

function isSimilar(a: string, b: string): boolean {
  // Simple similarity: if >60% of words overlap, consider it a repeat
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...wordsA].filter(w => wordsB.has(w)).length;
  const union = new Set([...wordsA, ...wordsB]).size;
  return union > 0 && (intersection / union) > 0.6;
}

function checkAntiLoop(customerId: string, intendedReply: string, detectedLanguage: 'English' | 'Hindi' | 'Hinglish', stepLabel: string): string {
  const history = replyHistory.get(customerId) || [];
  const repeatCount = history.filter(prev => isSimilar(prev, intendedReply)).length;

  if (repeatCount >= 2) {
    // Stuck after 2 similar replies — offer callback or human
    return detectedLanguage === 'Hinglish'
      ? `Lagta hai main aapki baat sahi se samajh nahi pa raha. Kya main ek human specialist se connect kar doon, ya kal callback schedule karun?`
      : `It seems I'm not fully addressing your concern. Would you prefer I connect you with a human specialist, or shall I schedule a callback at a time that works for you?`;
  }
  
  if (repeatCount === 1) {
    // One repeat detected — rephrase shorter
    const shorter = detectedLanguage === 'Hinglish'
      ? `Main doosre tarike se samjhata hoon: abhi sirf ${stepLabel} complete karna hai. Kya aap ready hain?`
      : `Let me put it differently: the one thing needed right now is ${stepLabel}. Ready to proceed?`;
    return shorter;
  }

  return intendedReply;
}

function recordReply(customerId: string, reply: string) {
  const history = replyHistory.get(customerId) || [];
  history.push(reply);
  // Keep only last 2
  if (history.length > 2) history.shift();
  replyHistory.set(customerId, history);
}

export function runMockAgent(
  customer: Customer, 
  userUtterance: string, 
  hour: number, 
  options?: { failNextTool?: boolean; sessionLanguage?: 'English' | 'Hindi' | 'Hinglish' }
): AgentTurnResult {
  const { stage, action } = orchestrationFor(customer, hour);
  const text = userUtterance.toLowerCase();
  const detectedLanguage = options?.sessionLanguage || detectLanguage(userUtterance);
  const objection = detectObjection(userUtterance);
  const toolCalls: ToolCall[] = [];
  const fail = options?.failNextTool;
  const stepLabel = getStageLabel(action);

  // ── GUARDRAIL: PII ──
  if (/otp|cvv|pin|password|card number|aadhaar|pan /.test(text)) {
    return { reply: 'For your safety, please do not share OTP, CVV, PIN, passwords, or card numbers. I do not need any sensitive details to assist you.', detectedLanguage, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
  }

  // ── OPT-OUT CHECK ──
  if (customer.optOut) {
    return { reply: 'You have previously opted out of calls. I will not proceed with any onboarding actions. If you change your mind, please contact us through the Tiger app.', detectedLanguage, toolCalls, outcome: 'COMPLETED_CURRENT_STAGE', guardrailPassed: true };
  }

  // ── CARD ALREADY ACTIVE ──
  if (stage === 'CARD_ACTIVE') {
    return { reply: 'Great news — your Tiger card is already active! There is no onboarding action pending. You can start using it right away.', detectedLanguage, toolCalls, outcome: 'COMPLETED_CURRENT_STAGE', guardrailPassed: true };
  }

  // ── UNKNOWN STATE ──
  if (stage === 'UNKNOWN_STATE') {
    const t = createHumanEscalation(customer.id, 'Unknown onboarding state', fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'I see a data mismatch in your account, so I am routing you to a human specialist who can help resolve it.' : 'I found a data mismatch and could not create the escalation automatically. Please try again or contact support.', detectedLanguage, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
  }

  // ── STOP CALLING ──
  if (/(stop calling|don't call|mat call|band karo|no more calls|stop contacting)/.test(text)) {
    return { reply: 'Understood. I have noted your preference and we will stop all onboarding calls. You can resume anytime through the Tiger app.', detectedLanguage, toolCalls, outcome: 'CUSTOMER_OPT_OUT', guardrailPassed: true };
  }

  // ── HUMAN ESCALATION ──
  if (/(speak to a person|human|agent|talk to someone|real person|manager|supervisor|insaan se baat)/.test(text)) {
    const t = createHumanEscalation(customer.id, 'Human requested', fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Of course. I am connecting your case to a human specialist now.' : 'I could not create the human handoff right now. Please call our support line directly.', detectedLanguage, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
  }

  // ── ALREADY COMPLETED ──
  if (/(already completed|already done|ho chuka|kar liya|done it|finished)/.test(text)) {
    const t = getCustomerStage(customer.id, fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Thanks for letting me know. I have refreshed your profile and will guide you based on your updated status.' : 'I could not refresh your status right now. Please try again shortly.', detectedLanguage, toolCalls, outcome: 'AGREED_TO_COMPLETE', guardrailPassed: true };
  }

  // ── WHATSAPP REQUEST ──
  if (/(whatsapp|watsapp|wats app|link bhej|send me link|send link)/.test(text)) {
    const template = stage === 'EKYC_PENDING' ? 'EKYC_GUIDE' : stage === 'VKYC_PENDING' ? 'VKYC_GUIDE' : 'ACTIVATION_GUIDE';
    const t = sendWhatsApp(customer.id, template, fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? `Done! I have sent the ${stepLabel} guide to your WhatsApp. Please check and follow the steps.` : 'I could not send the WhatsApp guide right now. Please try again.', detectedLanguage, toolCalls, outcome: t.status === 'SUCCESS' ? 'WHATSAPP_SENT' : 'SYSTEM_FAILURE', guardrailPassed: true, objection };
  }

  // ── CALLBACK REQUEST ──
  if (/(tomorrow at 7|call me tomorrow|call me later|kal call|kal shaam|call back|callback|baad mein)/.test(text)) {
    const t = scheduleCallback(customer.id, 'Tomorrow 7:00 PM', 'Customer requested callback', fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Done — I have scheduled a callback for tomorrow at 7 PM. We will call you then.' : 'I could not schedule the callback right now. Please try again.', detectedLanguage, toolCalls, outcome: t.status === 'SUCCESS' ? 'CALLBACK_SCHEDULED' : 'SYSTEM_FAILURE', guardrailPassed: true };
  }

  // ── OBJECTION HANDLING ──
  if (objection) {
    toolCalls.push(logObjection(customer.id, objection, fail));
    if (objection === 'ADVERTISEMENT_DISPUTE') {
      const t = createHumanEscalation(customer.id, 'Ad dispute', fail); toolCalls.push(t);
      return { reply: 'I understand your concern about the advertisement. Let me route this to a specialist who can address it properly.', detectedLanguage, objection, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
    }
    
    const replyMap: Record<string, string> = {
      'JOINING_FEE': feeReply,
      'JEWELS_VALUE': jewelsReply,
      'LOW_CREDIT_LIMIT': limitReply,
      'EXISTING_CARD': existingCardReply,
      'CARD_USAGE_CONCERN': usageConcernReply,
      'KYC_COMPLEXITY': complexityReply,
    };
    
    const reply = replyMap[objection as string] || complexityReply;
    return { reply, detectedLanguage, objection, toolCalls, outcome: 'OBJECTION_UNRESOLVED', guardrailPassed: true };
  }

  // ── INTENT-BASED RESPONSES ──
  const intent = detectIntent(text);

  if (intent === 'HOLD') {
    const reply = detectedLanguage === 'Hinglish' ? 'Koi baat nahi, apna time lein. Jab ready hon toh bataiyega.' : 'No problem, take your time. Just let me know when you are ready.';
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'THANKS') {
    const reply = detectedLanguage === 'Hinglish'
      ? `Shukriya! Agar aapko ${stepLabel} mein koi help chahiye toh main yahan hoon.`
      : `You're welcome! If you need any help with ${stepLabel}, I am right here.`;
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'GREETING') {
    const reply = detectedLanguage === 'Hinglish' 
      ? `Hello ${customer.name}! Main Tiger Credit Card se call kar raha hoon. Aapka agla step ${stepLabel} hai — kya main isme help kar sakta hoon?`
      : `Hello ${customer.name}! I am calling from Tiger Credit Card. Your next step is ${stepLabel} — how would you like to proceed?`;
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'FRUSTRATION') {
    const reply = detectedLanguage === 'Hinglish'
      ? `Main samajh raha hoon, maafi chahta hoon. Main aapki baat dhyan se sun raha hoon. Kya aap mujhe batayenge ki kaise help kar sakta hoon?`
      : `I completely understand, and I apologize for the inconvenience. I am listening carefully. How can I best help you right now?`;
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'CONFUSION') {
    const reply = detectedLanguage === 'Hinglish'
      ? `Koi baat nahi, main simple mein samjhata hoon. Abhi aapko sirf ${stepLabel} karna hai — yeh bahut chhota step hai. Kya aap try karna chahenge?`
      : `No worries, let me explain simply. Right now, you just need to complete ${stepLabel} — it is a quick step. Would you like to try it now?`;
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'QUESTION') {
    return { reply: getStageGuidance(action, detectedLanguage), detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'AGREEMENT') {
    toolCalls.push(logCallOutcome(customer.id, 'AGREED_TO_COMPLETE', fail));
    return { reply: getStageGuidance(action, detectedLanguage), detectedLanguage, toolCalls, outcome: 'AGREED_TO_COMPLETE', guardrailPassed: true };
  }

  // ── FALLBACK: Varied responses for unrecognized input ──
  const fallbacks = detectedLanguage === 'Hinglish' ? [
    `Main samajh nahi paya. Kya aap ${stepLabel} ke baare mein jaanna chahte hain? Main us mein madad kar sakta hoon.`,
    `Hmm, yeh meri understanding se bahar hai. Lekin main aapko ${stepLabel} complete karne mein zaroor help kar sakta hoon.`,
    `Mujhe lagta hai yeh topic mere scope se bahar hai. Kya main aapko ${stepLabel} ke steps batayun?`,
  ] : [
    `I didn't quite catch that. I can help you with your ${stepLabel} process — would you like to proceed with that?`,
    `That seems outside my area, but I can definitely help you complete ${stepLabel}. Would you like me to guide you?`,
    `I may not have the answer to that specific question. My focus is helping you with ${stepLabel}. Shall we continue?`,
  ];

  const rawReply = fallbacks[fallbackIndex % fallbacks.length];
  fallbackIndex++;
  
  const reply = checkAntiLoop(customer.id, rawReply, detectedLanguage, stepLabel);
  recordReply(customer.id, reply);
  return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
}
