import * as Yup from 'yup';

const generateValidationSchema = (formType,) => {

  // const {
  //   showAddress = false,
  //   showBankDetails = false,
  //   showEmergencyContact = false
  // } = options;
  const baseSchema = {
    name: Yup.string().required('Name is required'),
    // category: Yup.string().required('Category is required'),
  };


  const employeeSchema = {
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string(),
    // employeeId: Yup.string().required('Employee ID is required'),
    dob: Yup.date().required('Date of birth is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    hireDate: Yup.date().required('Hire date is required'),
    department: Yup.string().required('Department is required'),
    jobTitle: Yup.string().required('Job title is required'),
    status: Yup.string().required('Status is required'),
    salary: Yup.number()
      .positive('Salary must be positive')
      .required('Salary is required'),
    mainAddress: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    mainAddress: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    accountNumber: Yup.string()
      .matches(/^[0-9]{9,18}$/, 'Invalid account number')
      .required('Account number is required'),
    bankName: Yup.string().required('Bank name is required'),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
      .required('IFSC code is required'),
    emergencyContactName: Yup.string(),
    emergencyContactPhone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Emergency contact phone is required'),
    emergencyContactRelation: Yup.string(),

    // Conditional address validation
    // ...(showAddress && {
    //   mainAddress: Yup.string().required('Address is required'),
    //   city: Yup.string().required('City is required'),
    //   state: Yup.string().required('State is required'),
    //   pincode: Yup.string()
    //     .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    //     .required('Pincode is required'),

    // }),

    // // Conditional bank details validation
    // ...(showBankDetails && {
    //   accountNumber: Yup.string()
    //     .matches(/^[0-9]{9,18}$/, 'Invalid account number')
    //     .required('Account number is required'),
    //   bankName: Yup.string().required('Bank name is required'),
    //   ifscCode: Yup.string()
    //     .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
    //     .required('IFSC code is required'),
    // }),

    // // Conditional emergency contact validation
    // ...(showEmergencyContact && {
    //   emergencyContactName: Yup.string(),
    //   emergencyContactPhone: Yup.string()
    //     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    //     .required('Emergency contact phone is required'),
    //   emergencyContactRelation: Yup.string(),
    // }),
  };

  const specificSchemas = {
    'Item List': {
      category: Yup.string().required('Category is required'),
      inventoryType: Yup.string().required('Inventory Type is required'),
      minStock: Yup.number().min(0, 'Stock can not be less than 0').required('Minimum Stock is required'),
      unit: Yup.string().required('Unit Type is required'),
      hsnCode: Yup.string().required('HSN Code is required'),
      gstRate: Yup.number().required('GST Rate is required'),
    },
    'Sale&Purchase': {
      invoiceNo: Yup.string().required('Invoice Number is required'),
      quantity: Yup.number().positive('Stock must be a positive number').required('Quantities are required'),
      unitPrice: Yup.number().positive('Price must be a positive number').required('Unit Price is required'),
      // taxableAmount: Yup.number().positive('Amount must be positive').required('Amount is required'),
      unit: Yup.string().required('Unit is required'),
      clientVendor: Yup.string().required('Client/Vendor is required'),
      biltyNumber: Yup.string().required('Bilty Number is required'),
      remarks: Yup.string(),
    },
    'Purchase Return': {
      invoiceNo: Yup.string().required('Invoice Number is required'),
      amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
      quantity: Yup.number().positive('Quantity must be positive').required('Quantity is required'),
      clientVendor: Yup.string().required('Client/Vendor is required'),
      creditNoteNo: Yup.string().required('Credit Note Number is required'),
      condition: Yup.string().required('Condition is required'),
      remarks: Yup.string(),
    },
    'Sales Return': {
      invoiceNo: Yup.string().required('Invoice Number is required'),
      unitPrice: Yup.number().positive('Amount must be positive').required('Amount is required'),
      // quantity: Yup.number().positive('Quantity must be positive').required('Quantity is required'),
      quantity: Yup.number().positive('Must be a positive number').required('Quantity is required'),
      unit: Yup.string().required('Unit is required'),
      clientVendor: Yup.string().required('Client/Vendor is required'),
      creditNoteNo: Yup.string().required('Credit Note Number is required'),
      condition: Yup.string().required('Condition is required'),
      remarks: Yup.string(),
    },
    'Purchase Return': {
      invoiceNo: Yup.string().required('Invoice Number is required'),
      unitPrice: Yup.number().positive('Amount must be positive').required('Amount is required'),
      // quantity: Yup.number().positive('Quantity must be positive').required('Quantity is required'),
      quantity: Yup.number().positive('Must be a positive number').required('Quantity is required'),
      unit: Yup.string().required('Unit is required'),
      clientVendor: Yup.string().required('Client/Vendor is required'),
      debitNoteNo: Yup.string().required('Debit Note Number is required'),
      // condition: Yup.string().required('Condition is required'),
      remarks: Yup.string(),
    },
    'Employees List': employeeSchema,
    'leaveRequest': {
      leaveType: Yup.string().required('Leave type is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .required('End date is required')
        .min(Yup.ref('startDate'), 'End date must be after start date'),
      totalDays: Yup.number(),
      reason: Yup.string().required('Required'),
      acknowledgment: Yup.boolean()
        .oneOf([true], 'You must acknowledge the leave policies')
    },
    'Holiday': {
      date: Yup.date().required('Date is required'),
      type: Yup.string().required('Type is required'),
      status: Yup.string().required('Status is required')
    },
    'Attendance Request': {
      date: Yup.date().required('Date is required'),
      requestedLogInTime: Yup.string().required('Loh in Time is required'),
      requestedLogOutTime: Yup.string().required('Log out time is required'),
      reason: Yup.string()
    },
    'Complaints and Queries': {
      type: Yup.string().required('required'),
      subject: Yup.string().required('required'),
      description: Yup.string().required('required'),
      priority: Yup.string().required('required')
    }
  };


  return Yup.object().shape({
    ...(formType !== 'Employees List' && formType !== 'leaveRequest' && formType!=='Attendance Request' &&formType!=='Complaints and Queries' ? baseSchema : {}),
    ...(specificSchemas[formType] || {})
  });
};


export { generateValidationSchema };