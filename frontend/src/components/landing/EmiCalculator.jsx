import { useMemo, useState } from 'react'
import { calculateEmi, formatIndianPrice } from '../../utils/indianFormat'

export default function EmiCalculator() {
  const [amount, setAmount] = useState(50) // lakhs
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const principal = amount * 100000
  const emi = useMemo(() => calculateEmi(principal, rate, tenure), [principal, rate, tenure])
  const totalPay = emi * tenure * 12
  const interest = totalPay - principal

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-lg lg:grid lg:grid-cols-2">
          <div className="bg-surface p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Home Loan EMI Calculator</h2>
            <p className="mt-2 text-muted">Plan your budget before you buy — instant results</p>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-2 flex justify-between text-sm font-medium">
                  <span>Loan amount</span>
                  <span className="text-brand">{formatIndianPrice(principal)}</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-brand"
                />
                <div className="mt-1 flex justify-between text-xs text-muted">
                  <span>₹10 L</span>
                  <span>₹2 Cr</span>
                </div>
              </div>

              <div>
                <label className="mb-2 flex justify-between text-sm font-medium">
                  <span>Interest rate</span>
                  <span className="text-brand">{rate}% p.a.</span>
                </label>
                <input
                  type="range"
                  min={6}
                  max={14}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-brand"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-sm font-medium">
                  <span>Tenure</span>
                  <span className="text-brand">{tenure} years</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-brand"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-medium text-muted uppercase tracking-wide">Your monthly EMI</p>
            <p className="mt-2 text-4xl font-bold tabular-nums text-brand sm:text-5xl">
              {formatIndianPrice(emi)}
              <span className="text-lg font-medium text-muted">/mo</span>
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-surface p-4">
                <p className="text-xs text-muted">Principal</p>
                <p className="mt-1 font-bold">{formatIndianPrice(principal)}</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-xs text-muted">Total interest</p>
                <p className="mt-1 font-bold">{formatIndianPrice(interest)}</p>
              </div>
            </div>
            <p className="mt-6 text-xs text-muted">
              *Indicative calculation. Actual EMI may vary by bank, credit score, and processing fees.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
