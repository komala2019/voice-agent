import { InteractionLog, ToolCall } from './types';

function runTool(name: string, args?: Record<string, unknown>, failNextTool?: boolean): ToolCall {
  if (failNextTool) {
    return { name, status: 'FAILED', args };
  }
  return { name, status: 'SUCCESS', args };
}

export function getCustomerStage(customerId: string, failNextTool?: boolean) { return runTool('get_customer_stage', { customerId }, failNextTool); }
export function sendWhatsApp(customerId: string, template: string, failNextTool?: boolean) { return runTool('send_whatsapp', { customerId, template }, failNextTool); }
export function scheduleCallback(customerId: string, dateTime: string, reason: string, failNextTool?: boolean) { return runTool('schedule_callback', { customerId, dateTime, reason }, failNextTool); }
export function logObjection(customerId: string, objection: string, failNextTool?: boolean) { return runTool('log_objection', { customerId, objection }, failNextTool); }
export function logCallOutcome(customerId: string, outcome: string, failNextTool?: boolean) { return runTool('log_call_outcome', { customerId, outcome }, failNextTool); }
export function createHumanEscalation(customerId: string, reason: string, failNextTool?: boolean) { return runTool('create_human_escalation', { customerId, reason }, failNextTool); }

export function makeLog(customerId: string, kind: InteractionLog['kind'], message: string): InteractionLog {
  return { id: Math.random().toString(36).slice(2), customerId, kind, message, timestamp: new Date().toISOString() };
}
