const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace window.location.reload() in handleAvatarUpload
code = code.replace(
  "toast.success('Profile picture uploaded successfully!');\n          window.location.reload();",
  "toast.success('Profile picture uploaded successfully!');\n          if (typeof refreshProfile !== 'undefined') refreshProfile(); else window.location.reload();\n          setUploadingAvatar(false);"
);

if (!code.includes('refreshProfile } = useAuth();')) {
  code = code.replace(
    'const { user, profile, signOut, isAdmin, isLoading: authLoading } = useAuth();',
    'const { user, profile, signOut, isAdmin, isLoading: authLoading, refreshProfile } = useAuth();'
  );
}

fs.writeFileSync(file, code);
console.log("Fixed avatar reload!");
