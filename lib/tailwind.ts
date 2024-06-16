import { Config } from 'tailwindcss';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

export const fullConfig = resolveConfig(tailwindConfig as any);
export const theme = fullConfig.theme as Config['theme'];

// @ts-ignore
export const colors: Config['theme']['colors'] = theme?.colors;
