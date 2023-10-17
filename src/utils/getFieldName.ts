export const getFieldName = (field: { label: string; id: number | string }) =>
  `${field.label.toLowerCase().replaceAll(' ', '-')}-${field.id}`;
