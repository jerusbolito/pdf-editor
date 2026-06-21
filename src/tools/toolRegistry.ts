import { signatureTool } from './signatureTool';
import { textTool } from './textTool';
import { dateTool } from './dateTool';
import { checkboxTool } from './checkboxTool';
import { imageTool } from './imageTool';
import type { Tool } from '../types';

export const allTools: Tool[] = [
  signatureTool,
  textTool,
  dateTool,
  checkboxTool,
  imageTool,
];

export const toolsById: Record<string, Tool> = Object.fromEntries(
  allTools.map((t) => [t.id, t]),
);
