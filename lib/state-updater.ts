import { CallOutcome, Customer, Objection, OnboardingStage } from './types';

export function applyOutcome(
  customer: Customer, 
  outcome: CallOutcome | undefined, 
  stage: OnboardingStage, 
  objection?: Objection
): Customer {
  const updated = { ...customer };
  updated.lastInteraction = 'Just now';

  if (!outcome) {
    return updated;
  }

  switch (outcome) {
    case 'AGREED_TO_COMPLETE':
      if (stage === 'EKYC_PENDING') {
        updated.ekycStatus = 'COMPLETED';
      } else if (stage === 'VKYC_PENDING') {
        updated.vkycStatus = 'COMPLETED';
      } else if (stage === 'ACTIVATION_PENDING') {
        updated.activationStatus = 'COMPLETED';
        updated.cardStatus = 'ACTIVE';
      }
      break;
    
    case 'WHATSAPP_SENT':
    case 'CALLBACK_SCHEDULED':
      updated.retryCount += 1;
      break;
      
    case 'OBJECTION_UNRESOLVED':
      if (objection) {
        updated.previousObjection = objection;
      }
      break;
      
    case 'CUSTOMER_OPT_OUT':
      updated.optOut = true;
      break;
      
    case 'HUMAN_ESCALATION':
      // Just logged in history. Nothing to do in the state for now.
      break;
      
    case 'SYSTEM_FAILURE':
    case 'NO_ANSWER':
    case 'COMPLETED_CURRENT_STAGE':
    case 'CUSTOMER_NOT_INTERESTED':
      break;
  }
  
  return updated;
}
