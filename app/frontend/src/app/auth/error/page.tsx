'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Há um problema com a configuração do servidor.'
      case 'AccessDenied':
        return 'Você não tem permissão para fazer login.'
      case 'Verification':
        return 'O token de verificação expirou ou já foi usado.'
      case 'CredentialsSignin':
        return 'Invalid email or password.'
      default:
        return 'Ocorreu um erro durante a autenticação.'
    }
  }

  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-destructive">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {getErrorMessage(error)}
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="/auth/signin">
                  Try Again
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  )
}

export default function AuthError() {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthErrorContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}