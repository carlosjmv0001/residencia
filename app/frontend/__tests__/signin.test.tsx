import { render, screen } from '@testing-library/react'
import SignIn from '../src/app/auth/signin/page'
import { SessionProvider } from 'next-auth/react'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  useSearchParams: () => ({
    get: jest.fn((param) => {
      if (param === 'callbackUrl') return '/dashboard';
      return null;
    })
  })
}));

describe('SignIn', () => {
  it('renders sign-in form', () => {
    render(
      <SessionProvider session={null}>
        <SignIn />
      </SessionProvider>
    )

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })
})
