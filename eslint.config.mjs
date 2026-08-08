import nextVitals from 'eslint-config-next/core-web-vitals';

const patchedVitals = nextVitals.map((config) => {
  if (config.files && Array.isArray(config.files)) {
    return {
      ...config,
      files: config.files.flatMap((f) =>
        typeof f === 'string' && f.includes('{')
          ? ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.ts', '**/*.tsx']
          : [f]
      ),
    };
  }
  return config;
});

const eslintConfig = [
  ...patchedVitals,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**'],
  },
];

export default eslintConfig;

