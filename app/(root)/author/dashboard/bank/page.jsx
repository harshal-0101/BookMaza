'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import Sidebar from '../../../../../components/Application/Author/sidebar';
import Header from '../../../../../components/Application/Author/header';

const EMPTY_FORM = {
  bankName: '',
  holderName: '',
  accountNumber: '',
  reAccountNumber: '',
  ifsc: '',
};

function Field({ name, label, placeholder, form, errors, handleChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full px-4 py-2 rounded-md border text-sm outline-none transition ${
          errors[name]
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500'
        }`}
      />

      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );
}

export default function BankDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [banks, setBanks] = useState([]);

  const router = useRouter();

  const validate = () => {
    const e = {};

    if (!form.bankName.trim()) e.bankName = 'Bank name required';
    if (!form.holderName.trim()) e.holderName = 'Holder name required';
    if (!/^\d{9,18}$/.test(form.accountNumber))
      e.accountNumber = '9–18 digit number required';
    if (form.accountNumber !== form.reAccountNumber)
      e.reAccountNumber = 'Account numbers must match';
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.toUpperCase()))
      e.ifsc = 'Invalid IFSC format';

    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    setBanks(prev => [
      ...prev,
      { id: Date.now(), ...form, ifsc: form.ifsc.toUpperCase() }
    ]);

    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const mask = (num) =>
    '•'.repeat(num.length - 4) + num.slice(-4);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        authorName="Author Name"
        authorEmail="author@bookmaza.com"
        totalRoyalties={0}
        onLogout={() => router.push('/login')}
      />

      <main className="flex-1">

        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Bank Details"
        />

        {/* Page Content */}
        <div className="max-w-4xl mx-auto px-6 py-10">

          {/* Top Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Linked Bank Accounts
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Add and manage your payout accounts
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow transition"
            >
              {showForm ? "Close Form" : "Add Bank Detail"}
            </button>
          </div>

          {/* Inline Form */}
          {showForm && (
            <div className="bg-white rounded-xl shadow p-6 mb-8 border">
              <h3 className="text-lg font-semibold mb-6">
                Add Bank Account
              </h3>

              <div className="space-y-4">
                <Field
                  name="bankName"
                  label="Bank Name"
                  placeholder="e.g. State Bank of India"
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                />

                <Field
                  name="holderName"
                  label="Account Holder Name"
                  placeholder="Full name"
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                />

                <Field
                  name="accountNumber"
                  label="Account Number"
                  placeholder="9–18 digits"
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                />

                <Field
                  name="reAccountNumber"
                  label="Confirm Account Number"
                  placeholder="Re-enter number"
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                />

                <Field
                  name="ifsc"
                  label="IFSC Code"
                  placeholder="SBIN0001234"
                  form={form}
                  errors={errors}
                  handleChange={handleChange}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Bank List */}
          {banks.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
              No bank accounts added yet
            </div>
          ) : (
            <div className="space-y-4">
              {banks.map(bank => (
                <div
                  key={bank.id}
                  className="bg-white rounded-xl border shadow-sm p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {bank.bankName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {bank.holderName}
                    </p>
                    <p className="text-sm font-mono text-gray-600 mt-1">
                      {mask(bank.accountNumber)} | {bank.ifsc}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setBanks(prev =>
                        prev.filter(b => b.id !== bank.id)
                      )
                    }
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}