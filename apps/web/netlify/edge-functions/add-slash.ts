/* eslint-disable */
// @ts-nocheck

import type { Context } from 'https://edge.netlify.com';

export default async function handler(request: Request, context: Context) {
  const requestUrl = new URL(request.url);
  const { pathname } = requestUrl;

  console.log('request.url', request.url);
  console.log('requestUrl new URL()', requestUrl);
  console.log('pathname', pathname);

  // Skip if we're already proxying the request
  if (request.headers.get('x-nf-subrequest')) {
    return;
  }

  // Redirect to remove the .html
  for (const suffix of ['/index.html', '.html']) {
    if (pathname.endsWith(suffix)) {
      // Replace the suffix with a slash
      return Response.redirect(`${request.url.slice(0, -suffix.length)}/`, 301);
    }
  }
  // Add a slash, unless there's a file extension
  if (!pathname.endsWith('/') && !pathname.split('/').pop()?.includes('.')) {
    return Response.redirect(`${request.url}/`, 301);
  }

  const response = await context.next({ sendConditionalRequest: true });
  console.log('response', response);
  // If origin returns a 301 we need to proxy it to avoid a redirect loop
  // TODO: check that this is just a redirect to the canonical URL, not some other kind
  if (response.status === 301) {
    const location = response.headers.get('Location');
    console.log('location', location);

    const locationUrl = new URL(location || '', request.url);
    request.headers.set('x-nf-subrequest', '1');

    if (locationUrl.host !== requestUrl.host) {
      console.log('location is an external URL');
      return Response.redirect(new URL(location || '', request.url).toString(), 301);
    }
    // Avoid infinite loops
    context.rewrite(new URL(location || '', request.url).toString());
  }
  return response;
}
