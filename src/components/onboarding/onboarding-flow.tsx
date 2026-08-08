'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight, ArrowLeft, DollarSign, Sparkles } from 'lucide-react';
import { AppButton, AppCard, AppField } from '@/components/app-ui';

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [currency, setCurrency] = useState('BDT');
  const [walletName, setWalletName] = useState('Main Wallet');
  const [walletType, setWalletType] = useState('bank');
  const [initialBalance, setInitialBalance] = useState('10000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/dashboard');
      }, 800);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  return (
    <div className="mx-auto max-w-xl py-12 px-4">
      {/* Progress Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" />
          <span>Step {step} of 3</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {step === 1 && 'Welcome to MoneyBag!'}
          {step === 2 && 'Set up your first wallet'}
          {step === 3 && 'All set to start!'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === 1 && 'Select your primary currency to personalize your experience.'}
          {step === 2 &&
            'Give your primary spending or savings account a name and starting balance.'}
          {step === 3 && 'Your workspace is ready. Let’s head to your dashboard.'}
        </p>
      </div>

      {/* Steps Indicators */}
      <div className="mb-8 flex items-center justify-between gap-2 px-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
                s <= step
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-muted text-muted-foreground'
              }`}
            >
              {s < step ? <CheckCircle2 className="size-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`h-0.5 flex-1 mx-2 ${s < step ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Contents */}
      <AppCard className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <AppField
              label="Primary Currency"
              description="This will be used as default for totals and reports."
            >
              <select
                id="currency"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="INR">INR (₹) - Indian Rupee</option>
              </select>
            </AppField>

            <div className="rounded-md border border-muted p-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <DollarSign className="size-5 text-primary" />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Multi-currency support</h4>
                  <p className="text-xs text-muted-foreground">
                    You can add wallets with different currencies at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <AppField label="Wallet Name">
              <input
                id="walletName"
                type="text"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder="e.g. City Bank Account"
              />
            </AppField>

            <AppField label="Account Type">
              <select
                id="walletType"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={walletType}
                onChange={(e) => setWalletType(e.target.value)}
              >
                <option value="bank">Bank Account</option>
                <option value="mobile_wallet">Mobile Wallet (bKash/Nagad)</option>
                <option value="cash">Cash in Hand</option>
                <option value="credit_card">Credit Card</option>
                <option value="investment">Investment Account</option>
              </select>
            </AppField>

            <AppField label="Initial Balance">
              <div className="relative">
                <input
                  id="initialBalance"
                  type="number"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </AppField>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center py-4">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Summary</h3>
            <div className="rounded-md border border-border bg-muted/20 p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency:</span>
                <span className="font-semibold text-foreground">{currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Primary Wallet:</span>
                <span className="font-semibold text-foreground">
                  {walletName} ({walletType})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Opening Balance:</span>
                <span className="font-semibold text-foreground">
                  {currency} {Number(initialBalance).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <AppButton tone="secondary" onClick={handleBack} disabled={step === 1 || isSubmitting}>
            <ArrowLeft className="size-4 mr-1" />
            Back
          </AppButton>

          <AppButton onClick={handleNext} loading={isSubmitting}>
            {step === 3 ? 'Go to Dashboard' : 'Continue'}
            {step < 3 && <ArrowRight className="size-4 ml-1" />}
          </AppButton>
        </div>
      </AppCard>
    </div>
  );
}
