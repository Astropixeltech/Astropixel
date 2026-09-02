const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// Wrap the localStorage setItem in a try-catch
code = code.replace(
  "localStorage.setItem('astropixel_admin_avatar', avatarUrl);",
  "try { localStorage.setItem('astropixel_admin_avatar', avatarUrl); } catch (e) { console.warn('localStorage full, skipping avatar cache'); }"
);

fs.writeFileSync(file, code);
console.log("Fixed QuotaExceededError in AdminDashboard!");
