const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Add localAvatar state
if (!code.includes('const [localAvatar, setLocalAvatar]')) {
  code = code.replace(
    "const [uploadingAvatar, setUploadingAvatar] = useState(false);",
    "const [uploadingAvatar, setUploadingAvatar] = useState(false);\n  const [localAvatar, setLocalAvatar] = useState<string | null>(null);\n\n  useEffect(() => {\n    if (typeof window !== 'undefined') {\n      setLocalAvatar(localStorage.getItem('astropixel_admin_avatar'));\n    }\n  }, []);"
  );
}

// 2. Update all occurrences of avatar reading
code = code.replace(/\(\(profile as any\)\?\.avatar_url \|\| user\?\.photoURL\)/g, '(localAvatar || (profile as any)?.avatar_url || user?.photoURL)');
code = code.replace(/profile\?\.avatar_url \|\| user\?\.photoURL/g, 'localAvatar || profile?.avatar_url || user?.photoURL');

// 3. Ensure handleAvatarUpload sets localAvatar
code = code.replace(
  "toast.success('Profile picture uploaded successfully!');",
  "try { localStorage.setItem('astropixel_admin_avatar', finalUrl); } catch(e){}\n        setLocalAvatar(finalUrl);\n        toast.success('Profile picture uploaded successfully!');"
);

// 4. Update the auto-sync to also set localAvatar and localStorage
code = code.replace(
  "await supabase\n              .from('profiles')\n              .update({ avatar_url: imageUrl })\n              .eq('user_id', user?.id);",
  "await supabase\n              .from('profiles')\n              .update({ avatar_url: imageUrl })\n              .eq('user_id', user?.id);\n             try { localStorage.setItem('astropixel_admin_avatar', imageUrl); } catch(e){}\n             setLocalAvatar(imageUrl);"
);

// 5. Remove the window.location.reload from the auto-sync
code = code.replace(/if \(typeof refreshProfile !== "undefined"\) refreshProfile\(\);/g, '');

fs.writeFileSync(file, code);
console.log("Fixed missing avatar display!");
