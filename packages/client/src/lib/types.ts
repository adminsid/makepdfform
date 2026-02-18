export interface FormField {
  id: string;
  type: 'text' | 'checkbox' | 'signature' | 'date';
  x: number;
  y: number;
  width: number;
  height: number;
  page: number; // 1-based page number
  value?: string | boolean;
  name?: string;
  required?: boolean;
}

export interface FormMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
