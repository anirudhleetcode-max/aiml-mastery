import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/guard';
import { AuthForm } from '@/components/layout/auth-form';

export const metadata: Metadata = { title: 'Create your account' };

export default async function SignupPage() {
  if (await getCurrentUser()) redirect('/dashboard');
  return <AuthForm mode="signup" />;
}
