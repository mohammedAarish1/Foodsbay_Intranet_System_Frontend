const getColor = (value) => {
  // Handle status cases
  switch (value.toLowerCase()) {
    case 'in stock':
    case 'active':
    case 'approved':
    case 'present':
    case 'resolved':
      return 'success';
    case 'low stock':
    case 'pending':

      return 'warning';
    case 'out of stock':
    case 'rejected':
      return 'error';
    // Handle item type cases
    case 'damaged':
    case 'in progress':
      return 'secondary';
    case 'expired':
    case 'defective': 
      return 'error';
    case 'perfect':
      return 'success';
    default:
      return 'default';
  }
};


export {
  // getStatusColor,
  // getItemTypeColor,
  getColor
}