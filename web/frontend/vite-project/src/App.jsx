import { useState } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('login')
  const isLogin = mode === 'login'
  const formTitle = isLogin ? 'Welcome back' : 'Create account'
  const formSubtitle = isLogin
    ? 'Please enter your details to sign in.'
    : 'Start your 14-day free professional trial.'
  const submitLabel = isLogin ? 'Sign In' : 'Get Started'

  const tabBaseClasses = 'flex-1 py-sm rounded-md font-label-md text-label-md transition-all'
  const activeTabClasses = 'bg-surface-container-lowest shadow-sm text-primary'
  const inactiveTabClasses = 'text-on-surface-variant hover:text-primary'

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden">
      <nav className="sticky top-0 z-50 shadow-sm bg-surface-container-lowest transition-all">
        <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
          <div className="flex items-center gap-xl">
            <span className="text-headline-md font-headline-md font-bold text-primary">
              Asymmetry
            </span>
            <div className="hidden md:flex gap-lg">
              <a
                className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md"
                href="#"
              >
                Explore
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md"
                href="#"
              >
                Pricing
              </a>
            </div>
          </div>
          <div>
            <button className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all">
              Login
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center py-xxl px-margin-mobile glass-background">
        <div className="max-w-container-max w-full flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden auth-card-shadow min-h-[600px]">
          <div className="w-full md:w-1/2 relative flex flex-col justify-center p-xl md:p-xxl bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img
                className="w-full h-full object-cover"
                alt="Abstract 3D architectural rendering featuring clean geometric lines and deep blue gradients. The visual style is professional and minimalist, with soft shadows and high-contrast light reflections that evoke a sense of digital infrastructure and institutional trust. The composition is asymmetrical and modern, perfectly matching a high-end SaaS corporate aesthetic."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6UPCZiuluhvgquIdfCJSuzx_RAhB2OFv64LzHL5zIe-xIyPLO_qQNCiw8L0aIvgKv3Hq29ODU7cdYCU0MJ6ilIwR4CH8AtfcznrJ-EVwBtzC7aMQt0B_2Lt3FveppNJMLe8Odprg9QTHlZCCfwg1fnWPxQ9DC2kRnvymdLzeutn-c_hQ7jFOHjq7EkTFvHHS5q98wtwwzzIsQ89bCPv8cGzjJUvydI093EWb2W9diVtfoYcJTj-F2puooZWScMd6VleAcPlFENzcy"
              />
            </div>
            <div className="relative z-10">
              <h1 className="font-headline-lg text-headline-lg text-white mb-md">
                One account.
                <br />
                Endless opportunities.
              </h1>
              <p className="font-body-lg text-body-lg text-primary-fixed max-w-md">
                Join the world&apos;s leading professional analysts. Access real-time data
                insights and sophisticated tools designed for institutional-grade decision
                making.
              </p>
              <div className="mt-xl flex flex-col gap-md">
                <div className="flex items-center gap-md text-white">
                  <span className="material-symbols-outlined text-primary-fixed">
                    verified
                  </span>
                  <span className="font-label-md text-label-md">Institutional Data Feeds</span>
                </div>
                <div className="flex items-center gap-md text-white">
                  <span className="material-symbols-outlined text-primary-fixed">
                    query_stats
                  </span>
                  <span className="font-label-md text-label-md">Advanced Analytics Engine</span>
                </div>
                <div className="flex items-center gap-md text-white">
                  <span className="material-symbols-outlined text-primary-fixed">
                    security
                  </span>
                  <span className="font-label-md text-label-md">Bank-grade Security</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-xl md:p-xxl flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <div className="flex p-base bg-surface-container rounded-lg mb-xl">
                <button
                  type="button"
                  className={`${tabBaseClasses} ${isLogin ? activeTabClasses : inactiveTabClasses}`}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`${tabBaseClasses} ${isLogin ? inactiveTabClasses : activeTabClasses}`}
                  onClick={() => setMode('signup')}
                >
                  Create Account
                </button>
              </div>
              <div className="space-y-lg">
                <div className="text-center md:text-left mb-md">
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    {formTitle}
                  </h2>
                  <p className="text-on-surface-variant mt-xs">{formSubtitle}</p>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-md py-sm px-lg border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors duration-200"
                >
                  <img
                    alt="Google"
                    className="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcLdklqxj1DX0OabOQ1frLGq3cgJokkl1ghlZNg6c3xCXeg-58GoxsDe4q_QMozhqzLnB1tsbXd8CLLmq5Pu2OlhRud8wImPwxxsYFlQs9UOBWki4AKqsp9LAPwqgdLQWq1xOAZjfhZk7BFi1BtykmnXBqsipfzCoIVnmPfXI9fURUTF4Y4ujfyGjhDGyeYY7gc9PKtupI3Xa4u5kN5ocFn05Gx-oE5km1dmcNLGgMLISqPj5xulH4eS2y4Cd3kM2WQKLhzuHm8Kpk"
                  />
                  Continue with Google
                </button>
                <div className="relative flex py-md items-center">
                  <div className="flex-grow border-t border-outline-variant"></div>
                  <span className="flex-shrink mx-md text-label-sm font-label-sm text-outline uppercase tracking-wider">
                    or email
                  </span>
                  <div className="flex-grow border-t border-outline-variant"></div>
                </div>
                <form className="space-y-md" onSubmit={(event) => event.preventDefault()}>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-xs">
                      Email Address
                    </label>
                    <input
                      className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant"
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-xs">
                      Password
                    </label>
                    <input
                      className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className={isLogin ? 'hidden' : 'animate-in fade-in duration-300'}>
                    <label className="block font-label-md text-label-md text-on-surface mb-xs">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-outline-variant"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-xs">
                      <input
                        className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary"
                        id="remember"
                        type="checkbox"
                      />
                      <label
                        className="font-body-sm text-body-sm text-on-surface-variant"
                        htmlFor="remember"
                      >
                        Remember for 30 days
                      </label>
                    </div>
                    <a className="font-label-md text-label-md text-primary hover:underline" href="#">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    className="w-full bg-primary text-on-primary py-md rounded-lg font-label-md text-label-md font-bold hover:opacity-95 active:scale-[0.98] transition-all mt-md"
                    type="submit"
                  >
                    {submitLabel}
                  </button>
                </form>
                <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
                  By continuing, you agree to our{' '}
                  <a className="text-primary hover:underline" href="#">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="text-primary hover:underline" href="#">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-low border-t border-outline-variant">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg px-lg py-xxl max-w-container-max mx-auto">
          <div className="col-span-2 md:col-span-1">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface block mb-md">
              Asymmetry
            </span>
            <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant max-w-xs">
              Institutional-grade information services for professional analysts. Precision,
              clarity, and trust.
            </p>
          </div>
          <div className="flex flex-col gap-sm">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-xs">
              Product
            </span>
            <a
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200 font-body-sm text-body-sm"
              href="#"
            >
              Categories
            </a>
            <a
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200 font-body-sm text-body-sm"
              href="#"
            >
              About
            </a>
          </div>
          <div className="flex flex-col gap-sm">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-xs">
              Company
            </span>
            <a
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200 font-body-sm text-body-sm"
              href="#"
            >
              Contact
            </a>
            <a
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200 font-body-sm text-body-sm"
              href="#"
            >
              Careers
            </a>
          </div>
          <div className="flex flex-col gap-sm">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-xs">
              Legal
            </span>
            <a
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200 font-body-sm text-body-sm"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors duration-200 font-body-sm text-body-sm"
              href="#"
            >
              Privacy
            </a>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-lg py-md border-t border-outline-variant/30 text-center">
          <p className="font-label-sm text-label-sm text-outline">
            © 2024 Asymmetry Information Services. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
