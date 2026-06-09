/**
 * @makepdfform/editor-react
 *
 * Framework-agnostic mounts for pdfme Designer, Form, and Viewer.
 * Each mount function creates an instance of the corresponding pdfme UI class
 * and exposes a clean imperative API so the Svelte shell never needs to import React.
 *
 * Based on pdfme (https://github.com/pdfme/pdfme) – MIT, Copyright (c) 2020 HandDot.
 */

import { Designer, Form, Viewer } from '@makepdfform/ui';
import type { Template, UIOptions } from '@makepdfform/common';
import {
  text,
  image,
  table,
  line,
  rectangle,
  ellipse,
  checkbox,
  radioGroup,
  select,
  date,
  time,
  dateTime,
  barcodes,
} from '@makepdfform/schemas';

// ─── Plugin registry ──────────────────────────────────────────────────────────
const defaultPlugins = {
  Text: text,
  Image: image,
  Table: table,
  Line: line,
  Rectangle: rectangle,
  Ellipse: ellipse,
  Checkbox: checkbox,
  RadioGroup: radioGroup,
  Select: select,
  Date: date,
  Time: time,
  DateTime: dateTime,
  Barcodes: barcodes,
};

// ─── Blank base PDF constant (A4 in mm) ───────────────────────────────────────
export const BLANK_A4: Template['basePdf'] = {
  width: 210,
  height: 297,
  padding: [0, 0, 0, 0],
};

export const defaultTemplate: Template = {
  basePdf: BLANK_A4,
  schemas: [[]],
};

// ─── mountDesigner ─────────────────────────────────────────────────────────────

export interface DesignerHandle {
  /** Update the template programmatically */
  update(template: Template): void;
  /** Destroy the instance and unmount React */
  destroy(): void;
  /** Get the current template snapshot */
  getTemplate(): Template;
  /** Trigger the save callback immediately */
  downloadTemplate(): void;
}

export interface MountDesignerOptions {
  container: HTMLElement;
  template?: Template;
  options?: UIOptions;
  /** Called when the user clicks Save in the Designer toolbar */
  onSaveTemplate?: (template: Template) => void;
  /** Called on every template change */
  onChangeTemplate?: (template: Template) => void;
}

export function mountDesigner({
  container,
  template = defaultTemplate,
  options = {},
  onSaveTemplate,
  onChangeTemplate,
}: MountDesignerOptions): DesignerHandle {
  const designer = new Designer({
    domContainer: container,
    template,
    plugins: defaultPlugins,
    options,
  });

  if (onSaveTemplate) {
    designer.onSaveTemplate(onSaveTemplate);
  }
  if (onChangeTemplate) {
    designer.onChangeTemplate(onChangeTemplate);
  }

  return {
    update(tpl: Template) {
      designer.updateTemplate(tpl);
    },
    destroy() {
      designer.destroy();
    },
    getTemplate() {
      return designer.getTemplate();
    },
    downloadTemplate() {
      designer.saveTemplate();
    },
  };
}

// ─── mountForm ─────────────────────────────────────────────────────────────────

export interface FormHandle {
  /** Get current form input values */
  getInputs(): { [key: string]: string }[];
  /** Destroy the instance */
  destroy(): void;
}

export interface MountFormOptions {
  container: HTMLElement;
  template: Template;
  inputs?: { [key: string]: string }[];
  options?: UIOptions;
  /** Called on every input change */
  onChange?: (inputs: { [key: string]: string }[]) => void;
}

export function mountForm({
  container,
  template,
  inputs = [{}],
  options = {},
  onChange,
}: MountFormOptions): FormHandle {
  const form = new Form({
    domContainer: container,
    template,
    inputs,
    plugins: defaultPlugins,
    options,
  });

  if (onChange) {
    form.onChangeInput(({ inputs: currentInputs }: { inputs: { [key: string]: string }[] }) => {
      onChange(currentInputs);
    });
  }

  return {
    getInputs() {
      return form.getInputs();
    },
    destroy() {
      form.destroy();
    },
  };
}

// ─── mountViewer ───────────────────────────────────────────────────────────────

export interface ViewerHandle {
  /** Destroy the instance */
  destroy(): void;
}

export interface MountViewerOptions {
  container: HTMLElement;
  template: Template;
  inputs: { [key: string]: string }[];
  options?: UIOptions;
}

export function mountViewer({
  container,
  template,
  inputs,
  options = {},
}: MountViewerOptions): ViewerHandle {
  const viewer = new Viewer({
    domContainer: container,
    template,
    inputs,
    plugins: defaultPlugins,
    options,
  });

  return {
    destroy() {
      viewer.destroy();
    },
  };
}
