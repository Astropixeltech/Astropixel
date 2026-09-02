const fs = require('fs');
let file = 'src/components/admin/ServicesManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

const badStart = code.indexOf('        ))}\n                      {service.features');
const correctEndIdx = code.indexOf('      </div>\n\n      {servicesList.length === 0');

if (badStart !== -1 && correctEndIdx !== -1) {
  code = code.substring(0, badStart + 11) + code.substring(correctEndIdx);
  fs.writeFileSync(file, code);
  console.log('Fixed trailing loop syntax error (LF)!');
} else {
  const badStartCRLF = code.indexOf('        ))}\r\n                      {service.features');
  const correctEndIdxCRLF = code.indexOf('      </div>\r\n\r\n      {servicesList.length === 0');
  
  if (badStartCRLF !== -1 && correctEndIdxCRLF !== -1) {
    code = code.substring(0, badStartCRLF + 11) + code.substring(correctEndIdxCRLF);
    fs.writeFileSync(file, code);
    console.log('Fixed trailing loop syntax error (CRLF)!');
  } else {
    console.log('Could not find the bounds');
  }
}
