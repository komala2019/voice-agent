import { Customer, NextBestAction, OnboardingStage } from './types';
export function resolveStage(customer: Customer): OnboardingStage {
  if (customer.cardStatus === 'ACTIVE') return 'CARD_ACTIVE';
  if (customer.vkycStatus === 'COMPLETED' && customer.activationStatus !== 'COMPLETED') return 'ACTIVATION_PENDING';
  if (customer.ekycStatus === 'COMPLETED' && customer.vkycStatus !== 'COMPLETED') return 'VKYC_PENDING';
  if (customer.cardStatus === 'APPROVED' && customer.ekycStatus !== 'COMPLETED') return 'EKYC_PENDING';
  return 'UNKNOWN_STATE';
}
export function resolveNextBestAction(stage: OnboardingStage, hour: number): NextBestAction {
  if (stage === 'EKYC_PENDING') return 'GUIDE_EKYC';
  if (stage === 'VKYC_PENDING') return hour >= 9 && hour < 21 ? 'START_VKYC_NOW' : 'SCHEDULE_VKYC_REMINDER';
  if (stage === 'ACTIVATION_PENDING') return 'GUIDE_ACTIVATION';
  if (stage === 'CARD_ACTIVE') return 'NO_CALL';
  return 'ESCALATE_DATA_STATE';
}
export function orchestrationFor(customer: Customer, hour: number) {
  const stage = resolveStage(customer);
  const action = resolveNextBestAction(stage, hour);
  return { stage, action };
}
