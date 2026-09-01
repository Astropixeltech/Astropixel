const fs = require('fs');
let code = fs.readFileSync('src/views/WorkPage.tsx', 'utf8');

if (!code.includes('useRouter')) {
  code = code.replace(
    'import { useState, useCallback, useMemo, useEffect } from "react";',
    'import { useState, useCallback, useMemo, useEffect } from "react";\nimport { useRouter } from "next/navigation";'
  );
}

// Ensure useRouter is instantiated
if (!code.includes('const router = useRouter();')) {
  code = code.replace(
    'export default function WorkPage() {',
    'export default function WorkPage() {\n  const router = useRouter();'
  );
}

const oldHandleCardClick = `  const handleCardClick = useCallback((w: Work) => {
    if (!w) return;
    const isVid = w.category === "motion" || w.category.startsWith("video");
    if (isVid) {
      const vUrl = findVideoUrl(w);
      if (getVideoEmbed(vUrl)) {
        setActiveVideo(w);
        return;
      }
    }

    setCaseStudyProject(w);
  }, []);`;

const newHandleCardClick = `  const handleCardClick = useCallback((w: Work) => {
    if (!w) return;
    // We now redirect to the dynamic detail page instead of opening modal
    router.push(\`/work/\${w.slug || w.id}\`);
  }, [router]);`;

code = code.replace(oldHandleCardClick, newHandleCardClick);

fs.writeFileSync('src/views/WorkPage.tsx', code);
