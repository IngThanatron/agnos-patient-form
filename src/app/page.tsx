import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-clinical-muted mb-4">
            <span className="w-4 h-px bg-clinical-border" />
            Agnos Health
            <span className="w-4 h-px bg-clinical-border" />
          </div>
          <h1 className="font-display text-3xl text-clinical-text mb-2">
            Patient Registration
          </h1>
          <p className="text-sm text-clinical-muted leading-relaxed">
            Real-time form with live staff monitoring
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          <Link
            href="/patient"
            className="block group bg-white border border-clinical-border rounded-xl p-5 hover:border-clinical-blue hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-clinical-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-clinical-text">
                    Patient Form
                  </p>
                  <p className="text-[11px] text-clinical-muted">
                    Enter your personal details
                  </p>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-clinical-muted group-hover:text-clinical-blue transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>

          <Link
            href="/staff"
            className="block group bg-white border border-clinical-border rounded-xl p-5 hover:border-clinical-green hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-clinical-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-clinical-text">
                    Staff View
                  </p>
                  <p className="text-[11px] text-clinical-muted">
                    Monitor submissions in real-time
                  </p>
                </div>
              </div>
              <svg
                className="w-4 h-4 text-clinical-muted group-hover:text-clinical-green transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </div>

        <p className="text-center text-[11px] text-clinical-muted mt-8">
          Open both views side-by-side to see real-time sync in action
        </p>
      </div>
    </main>
  );
}
