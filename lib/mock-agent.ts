import { Customer } from './types';
import { orchestrationFor } from './orchestration';
import { AgentTurnResult, Objection, ToolCall } from './types';
import { createHumanEscalation, getCustomerStage, logCallOutcome, logObjection, scheduleCallback, sendWhatsApp } from './tools';
const feeReply = 'There is a ₹499 one-time joining fee. After that, the card is lifetime free.';
const jewelsReply = 'Jewels convert at 5 Jewels = ₹1. I can explain rewards clearly before you decide.';
const limitReply = 'I cannot promise a limit increase. I can help complete onboarding first.';
const existingCardReply = 'Your existing card will continue working. This is a new Tiger credit line.';
const usageConcernReply = 'We have 24/7 fraud protection. You can freeze the card anytime in the app.';
const complexityReply = 'Samajh gaya. Main short steps mein help karta hoon. eKYC kabhi bhi ho sakta hai.';
function detectLanguage(text: string): 'English' | 'Hindi' | 'Hinglish' {
  const lower = text.toLowerCase();
  if (/(hai|kal|kyc|bahut|kya|nahi|mujhe|bhej|bolo|achchha|haan|ruko|minute)/.test(lower)) return 'Hinglish';
  if (/(namaste|kripya|aaj|samay)/.test(lower)) return 'Hindi';
  return 'English';
}
function detectObjection(text: string): Objection | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('499') || lower.includes('fee') || lower.includes('charge')) return 'JOINING_FEE';
  if (lower.includes('jewel') || lower.includes('cashback')) return 'JEWELS_VALUE';
  if (lower.includes('credit limit') || lower.includes('limit kam')) return 'LOW_CREDIT_LIMIT';
  if (lower.includes('already have another') || lower.includes('existing card') || lower.includes('pehle se')) return 'EXISTING_CARD';
  if (lower.includes('usage') || lower.includes('deactivate') || lower.includes('band karna')) return 'CARD_USAGE_CONCERN';
  if (lower.includes('complicated') || lower.includes('complex') || lower.includes('mushkil') || lower.includes('lamba')) return 'KYC_COMPLEXITY';
  if (lower.includes('advert') || lower.includes('ad ') || lower.includes('dispute')) return 'ADVERTISEMENT_DISPUTE';
  return undefined;
}
function detectIntent(text: string): 'GREETING' | 'AGREEMENT' | 'OUT_OF_SCOPE' | 'HOLD' {
  const lower = text.toLowerCase();
  if (/(wait|hold on|ek minute|1 minute|ruko|give me a sec|ek sec)/.test(lower)) return 'HOLD';
  if (/\b(okay|yes|sure|tell me|karo|haan|ji)\b|how to|kya karna|what to|what should|next step|aage kya|batao|kaise|whats next|what's next|what next/.test(lower)) return 'AGREEMENT';
  if (/\b(hello|hi|hey|namaste|kem chho|kimchho|good morning|good afternoon)\b/.test(lower)) return 'GREETING';
  return 'OUT_OF_SCOPE';
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

  if (/otp|cvv|pin|password/.test(text)) {
    return { reply: 'Please do not share OTP, CVV, PIN, or passwords. I do not need sensitive details.', detectedLanguage, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
  }
  if (customer.optOut) {
    return { reply: 'You have previously opted out of calls. I will not proceed with onboarding.', detectedLanguage, toolCalls, outcome: 'COMPLETED_CURRENT_STAGE', guardrailPassed: true };
  }
  if (stage === 'CARD_ACTIVE') {
    return { reply: 'Your card is already active, so there is no onboarding action pending.', detectedLanguage, toolCalls, outcome: 'COMPLETED_CURRENT_STAGE', guardrailPassed: true };
  }
  if (stage === 'UNKNOWN_STATE') {
    const t = createHumanEscalation(customer.id, 'Unknown onboarding state', fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'I see a data mismatch, so I am routing this to a human specialist.' : 'I found a data mismatch and could not create escalation automatically.', detectedLanguage, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
  }
  if (text.includes('stop calling')) {
    return { reply: 'Understood. We will stop onboarding calls.', detectedLanguage, toolCalls, outcome: 'CUSTOMER_OPT_OUT', guardrailPassed: true };
  }
  if (text.includes('speak to a person') || text.includes('human')) {
    const t = createHumanEscalation(customer.id, 'Human requested', fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Sure, I am connecting your case to a person.' : 'I could not create the human handoff right now.', detectedLanguage, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
  }
  if (text.includes('already completed')) {
    const t = getCustomerStage(customer.id, fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Thanks. I checked your latest stage and will guide you based on the refreshed status.' : 'I could not refresh your latest status right now.', detectedLanguage, toolCalls, outcome: 'AGREED_TO_COMPLETE', guardrailPassed: true };
  }
  if (text.includes('whatsapp')) {
    const template = stage === 'EKYC_PENDING' ? 'EKYC_GUIDE' : stage === 'VKYC_PENDING' ? 'VKYC_GUIDE' : 'ACTIVATION_GUIDE';
    const t = sendWhatsApp(customer.id, template, fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Done. I have sent the guide on WhatsApp.' : 'I could not send the WhatsApp guide right now.', detectedLanguage, toolCalls, outcome: t.status === 'SUCCESS' ? 'WHATSAPP_SENT' : 'SYSTEM_FAILURE', guardrailPassed: true, objection };
  }
  if (text.includes('tomorrow at 7 pm') || text.includes('call me tomorrow')) {
    const t = scheduleCallback(customer.id, 'Tomorrow 7:00 PM', 'Customer requested callback', fail); toolCalls.push(t);
    return { reply: t.status === 'SUCCESS' ? 'Okay, I have scheduled a callback for tomorrow at 7 PM.' : 'I could not schedule the callback right now.', detectedLanguage, toolCalls, outcome: t.status === 'SUCCESS' ? 'CALLBACK_SCHEDULED' : 'SYSTEM_FAILURE', guardrailPassed: true };
  }
  if (objection) {
    toolCalls.push(logObjection(customer.id, objection, fail));
    if (objection === 'ADVERTISEMENT_DISPUTE') {
      const t = createHumanEscalation(customer.id, 'Ad dispute', fail); toolCalls.push(t);
      return { reply: 'I will route this advertisement concern to a human specialist.', detectedLanguage, objection, toolCalls, outcome: 'HUMAN_ESCALATION', guardrailPassed: true };
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
  
  const intent = detectIntent(text);
  const nextStepStr = action === 'GUIDE_EKYC' ? 'eKYC' : action === 'START_VKYC_NOW' || action === 'SCHEDULE_VKYC_REMINDER' ? 'VKYC' : 'card activation';

  if (intent === 'HOLD') {
    const reply = detectedLanguage === 'Hinglish' ? 'Koi baat nahi, take your time.' : 'Sure, take your time. Let me know when you are ready.';
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'GREETING') {
    const reply = detectedLanguage === 'Hinglish' 
      ? `Hello! Main aapka Tiger Credit Card assistant hoon. Aapka agla step ${nextStepStr} hai.`
      : `Hello! I am your Tiger Credit Card onboarding assistant. Your next step is ${nextStepStr}.`;
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  if (intent === 'OUT_OF_SCOPE') {
    toolCalls.push({ name: 'knowledge_base_search', status: 'SUCCESS', args: { query: text } });
    const reply = detectedLanguage === 'Hinglish'
      ? `Main check kar raha hoon... aapke account ke mutabiq, aapka agla step ${nextStepStr} hai. Kya aap isme madad chahte hain?`
      : `Let me check my knowledge base... Based on your profile, the answer is that your immediate next step is ${nextStepStr}. Would you like me to guide you through it?`;
    return { reply, detectedLanguage, toolCalls, outcome: 'NO_ANSWER', guardrailPassed: true };
  }

  toolCalls.push(logCallOutcome(customer.id, 'AGREED_TO_COMPLETE', fail));
  const reply = action === 'GUIDE_EKYC'
    ? 'Your next step is eKYC. You can complete it anytime using the guided link.'
    : action === 'START_VKYC_NOW'
    ? 'Your next step is VKYC. It is available now between 9 AM and 9 PM.'
    : action === 'SCHEDULE_VKYC_REMINDER'
    ? 'VKYC works between 9 AM and 9 PM, so I can arrange a reminder for that window.'
    : 'Your next step is activation in the Tiger app. After activation, your virtual card is instant.';
  return { reply, detectedLanguage, toolCalls, outcome: 'AGREED_TO_COMPLETE', guardrailPassed: true };
}
