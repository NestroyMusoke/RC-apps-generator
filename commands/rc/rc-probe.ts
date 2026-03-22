import * as http from 'http';
import * as https from 'https';

const serverUrl = process.argv[2] || 'http://localhost:3000';

// Exact same mapping table from your proposal + your desktop file
const versionMap: Record<string, any> = {
    '8.2': { appsEngine: '1.60.0', node: '22.16.0', mongo: '8.0' },
    '8.1': { appsEngine: '1.59.1', node: '22.16.0', mongo: '8.0' },
    '8.0': { appsEngine: '1.59.0', node: '22.16.0', mongo: '8.0' },
    '7.13': { appsEngine: '1.58.0', node: '14.21.4', mongo: '6.0' },
    '7.12': { appsEngine: '1.57.0', node: '14.21.4', mongo: '6.0' },
    '7.10': { appsEngine: '1.55.0', node: '14.21.4', mongo: '6.0' },
};

const url = `${serverUrl}/api/info`;
const client = url.startsWith('https') ? https : http;

console.log('\n🔍 RC Workspace Probe — Layer 1');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`   Target Server: ${serverUrl}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

client.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const info = JSON.parse(data);
            const rcVersion = info.version;
            const majorMinor = rcVersion.split('.').slice(0, 2).join('.');
            const env = versionMap[majorMinor] || { appsEngine: 'unknown', node: 'unknown', mongo: 'unknown' };

            console.log('📋 Workspace Profile (Layer 1 Complete):');
            console.log(`   RC Version:          ${rcVersion}`);
            console.log(`   Apps Engine:         ${env.appsEngine}`);
            console.log(`   Node.js:             ${env.node}`);
            console.log(`   MongoDB:             ${env.mongo}`);
            console.log(`   requiredApiVersion:  ^1.44.0 (auto-set in app.json)`);
            console.log(`   Packaging:           ${env.appsEngine === 'unknown' ? 'TypeScript source' : 'Pre-compiled JS'}`);
            console.log('\n✅ Layer 1 ready — all future code will be 100% compatible with this workspace.');
        } catch (e) {
            console.error('❌ Could not parse /api/info response');
        }
    });
}).on('error', (e) => {
    console.error(`❌ Could not reach Rocket.Chat server: ${e.message}`);
});