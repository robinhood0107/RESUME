import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 생성 파일과 이전 빌드 캐시는 검사에서 제외한다.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "vendor/**",
    "_site/**",
    "_site_qa/**",
  ]),
]);

export default eslintConfig;
