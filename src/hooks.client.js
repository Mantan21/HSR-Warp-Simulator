import { dev } from '$app/environment';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://491991121826437a991c013d90a8afc1@sink.mantan.dev/2',
	sendDefaultPii: true,
	tracesSampleRate: 1.0,
	enableLogs: true,
	environment: dev ? 'development' : 'production',
	integrations: [Sentry.httpClientIntegration(), Sentry.browserTracingIntegration()],
	denyUrls: [/pagead2\.googlesyndication\.com/, /googletagservices\.com/, /doubleclick\.net/]
});

const errorhandler = async (error) => {
	const errorId = crypto.randomUUID();
	return { ...error, errorId };
};

export const handleError = Sentry.handleErrorWithSentry(errorhandler);
