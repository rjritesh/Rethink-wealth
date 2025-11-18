'use client';
import Image from "next/image";
import { STEPS, useLoginFlow } from "@/hooks/useLoginFlow";

export default function Login() {
  const {
    step,
    form,
    loading,
    error,
    handleChange,
    sendOTP,
    verifyOTP,
    submitProfile,
  } = useLoginFlow();
  return (
    <div className="min-h-screen bg-[#121423] flex items-center justify-center px-5">
      <div className="bg-slate-700/30 p-8 rounded-2xl shadow-md w-full max-w-xl min-h-[400px] md:min-h-[500px] text-center flex flex-col items-center justify-center relative">
        {step === STEPS.PHONE && (
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl text-center font-semibold text-white mb-14 md:leading-11">
              Be part of the next generation of asset class investors
            </h2>
            <form onSubmit={sendOTP} className="flex flex-col items-center">
              <div className="relative mb-5 md:mb-10 w-full">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  pattern="^(\+91|91)?[6-9]\d{9}$"
                  minLength={10}
                  maxLength={14}
                  title="Please enter a valid 10-digit Indian phone number"
                  required
                  className="md:max-w-[80%] lg:max-w-[70%] w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="phone"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="rethink-secondary-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Get Access"}
              </button>
            </form>
          </div>
        )}

        {step === STEPS.OTP && (
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl text-center font-semibold text-white mb-14 md:leading-11">
              Verification code sent to {form.phone}
            </h2>
            <form onSubmit={verifyOTP} className="flex flex-col items-center">
              <div className="relative mb-5 md:mb-10 w-full">
                <input
                  type="text"
                  inputMode="numeric"
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={form.otp}
                  className="md:max-w-[80%] lg:max-w-[70%] w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-transparent"
                  name="otp"
                  pattern="\d{6}"
                  minLength={6}
                  maxLength={6}
                  required
                  title="Please enter exactly 6 digits"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="rethink-secondary-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </div>
        )}

        {step === STEPS.PROFILE && (
          <div className="w-full">
            <h2 className="text-[22px] text-center font-semibold text-white mb-4">
              Hi, Welcome!
              <Image
                src={'/images/profile_screen_hi_icon.webp'}
                width={30}
                height={30}
                alt="Hi!"
                className="inline-block ms-2"
              />
            </h2>
            <p className="text-white text-[18px] mb-8 font-medium">
              Please enter your details
            </p>
            <form onSubmit={submitProfile} className="flex flex-col items-center">
              <div className="relative md:mb-4 w-full">
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={form.name}
                  className="md:max-w-[80%] lg:max-w-[70%] w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-transparent placeholder:text-sm"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative md:mb-4 w-full">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={form.email}
                  className="md:max-w-[80%] lg:max-w-[70%] w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-transparent placeholder:text-sm"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative mb-4 w-full">
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={form.city}
                  className="md:max-w-[80%] lg:max-w-[70%] w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-transparent placeholder:text-sm"
                  name="city"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="rethink-secondary-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Saving..." : "Complete Registration"}
              </button>
            </form>
          </div>
        )}

        <p className="text-red-500 text-[12px] mt-8 h-4">{error}</p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  )
}
