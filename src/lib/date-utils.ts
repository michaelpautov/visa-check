/**
 * Converts date strings in ISO format to Date objects within a complex data structure
 * Recursively traverses objects and arrays to find and convert date strings
 */
export const convertDatesToDateObjects = (data: unknown): unknown => {
  if (!data) return data;
  
  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      return data.map(item => convertDatesToDateObjects(item));
    }
    
    const result: Record<string, unknown> = {};
    for (const key in data as Record<string, unknown>) {
      const value = (data as Record<string, unknown>)[key];
      // Check if the value is a date string (ISO format)
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        result[key] = new Date(value);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = convertDatesToDateObjects(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  
  return data;
}; 