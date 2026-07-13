import { Customer, InteractionLog } from './types';
export const seedCustomers: Customer[] = [
  { id:'priya', name:'Priya', phoneMasked:'98XXXXXX41', language:'Hinglish', cardStatus:'APPROVED', ekycStatus:'PENDING', vkycStatus:'PENDING', activationStatus:'NOT_STARTED', retryCount:1, optOut:false, lastInteraction:'Today, 11:20 AM' },
  { id:'rahul', name:'Rahul', phoneMasked:'99XXXXXX14', language:'Hindi', cardStatus:'APPROVED', ekycStatus:'COMPLETED', vkycStatus:'PENDING', activationStatus:'NOT_STARTED', previousObjection:'KYC_COMPLEXITY', retryCount:2, optOut:false, lastInteraction:'Today, 10:15 AM' },
  { id:'neha', name:'Neha', phoneMasked:'97XXXXXX67', language:'English', cardStatus:'APPROVED', ekycStatus:'COMPLETED', vkycStatus:'COMPLETED', activationStatus:'PENDING', retryCount:1, optOut:false, lastInteraction:'Yesterday, 4:10 PM' },
  { id:'arjun', name:'Arjun', phoneMasked:'96XXXXXX02', language:'English', cardStatus:'ACTIVE', ekycStatus:'COMPLETED', vkycStatus:'COMPLETED', activationStatus:'COMPLETED', retryCount:0, optOut:false, lastInteraction:'Yesterday, 1:00 PM' },
  { id:'meera', name:'Meera', phoneMasked:'95XXXXXX91', language:'English', cardStatus:'APPROVED', ekycStatus:'PENDING', vkycStatus:'PENDING', activationStatus:'NOT_STARTED', previousObjection:'JOINING_FEE', retryCount:3, optOut:false, lastInteraction:'Today, 9:42 AM' },
  { id:'kabir', name:'Kabir', phoneMasked:'93XXXXXX43', language:'English', cardStatus:'APPROVED', ekycStatus:'COMPLETED', vkycStatus:'PENDING', activationStatus:'NOT_STARTED', previousObjection:'LOW_CREDIT_LIMIT', retryCount:1, optOut:false, lastInteraction:'Today, 12:03 PM' },
  { id:'sana', name:'Sana', phoneMasked:'92XXXXXX30', language:'Hinglish', cardStatus:'APPROVED', ekycStatus:'COMPLETED', vkycStatus:'COMPLETED', activationStatus:'PENDING', previousObjection:'JEWELS_VALUE', retryCount:2, optOut:false, lastInteraction:'Yesterday, 6:20 PM' },
  { id:'vikram', name:'Vikram', phoneMasked:'91XXXXXX77', language:'Unknown', cardStatus:'APPROVED', ekycStatus:'COMPLETED', vkycStatus:'COMPLETED', activationStatus:'COMPLETED', retryCount:1, optOut:false, lastInteraction:'Today, 8:55 AM' }
];
export const seedLogs: InteractionLog[] = [
  { id:'l1', customerId:'priya', kind:'CALL', message:'Initial outreach completed; customer asked for simpler steps.', timestamp:'2026-07-13T11:20:00+05:30' },
  { id:'l2', customerId:'rahul', kind:'OBJECTION', message:'Customer said VKYC feels complicated.', timestamp:'2026-07-13T10:15:00+05:30' },
  { id:'l3', customerId:'neha', kind:'WHATSAPP', message:'Activation guide sent on WhatsApp.', timestamp:'2026-07-12T16:10:00+05:30' },
  { id:'l4', customerId:'vikram', kind:'ESCALATION', message:'State mismatch detected across onboarding systems.', timestamp:'2026-07-13T08:55:00+05:30' }
];
