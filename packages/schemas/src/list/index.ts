import type { Plugin } from '@makepdfform/common';
import { List } from 'lucide';
import { createSvgStr } from '../utils.js';
import { pdfRender } from './pdfRender.js';
import { propPanel } from './propPanel.js';
import { uiRender } from './uiRender.js';
import type { ListSchema } from './types.js';

const listSchema: Plugin<ListSchema> = {
  pdf: pdfRender,
  ui: uiRender,
  propPanel,
  icon: createSvgStr(List),
};

export default listSchema;
