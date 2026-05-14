const fs = require('fs');

const configContent = `window.CONFIG = {
    SUPABASE_URL: '${process.env.SUPABASE_URL || ''}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY || ''}',
};`;

fs.writeFileSync('config.js', configContent);
console.log('config.js generated successfully from environment variables.');
