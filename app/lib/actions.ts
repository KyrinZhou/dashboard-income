'use server';
import { registerIn, signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '用户或密码有误，请检查';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function registerFunc(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const res = await registerIn(formData);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
