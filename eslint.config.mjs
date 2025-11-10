import h5pConfig from 'eslint-config-h5p';
import babelParser from "@babel/eslint-parser";

export default {
    ...h5pConfig,
    languageOptions: {
      parser: babelParser,
      ...h5pConfig.languageOptions,
    },
};