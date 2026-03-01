'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Sidebar from '../../../../../components/Application/Author/sidebar';
import Header from '../../../../../components/Application/Author/header';

// Mock author email — replace with real auth data later
const AUTHOR_EMAIL = 'arjun.mehta@bookmaza.com';

// ── Step 1: Password Form ─────────────────────────────────────────────────────
function PasswordStep({ onSubmit }) {
  const [form, setForm]           = useState({ newPassword: '', confirmPassword: '' });
  const [showNew, setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.newPassword) errs.newPassword = 'New password is required.';
    else if (form.newPassword.length < 8) errs.newPassword = 'Password must be at least 8 characters.';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password.';
    else if (form.newPassword !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    // Simulate sending OTP email
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    onSubmit(form.newPassword);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8 max-w-3xl">

      {/* New Password */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-6">
        <label className="sm:w-52 sm:pt-2.5 text-sm font-semibold text-gray-800 shrink-0">
          New Password <span className="text-gray-500">(*)</span>
        </label>
        <div className="flex-1">
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition [&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden
                ${errors.newPassword
                  ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'}`}
            />
            <button type="button" onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.newPassword && <p className="mt-1.5 text-xs text-red-500">{errors.newPassword}</p>}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-8">
        <label className="sm:w-52 sm:pt-2.5 text-sm font-semibold text-gray-800 shrink-0">
          Confirm Password <span className="text-gray-500">(*)</span>
        </label>
        <div className="flex-1">
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition [&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden
                ${errors.confirmPassword
                  ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'}`}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="min-w-[120px] flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all shadow-sm"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP…</>
          ) : 'Save'}
        </button>
      </div>
    </div>
  );
}

// ── Step 2: OTP Verification ──────────────────────────────────────────────────
const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;
const MOCK_OTP = '123456'; // remove when backend is ready

function OtpStep({ email, onVerified, onBack }) {
  const [otp, setOtp]           = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [resending, setResending]     = useState(false);
  const inputsRef = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    setError('');
    if (val && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...otp];
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) { setError('Please enter all 6 digits.'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);

    // TODO: replace with real API check
    if (code !== MOCK_OTP) { setError('Invalid OTP. Please try again.'); return; }
    onVerified();
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise(r => setTimeout(r, 1200));
    setResending(false);
    setResendTimer(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    inputsRef.current[0]?.focus();
  };

  // Mask email: arjun****@bookmaza.com
  const maskedEmail = email.replace(/(.{2})(.+?)(@)/, (_, a, b, c) => a + '****' + c);

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 flex flex-col items-center text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
          <Mail className="w-8 h-8 text-emerald-600" />
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-1">Check your email</h3>
        <p className="text-sm text-gray-400 mb-1">We sent a 6-digit verification code to</p>
        <p className="text-sm font-semibold text-gray-700 mb-6">{maskedEmail}</p>

        {/* OTP boxes */}
        <div className="flex gap-3 mb-3" onPaste={handlePaste}>
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => inputsRef.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleInput(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              className={`w-11 h-12 text-center text-lg font-extrabold rounded-xl border-2 outline-none transition-all
                ${error
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : digit
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-gray-50 text-gray-900 focus:border-emerald-400 focus:bg-white'
                }`}
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        {/* Hint for mock */}
        <p className="text-xs text-gray-300 mb-5">Use <span className="font-mono font-bold">123456</span> for testing</p>

        {/* Verify button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all shadow-sm mb-4"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</> : 'Verify & Change Password'}
        </button>

        {/* Resend */}
        <div className="text-xs text-gray-400">
          Didn't receive it?{' '}
          {resendTimer > 0 ? (
            <span className="text-gray-500 font-semibold">Resend in {resendTimer}s</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-emerald-600 font-semibold hover:underline disabled:opacity-60"
            >
              {resending ? 'Sending…' : 'Resend OTP'}
            </button>
          )}
        </div>

        {/* Back */}
        <button onClick={onBack} className="mt-5 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to password
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Success ───────────────────────────────────────────────────────────
function SuccessStep({ onDone }) {
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-12 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
          <CheckCircle className="w-9 h-9 text-emerald-600" />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Password Changed!</h3>
        <p className="text-sm text-gray-400 mb-8">Your password has been updated successfully.</p>
        <button
          onClick={onDone}
          className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ChangePasswordPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // step: 'password' | 'otp' | 'success'
  const [step, setStep] = useState('password');

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar isSidebarOpen={isSidebarOpen} onLogout={() => router.push('/login')} />

      <main className="flex-1 overflow-auto">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Change Password"
        />

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Change Password</h2>
            <hr className="mt-3 border-gray-200" />
          </div>

          {step === 'password' && (
            <PasswordStep onSubmit={() => setStep('otp')} />
          )}

          {step === 'otp' && (
            <OtpStep
              email={AUTHOR_EMAIL}
              onVerified={() => setStep('success')}
              onBack={() => setStep('password')}
            />
          )}

          {step === 'success' && (
            <SuccessStep onDone={() => router.push('/author/dashboard')} />
          )}
        </div>
      </main>
    </div>
  );
}