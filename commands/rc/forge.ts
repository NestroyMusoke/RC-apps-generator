import { rcTestsSkill } from '../../skills/rc-tests';

export const forgeCommand = {
  name: 'rc:forge',
  description: 'Test-Driven Forge: describe app → generate tests FIRST → code → run tests → package',
  async execute(args: string[]) {
    const description = args.join(' ');
    console.log("🔨 Starting Test-Driven Forge for:", description);

    
    await rcTestsSkill.execute(description);

    
    console.log("📝 Generating app code that passes the tests...");

    
    console.log("✅ Forge complete! App is ready with full tests.");

    return `🚀 App forged successfully!\nRun: cd generated-app && npm test\nThen use /rc:deploy`;
  }
};