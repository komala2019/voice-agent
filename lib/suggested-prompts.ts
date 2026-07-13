import { OnboardingStage } from './types';

const EKYC_PROMPTS = [
  'Okay, tell me what to do.',
  'Why is there a ₹499 fee?',
  'Ye KYC bahut complicated hai.',
  'Send me the link on WhatsApp.',
  'I already completed this.'
];

const VKYC_PROMPTS = [
  'Mera eKYC ho gaya, aage kya?',
  'My credit limit is too low.',
  'Call me tomorrow at 7 PM.'
];

const ACTIVATION_PROMPTS = [
  'What\'s next?',
  'Jewels are not real cashback.',
  'I worry about card usage.'
];

const ACTIVE_PROMPTS = [
  'What do I do now?'
];

const UNKNOWN_PROMPTS = [
  'Tell me what to do.',
  'I already completed this.'
];

export const UNIVERSAL_PROMPTS = [
  'Stop calling me.',
  'I want to speak to a person.',
  "I'll tell you my OTP."
];

export function getSuggestedPrompts(stage: OnboardingStage): string[] {
  switch (stage) {
    case 'EKYC_PENDING':
      return EKYC_PROMPTS;
    case 'VKYC_PENDING':
      return VKYC_PROMPTS;
    case 'ACTIVATION_PENDING':
      return ACTIVATION_PROMPTS;
    case 'CARD_ACTIVE':
      return ACTIVE_PROMPTS;
    case 'UNKNOWN_STATE':
      return UNKNOWN_PROMPTS;
    default:
      return EKYC_PROMPTS;
  }
}
