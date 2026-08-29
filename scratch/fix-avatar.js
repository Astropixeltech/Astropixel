const fs = require('fs');
let code = fs.readFileSync('src/views/AdminDashboard.tsx', 'utf8');

const oldHandleAvatar = `  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Upload image files only');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('File size must be less than 15MB');
      return;
    }

    setUploadingAvatar(true);

    try {
      // Read file as base64 Data URL
      const reader = new FileReader();
      reader.onload = async (event) => {
        const avatarUrl = event.target?.result as string;
        if (typeof window !== 'undefined') {
          localStorage.setItem('astropixel_admin_avatar', avatarUrl);
        }

        try {
          const fileExt = file.name.split('.').pop();
          const filePath = \`\${user?.id || 'admin'}/avatar.\${fileExt}\`;
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: true });

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('avatars')
              .getPublicUrl(filePath);

            await supabase
              .from('profiles')
              .update({ avatar_url: publicUrl })
              .eq('user_id', user?.id);
          }
        } catch (err) {}

        toast.success('Profile picture uploaded successfully!');
        window.location.reload();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Something went wrong');
    } finally {
      setUploadingAvatar(false);
    }
  };`;

const newHandleAvatar = `  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Upload image files only');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('File size must be less than 15MB');
      return;
    }

    setUploadingAvatar(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const avatarUrl = event.target?.result as string;
        if (typeof window !== 'undefined') {
          localStorage.setItem('astropixel_admin_avatar', avatarUrl);
        }

        try {
          const { storage, auth } = await import('@/lib/firebase');
          const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
          const { updateProfile } = await import('firebase/auth');

          if (auth.currentUser) {
            const fileExt = file.name.split('.').pop();
            const storageRef = ref(storage, \`avatars/\${auth.currentUser.uid}.\${fileExt}\`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateProfile(auth.currentUser, { photoURL: downloadURL });
            
            // Also attempt to update Supabase if applicable
            await supabase
              .from('profiles')
              .update({ avatar_url: downloadURL })
              .eq('email', user?.email);
          }
        } catch (err) {
           console.error("Firebase Storage Upload Error", err);
        }

        toast.success('Profile picture uploaded successfully!');
        setTimeout(() => window.location.reload(), 1500);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Something went wrong');
    } finally {
      setUploadingAvatar(false);
    }
  };`;

// replace block exactly if it matches roughly. Since there could be indentation diffs, let's just use regex.
code = code.replace(/const handleAvatarUpload = async \[\s\S]*?setUploadingAvatar\(false\);\s*\}\s*};/m, newHandleAvatar);

// better approach:
const idx1 = code.indexOf('const handleAvatarUpload = async');
const idx2 = code.indexOf('};', idx1 + 1000); // approximate end
if (idx1 > -1) {
  // Let's replace the whole method manually
  let blockEnd = code.indexOf('  // Filter students', idx1); // Next section
  if (blockEnd > -1) {
    code = code.substring(0, idx1) + newHandleAvatar + '\\n\\n' + code.substring(blockEnd);
  }
}

fs.writeFileSync('src/views/AdminDashboard.tsx', code);
