import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {
      // any 타입을 명시적으로 사용하는 것을 금지
      "@typescript-eslint/no-explicit-any": "error",
      // 함수에 반환 타입이 명시되어 있지 않으면 오류 발생
      "@typescript-eslint/explicit-function-return-type": "error",
      // 선언했지만 사용되지 않는 변수에 오류 표시
      "@typescript-eslint/no-unused-vars": "error",
      /** 타입 안전성 검사 */
      // 타입이 any 또는 unknown인 값을 함수처럼 호출하면 경고
      "@typescript-eslint/no-unsafe-call": "error",
      //타입이 any 또는 unknown인 값에서 속성 접근 시 경고
      "@typescript-eslint/no-unsafe-member-access": "error",
      // any 또는 unknown 값을 변수에 할당하는 것을 경고
      "@typescript-eslint/no-unsafe-assignment": "error",
      // any 또는 unknown 값을 함수의 반환값으로 사용하는 것을 경고
      "@typescript-eslint/no-unsafe-return": "error",
      // any 또는 unknown 값을 함수의 인자로 전달하는 것을 경고
      "@typescript-eslint/no-unsafe-argument": "error",
      // any 또는 unknown 값을 enum과 비교하는 것을 경고
      "@typescript-eslint/no-unsafe-enum-comparison": "error",
      // any 또는 unknown 값을 타입 단언 (as ...) 하는 것을 경고
      "@typescript-eslint/no-unsafe-type-assertion": "error",
    },
  },

  // next/core-web-vitals 및 typescript 호환을 위해 compat.extends 사용
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
