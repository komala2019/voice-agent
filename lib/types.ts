export type OnboardingStage = 'EKYC_PENDING' | 'VKYC_PENDING' | 'ACTIVATION_PENDING' | 'CARD_ACTIVE' | 'UNKNOWN_STATE';
export type NextBestAction = 'GUIDE_EKYC' | 'START_VKYC_NOW' | 'SCHEDULE_VKYC_REMINDER' | 'GUIDE_ACTIVATION' | 'NO_CALL' | 'ESCALATE_DATA_STATE';
export type Objection = 'JOINING_FEE' | 'JEWELS_VALUE' | 'LOW_CREDIT_LIMIT' | 'EXISTING_CARD' | 'CARD_USAGE_CONCERN' | 'KYC_COMPLEXITY' | 'ADVERTISEMENT_DISPUTE' | 'OTHER';
export type CallOutcome = 'COMPLETED_CURRENT_STAGE' | 'AGREED_TO_COMPLETE' | 'WHATSAPP_SENT' | 'CALLBACK_SCHEDULED' | 'OBJECTION_UNRESOLVED' | 'HUMAN_ESCALATION' | 'CUSTOMER_NOT_INTERESTED' | 'CUSTOMER_OPT_OUT' | 'SYSTEM_FAILURE' | 'NO_ANSWER';
export interface Customer {
  id: string; name: string; phoneMasked: string; language: 'English' | 'Hindi' | 'Hinglish' | 'Unknown';
  cardStatus: 'APPROVED' | 'ACTIVE'; ekycStatus: 'PENDING' | 'COMPLETED'; vkycStatus: 'PENDING' | 'COMPLETED'; activationStatus: 'NOT_STARTED' | 'PENDING' | 'COMPLETED';
  previousObjection?: Objection; retryCount: number; optOut: boolean; lastInteraction?: string;
}
export interface InteractionLog {
  id: string; customerId: string; kind: 'CALL' | 'WHATSAPP' | 'CALLBACK' | 'OBJECTION' | 'ESCALATION' | 'SYSTEM'; message: string; timestamp: string;
}
export interface ToolCall { name: string; status: 'SUCCESS' | 'FAILED'; args?: Record<string, unknown>; }
export interface AgentTurnResult {
  reply: string; detectedLanguage: 'English' | 'Hindi' | 'Hinglish'; objection?: Objection; toolCalls: ToolCall[]; outcome?: CallOutcome; guardrailPassed: boolean;
}
export interface GoldenTest {
  id: string; title: string; customerId: string; userUtterance: string; expectedStage: OnboardingStage; expectedAction: NextBestAction; expectedObjection?: Objection; expectedTool?: string; expectedOutcome?: CallOutcome; criticalRule?: string;
}
