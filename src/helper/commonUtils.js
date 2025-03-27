export const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };


  // convert the date into readbale format
  export function formatDate(date, format='') {
    if (!date) return '__';
    switch (format) {
      case 'date':
        return new Date(date).toLocaleDateString();
      case 'time':
        return new Date(date).toLocaleTimeString() ;
      case 'datetime':
        return new Date(date).toLocaleString();
      default:
        return new Date(date).toLocaleDateString();
    }
  } 