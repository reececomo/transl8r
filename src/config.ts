/* eslint-disable @typescript-eslint/consistent-type-assertions */
export type Dict = Record<string, string | null>;

export const config = {
  /**
   * Google Application Credentials
   * @see https://cloud.google.com/docs/authentication/getting-started
   */
  googleTranslateKeyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS ?? undefined,
  languages: {
    base: 'en',
    other: ['fr'],
  },
  namespaces: {
    target: 'base.generated',
    other: ['base'],
  },
  path: './{{lang}}/{{namespace}}.json',
  outputDir: '{{group}}-todo-{{date}}',
};
