import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  userId: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  rememberMe: Yup.boolean(),
});