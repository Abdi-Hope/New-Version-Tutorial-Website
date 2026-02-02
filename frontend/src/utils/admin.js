export const formatRole = (role) => {
  const roles = {
    admin: { label: 'Admin', color: 'bg-red-100 text-red-800' },
    instructor: { label: 'Instructor', color: 'bg-blue-100 text-blue-800' },
    student: { label: 'Student', color: 'bg-green-100 text-green-800' },
  };
  return roles[role] || { label: role, color: 'bg-gray-100 text-gray-800' };
};

export const formatStatus = (status) => {
  const statuses = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    blocked: { label: 'Blocked', color: 'bg-red-100 text-red-800' },
  };
  return statuses[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
};

export const formatCourseStatus = (status) => {
  const statuses = {
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
    published: { label: 'Published', color: 'bg-green-100 text-green-800' },
    archived: { label: 'Archived', color: 'bg-red-100 text-red-800' },
    pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
  };
  return statuses[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};

export const getPaginationInfo = (data) => {
  return {
    total: data.total || 0,
    page: data.currentPage || 1,
    limit: data.limit || 10,
    totalPages: data.totalPages || 1,
  };
};

export const exportToCSV = (data, filename) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + data.map(row => Object.values(row).join(",")).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
