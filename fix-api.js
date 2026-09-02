const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  // Remove backslash before backtick
  content = content.replace(/\\\`/g, '\`');
  // Remove backslash before dollar sign
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(file, content);
}

fixFile('app/api/mail/send/route.ts');
fixFile('app/api/webhooks/resend/route.ts');
console.log('Fixed API routes');
