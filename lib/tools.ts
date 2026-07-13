import { InteractionLog, ToolCall } from './types';
let failNext = false;
export function setFailNextTool(value: boolean) { failNext = value; }
function runTool(name: string, args?: Record<string, unknown>): ToolCall {
  if (failNext) { failNext = false; return { name, status: 'FAILED', args }; }
  return { name, status: 'SUCCESS', args };
}
export function getCustomerStage(customerId: string) { return runTool('get_customer_stage', { customerId }); }
export function sendWhatsApp(customerId: string, template: string) { return runTool('send_whatsapp', { customerId, template }); }
export function scheduleCallback(customerId: string, dateTime: string, reason: string) { return runTool('schedule_callback', { customerId, dateTime, reason }); }
export function logObjection(customerId: string, objection: string) { return runTool('log_objection', { customerId, objection }); }
export function logCallOutcome(customerId: string, outcome: string) { return runTool('log_call_outcome', { customerId, outcome }); }
export function createHumanEscalation(customerId: string, reason: string) { return runTool('create_human_escalation', { customerId, reason }); }
export function makeLog(customerId: string, kind: InteractionLog['kind'], message: string): InteractionLog {
  return { id: Math.random().toString(36).slice(2), customerId, kind, message, timestamp: new Date().toISOString() };
}
