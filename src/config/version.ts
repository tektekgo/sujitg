// Version configuration
// Update these manually for major/minor releases
export const VERSION_MAJOR = 1;
export const VERSION_MINOR = 0;

// Patch version is auto-incremented based on git commit count
export const VERSION_PATCH = __GIT_COMMIT_COUNT__;

// Build timestamp is injected at build time by Vite
export const BUILD_TIMESTAMP = __BUILD_TIMESTAMP__;

// Format: v1.0.42 · Built Dec 1, 2025
export const getVersionString = () => {
  const version = `v${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_PATCH}`;
  const buildDate = new Date(BUILD_TIMESTAMP);
  const formatted = buildDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `${version} · Built ${formatted}`;
};
