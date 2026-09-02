const fs = require('fs');

const path = 'src/components/admin/WorksManagement.tsx';
let content = fs.readFileSync(path, 'utf8');

// Use a string index strategy instead of regex because the component is huge
const startMarker = "// Full-page Inline Editor Mode";
const endMarker = "return (\n    <div className=\"space-y-6\">\n      <WorkHeroEditor />";
const altEndMarker = "<WorkHeroEditor />";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);

  const newCode = `// Full-page Inline Editor Mode
  if (isFormOpen) {
    return (
      <ProjectBuilder 
        initialData={editingWork || formData}
        onCancel={resetForm}
        onSaveSuccess={() => {
          resetForm();
          // The queryClient in layout should invalidate/refetch, or we can force reload
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
      />
    );
  }

  `;

  fs.writeFileSync(path, before + newCode + after, 'utf8');
  console.log('Successfully updated WorksManagement.tsx');
} else {
  console.log('Markers not found', { startIndex, endIndex });
  
  // Try alternative end marker search
  if (startIndex !== -1) {
      const altIndex = content.indexOf(altEndMarker, startIndex);
      if (altIndex !== -1) {
          // Find the beginning of the return block containing WorkHeroEditor
          const returnIndex = content.lastIndexOf("return (", altIndex);
          if (returnIndex !== -1 && returnIndex > startIndex) {
               const before = content.substring(0, startIndex);
               const after = content.substring(returnIndex);
               
               const newCode = `// Full-page Inline Editor Mode
  if (isFormOpen) {
    return (
      <ProjectBuilder 
        initialData={editingWork || formData}
        onCancel={resetForm}
        onSaveSuccess={() => {
          resetForm();
          // The queryClient in layout should invalidate/refetch, or we can force reload
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
      />
    );
  }

  `;
               fs.writeFileSync(path, before + newCode + after, 'utf8');
               console.log('Successfully updated WorksManagement.tsx using alternative marker');
          } else {
             console.log("Found alt marker but not return block");
          }
      } else {
          console.log("Alternative marker not found");
      }
  }
}
