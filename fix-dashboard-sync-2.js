const fs = require('fs');
let file = 'src/views/AdminDashboard.tsx';
let code = fs.readFileSync(file, 'utf8');

const hookToInject = `
  // Auto-sync avatar from team member if missing
  useEffect(() => {
    const syncAvatar = async () => {
      if (profile && !profile.avatar_url) {
        try {
          let imageUrl = null;
          
          if (profile.email) {
            const { data } = await supabase
              .from('team')
              .select('image_url')
              .ilike('email', profile.email)
              .limit(1);
            if (data && data.length > 0) imageUrl = data[0].image_url;
          }
          
          if (!imageUrl && profile.full_name) {
             const { data: nameData } = await supabase
               .from('team')
               .select('image_url')
               .ilike('name', '%' + profile.full_name.split(' ')[0] + '%')
               .limit(1);
             if (nameData && nameData.length > 0) imageUrl = nameData[0].image_url;
          }
          
          if (imageUrl) {
             await supabase
              .from('profiles')
              .update({ avatar_url: imageUrl })
              .eq('user_id', user?.id);
             if (typeof window !== 'undefined') window.location.reload();
          }
        } catch (e) {}
      }
    };
    syncAvatar();
  }, [profile, user]);
`;

if (!code.includes('Auto-sync avatar')) {
  code = code.replace('useEffect(() => {\n    const fetchWorks', hookToInject + '\n  useEffect(() => {\n    const fetchWorks');
  fs.writeFileSync(file, code);
  console.log("Injected auto-sync hook!");
} else {
  console.log("Hook already injected.");
}
