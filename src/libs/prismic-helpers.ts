export function asText(field: any): string {
  if (!field) return '';
  
  if (Array.isArray(field)) {
    return field.map(item => item.text || '').join(' ');
  }
  
  if (typeof field === 'string') {
    return field;
  }
  
  return '';
}

export function asImageUrl(field: any): string {
  if (!field) return '';
  
  if (typeof field === 'string') {
    return field;
  }
  
  if (field.url) {
    return field.url;
  }
  
  return '';
}

export function asLink(field: any): string {
  if (!field) return '';
  
  if (typeof field === 'string') {
    return field;
  }
  
  if (field.url) {
    return field.url;
  }
  
  return '';
} 