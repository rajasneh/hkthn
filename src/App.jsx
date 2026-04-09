import {
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  useUser,
  UserButton,
} from '@clerk/clerk-react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { useSampleTodo } from './hooks/useSampleTodo'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/sign-in/*" element={<AuthSignInPage />} />
      <Route path="/sign-up/*" element={<AuthSignUpPage />} />
      <Route path="*" element={<ProtectedApp />} />
    </Routes>
  )
}

function ProtectedApp() {
  const { user } = useUser()
  const hasGoogleAccount = user?.externalAccounts?.some(
    (account) => account.provider === 'google',
  )

  return (
    <>
      <SignedIn>
        <div className="app-shell">
          <header className="topbar">
            <h1>Hackathon Starter</h1>
            <div className="topbar-right">
              <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </nav>
              <UserButton
                userProfileProps={{
                  localization: {
                    userProfile: {
                      start: {
                        emailAddressesSection: {
                          primaryButton: 'Edit email',
                        },
                      },
                    },
                  },
                  appearance: hasGoogleAccount
                    ? undefined
                    : {
                        elements: {
                          profileSection__connectedAccounts: {
                            display: 'none',
                          },
                        },
                      },
                }}
              />
            </div>
          </header>
          <main className="page-wrap">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

function AuthSignInPage() {
  return (
    <div className="auth-page">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/"
      />
    </div>
  )
}

function AuthSignUpPage() {
  return (
    <div className="auth-page">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/"
      />
    </div>
  )
}

function HomePage() {
  const { data, isLoading, isError } = useSampleTodo()

  return (
    <section>
      <h2>Pick an idea and ship fast</h2>
      <p>Use this page as your dashboard, task board, or landing page.</p>
      {isLoading && <p>Loading sample API data...</p>}
      {isError && <p>Could not load sample data.</p>}
      {data && (
        <p>
          Example query result: <strong>{data.title}</strong>
        </p>
      )}
    </section>
  )
}

function AboutPage() {
  return (
    <section>
      <h2>About this project</h2>
      <p>Add your hackathon problem statement, target users, and features here.</p>
    </section>
  )
}

function ContactPage() {
  return (
    <section>
      <h2>Team and contact</h2>
      <p>Add your team members, roles, and demo links on this route.</p>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section>
      <h2>404 - Route not found</h2>
      <p>This page does not exist yet. Add a new route or go back to Home.</p>
    </section>
  )
}

export default App
