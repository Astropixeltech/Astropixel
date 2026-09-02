const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace EmailManagement import
if (!code.includes("import MailWorkspace")) {
  code = code.replace(
    "import EmailManagement from '@/components/admin/EmailManagement';",
    "import EmailManagement from '@/components/admin/EmailManagement';\nimport MailWorkspace from '@/components/admin/mail/MailWorkspace';"
  );
}

// Replace TabsContent email
const emailTabRegex = /<TabsContent value="email" className="space-y-6">\s*<EmailManagement[^>]*\/>\s*<\/TabsContent>/;
code = code.replace(
  emailTabRegex,
  `<TabsContent value="email" className="space-y-0 h-[800px]">
              <MailWorkspace />
            </TabsContent>`
);

fs.writeFileSync(file, code);
console.log("Updated AdminDashboard to use MailWorkspace!");
