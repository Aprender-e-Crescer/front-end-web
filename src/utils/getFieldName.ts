export const getFieldName = (field: { label: string; _id: number | string }) =>
  `${field.label.toLowerCase().replaceAll(' ', '-')}-${field._id}`;
