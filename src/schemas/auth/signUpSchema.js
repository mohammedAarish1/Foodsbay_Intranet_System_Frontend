import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  userId: Yup.string().required('Required'),
    fullName: Yup.string().required('Required').min(2,'Minimum 2 characters'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    department: Yup.string().required('Required'),
    // profilePicture: Yup.mixed(),
  });