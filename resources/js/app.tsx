import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from './api/queryClient';
import { Layout } from './layouts/layout';

type PageWithLayout = {
    default: { layout: (page: ReactNode) => ReactNode };
};

createInertiaApp({
    title: () => 'SWStarter',
    resolve: async (name) => {
        const page = (await resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'))) as PageWithLayout;
        page.default.layout = (page) => <Layout children={page} />;
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
            </QueryClientProvider>,
        );
    },
    progress: {
        color: '#009999',
    },
    remember: true,
});
