import { NextRequest, NextResponse } from 'next/server';

const restrict = [
  '/',
  '/data/overview',
  '/data/update-data',
  '/stationary-combustion',
  '/mobile-combustion',
  '/fugitive-combustion',
  '/purchased-electricity',
  '/use-of-sold-products',
  '/end-of-life-treatment',
  '/upstream-leased-assets',
  '/downstream-leased-assetst',
  '/capital-goods',
  '/fuel-energy-related',
  '/upstream-transportation',
  '/downstream-transportation',
  '/business-travel',
  '/employee-commute',
  '/waste-generated',
  '/analytics-overview',
  '/roles',
  '/roles/add',
  '/users',
  '/users/add',
];

export default function middleware(req: NextRequest) {
  const { pathname, href } = req.nextUrl;

  const token = req.cookies.get('accessToken') || '';

  if (!token && restrict.includes(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  // If logged in, redirect from base and login to dashboard
  if (token && (pathname.includes('/signin'))) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
