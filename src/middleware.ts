import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const isAuthRoute = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/sign-up";
  if (isAuthRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL))
    }
  }

  const { searchParams, pathname } = new URL(request.url)

  if (!searchParams.has('docId') && pathname === '/') {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { newestDocumentId } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-doc?userId=${user.id}`).then(res => res.json())

      if (newestDocumentId) {
        return NextResponse.redirect(new URL(`/?docId=${newestDocumentId}`, request.url))
      } else {
        const { docId } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-new-doc?userId=${user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => res.json())
        return NextResponse.redirect(new URL(`/?docId=${docId}`, request.url))
      }
    }

  }


  return supabaseResponse
}