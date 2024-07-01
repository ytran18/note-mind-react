import * as Page from './page';

const AppRoutes = [
    {
        path: '/login',
        Component: Page?.LoginPage,
        defaultLayout: true,
    },
    {
        path: '/dashboard',
        Component: Page?.DashboardPage,
        defaultLayout: true,
    },
    {
        path: '/editor/:editorId',
        Component: Page?.EditorPage,
        defaultLayout: false,
    },
    {
        path: '/',
        Component: Page?.MainPage,
        defaultLayout: true,
    },
];

export default AppRoutes;