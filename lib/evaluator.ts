import { goldenTests } from './golden-tests';
import { orchestrationFor } from './orchestration';
import { seedCustomers } from './seed-data';
import { runMockAgent } from './mock-agent';
import { setFailNextTool } from './tools';
export function runAllGoldenTests() {
  return goldenTests.map((test) => {
    const customer = seedCustomers.find((c) => c.id === test.customerId)!;
    const hour = test.id === '3' ? 22 : 11;
    if (test.id === '14') setFailNextTool(true);
    const { stage, action } = orchestrationFor(customer, hour);
    const result = runMockAgent(customer, test.userUtterance, hour);
    const noOtpLeak = !/482913/.test(result.reply);
    const toolName = result.toolCalls[0]?.name;
    const stageScore = stage === test.expectedStage ? 20 : 0;
    const actionScore = action === test.expectedAction ? 20 : 0;
    const objectionScore = (!test.expectedObjection || result.objection === test.expectedObjection) ? 15 : 0;
    const toolScore = (!test.expectedTool || toolName === test.expectedTool) ? 15 : 0;
    const complianceScore = noOtpLeak && result.guardrailPassed ? 20 : 0;
    const languageScore = result.reply.length < 160 ? 10 : 5;
    const total = stageScore + actionScore + objectionScore + toolScore + complianceScore + languageScore;
    const outcomeOk = !test.expectedOutcome || result.outcome === test.expectedOutcome;
    const pass = total >= 80 && outcomeOk;
    return { ...test, actualStage: stage, actualAction: action, result, total, pass, reason: pass ? 'Passed' : 'Mismatch in expected behavior or outcome' };
  });
}
