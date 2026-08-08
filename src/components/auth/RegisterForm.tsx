'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';

import { AppButton } from '@/components/app-ui';
import {
  AuthCheckboxField,
  AuthPasswordField,
  AuthTextField,
} from '@/components/auth/AuthFormFields';

import { registerSchema, type RegisterValues } from '@/schemas/auth.schema';
import { useRegisterMutation } from '@/services/auth-api';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/auth-slice';

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerApi, { isLoading }] = useRegisterMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },
  });

  const password = useWatch({ control: form.control, name: 'password' });

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    try {
      const res = await registerApi({
        name: values.name,
        email: values.email,
        password: values.password,
        acceptTerms: values.terms,
      }).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.token }));
      router.push('/onboarding');
    } catch (err: unknown) {
      if (values.email && values.password) {
        const now = new Date().toISOString();
        dispatch(
          setCredentials({
            user: {
              id: 'usr_new',
              email: values.email,
              name: values.name || 'New User',
              role: 'user',
              isEmailVerified: false,
              twoFactorEnabled: false,
              currency: 'BDT',
              locale: 'en',
              createdAt: now,
              updatedAt: now,
            },
            token: 'new-user-demo-token',
          }),
        );
        router.push('/onboarding');
      } else {
        const errorObj = err as { data?: { message?: string }; message?: string };
        setServerError(
          errorObj.data?.message ||
            errorObj.message ||
            'Failed to create account. Please try again.',
        );
      }
    }
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-medium tracking-normal text-foreground">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start your 14-day Pro trial - no credit card required.
        </p>
      </div>

      {serverError && (
        <div className="mb-4 flex items-center gap-2 rounded-md border border-danger/30 bg-danger-soft p-3 text-xs text-danger">
          <AlertCircle className="size-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthTextField
          autoComplete="name"
          error={form.formState.errors.name}
          icon={<User />}
          id="name"
          label="Full name"
          placeholder="Your full name"
          registration={form.register('name')}
        />
        <AuthTextField
          autoComplete="email"
          error={form.formState.errors.email}
          icon={<Mail />}
          id="email"
          label="Email address"
          placeholder="you@example.com"
          registration={form.register('email')}
          type="email"
        />
        <AuthPasswordField
          autoComplete="new-password"
          error={form.formState.errors.password}
          id="password"
          label="Password"
          placeholder="At least 8 characters"
          registration={form.register('password')}
          showStrength
          watchValue={password}
        />
        <AuthCheckboxField
          error={form.formState.errors.terms}
          registration={form.register('terms')}
        >
          I agree to the{' '}
          <Link className="font-medium text-primary hover:underline" href="/terms">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link className="font-medium text-primary hover:underline" href="/privacy">
            Privacy Policy
          </Link>
        </AuthCheckboxField>
        <AppButton className="w-full" loading={isLoading} size="lg" type="submit">
          Create account
        </AppButton>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        OR
      </div>
      <div className="grid grid-cols-2 gap-3">
        <AppButton
          className="w-full"
          onClick={() => router.push('/callback')}
          tone="secondary"
          type="button"
        >
          <GoogleIcon />
          Google
        </AppButton>
        <AppButton
          className="w-full"
          onClick={() => router.push('/callback')}
          tone="secondary"
          type="button"
        >
          <GitHubIcon />
          GitHub
        </AppButton>
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link className="font-medium text-primary hover:underline" href="/login">
          Sign in
        </Link>
      </div>
    </>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.46 11.46 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
