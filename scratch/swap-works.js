const fs = require('fs');
let code = fs.readFileSync('src/components/admin/WorksManagement.tsx', 'utf8');

if (!code.includes('import ProjectBuilder')) {
  code = code.replace(
    'import { DEFAULT_PORTFOLIO_PROJECTS, Work, getSavedWorks } from "@/hooks/useWorks";',
    'import { DEFAULT_PORTFOLIO_PROJECTS, Work, getSavedWorks } from "@/hooks/useWorks";\nimport ProjectBuilder from "./ProjectBuilder";'
  );
}

const renderBlock = `    // Full-page Inline Editor Mode
    if (isFormOpen) {
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">`;

const replacement = `    // Full-page Inline Editor Mode
    if (isFormOpen) {
      return (
        <ProjectBuilder 
          initialData={editingWork} 
          onCancel={resetForm} 
          onSaveSuccess={() => {
            // Refresh works
            resetForm();
            // trigger refetch hack
            queryClient.invalidateQueries({ queryKey: ["admin-works"] });
            setTimeout(() => window.location.reload(), 1000);
          }} 
        />
      );
    }
    
    // Unreachable block just to avoid syntax error in script matching
    if (false) {
      return (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-sm">`;

code = code.replace(renderBlock, replacement);
fs.writeFileSync('src/components/admin/WorksManagement.tsx', code);
