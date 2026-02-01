import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas públicas (no requieren login)
const publicRoutes = ["/", "/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si es una ruta pública, permitir acceso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Verificar si existe la cookie "auth_token" con un token válido
  // Esta cookie contiene solo el token, ej: "token-123"
  const tokenCookie = request.cookies.get("auth_token")
  const hasToken = tokenCookie?.value?.startsWith("token-") ?? false
  
  // Debug - esto se ve en la terminal del servidor
  console.log(`[Middleware] ${pathname} - Cookie: ${tokenCookie?.value} - hasToken: ${hasToken}`)

  // Si no hay token, redirigir a login
  if (!hasToken) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Si hay token, permitir acceso
  return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    // Ejecutar en todas las rutas excepto archivos estáticos
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\..*).*)"]
}
