import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const userToken = req.cookies.get('auth_token')?.value;

    if (isAdminRoute && !userToken) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next();
}