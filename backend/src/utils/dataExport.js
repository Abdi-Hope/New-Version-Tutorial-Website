const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const ExcelJS = require('exceljs');

exports.exportUsersToCSV = async (users, filePath) => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'name', title: 'Name' },
      { id: 'email', title: 'Email' },
      { id: 'role', title: 'Role' },
      { id: 'createdAt', title: 'Joined Date' },
      { id: 'coursesEnrolled', title: 'Courses Enrolled' },
      { id: 'coursesCompleted', title: 'Courses Completed' },
    ],
  });

  const records = users.map(user => ({
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    coursesEnrolled: user.stats?.coursesEnrolled || 0,
    coursesCompleted: user.stats?.coursesCompleted || 0,
  }));

  await csvWriter.writeRecords(records);
  return filePath;
};

exports.exportCoursesToExcel = async (courses, filePath) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Courses');

  // Add headers
  worksheet.columns = [
    { header: 'Title', key: 'title', width: 30 },
    { header: 'Instructor', key: 'instructor', width: 20 },
    { header: 'Category', key: 'category', width: 15 },
    { header: 'Price', key: 'price', width: 10 },
    { header: 'Students', key: 'students', width: 10 },
    { header: 'Rating', key: 'rating', width: 10 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Created', key: 'created', width: 15 },
  ];

  // Add rows
  courses.forEach(course => {
    worksheet.addRow({
      title: course.title,
      instructor: course.instructor?.name || 'N/A',
      category: course.category,
      price: `$${course.price}`,
      students: course.studentsEnrolled,
      rating: course.ratings?.average?.toFixed(1) || 'N/A',
      status: course.status,
      created: new Date(course.createdAt).toLocaleDateString(),
    });
  });

  // Add some formatting
  worksheet.getRow(1).font = { bold: true };
  
  await workbook.xlsx.writeFile(filePath);
  return filePath;
};
