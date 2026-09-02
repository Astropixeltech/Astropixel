const fs = require('fs');
const file = 'src/views/AdminDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldState = `const [activeTab, setActiveTab] = useState('dashboard');`;
const newState = `const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_active_tab') || 'dashboard';
    }
    return 'dashboard';
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_active_tab', activeTab);
    }
  }, [activeTab]);`;

if (content.includes(oldState)) {
  content = content.replace(oldState, newState);
  fs.writeFileSync(file, content);
  console.log('Fixed AdminDashboard tabs!');
} else {
  console.log('Could not find useState hook in AdminDashboard.tsx');
}
