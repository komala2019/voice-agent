import { runAllGoldenTests } from './lib/evaluator';

const results = runAllGoldenTests();
let passed = 0;
results.forEach(r => {
  if (r.pass) {
    passed++;
    console.log(`✅ Test Passed: ${r.id} - ${r.title}`);
  } else {
    console.log(`❌ Test Failed: ${r.id} - ${r.title}`);
    console.log(`   Input: ${r.userUtterance}`);
    console.log(`   Agent Reply: ${r.result.reply}`);
    console.log(`   Actual Outcome: ${r.result.outcome} (Expected: ${r.expectedOutcome})`);
    console.log(`   Total Score: ${r.total}`);
  }
});

console.log(`\n============================`);
console.log(`Results: ${passed}/${results.length} passed.`);
console.log(`============================\n`);
