import { dev } from '$app/environment';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://721ca11ea8894a84a70e4f83d6ee5101@sink.wishsimulator.app/2',
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
