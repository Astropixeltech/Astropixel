const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// Regex to remove <TabsContent value="xxx">...</TabsContent>
const removeTab = (value) => {
  const regex = new RegExp(\`\\{\\/\\* .*? \\*\\/\\}\\s*<TabsContent value="\${value}"[\\s\\S]*?<\\/TabsContent>\`, 'g');
  code = code.replace(regex, '');
  const regex2 = new RegExp(\`<TabsContent value="\${value}"[\\s\\S]*?<\\/TabsContent>\`, 'g');
  code = code.replace(regex2, '');
};

removeTab('paymentmethod');
removeTab('apikeys');
// removeTab('feedback'); // Wait, let's just remove what they didn't ask for in Settings
// Actually, 'feedback' and 'comments' might be under CMS or LMS in the sidebar! 
// Let's verify which ones to remove!
fs.writeFileSync(file, code);
