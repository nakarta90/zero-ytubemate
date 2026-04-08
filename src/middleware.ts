import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|zh|de|ja|hi|fr|it|pt|ru|es|ko|id|nl|tr|ar|pl|sv|no|da|fi)/:path*']
};
