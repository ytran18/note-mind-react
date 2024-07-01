import * as Page from './page';

const AppRoutes = [
    {
        path: '/login',
        Component: Page?.LoginPage,
    },
    {
        path: '/dashboard',
        Component: Page?.DashboardPage,
    },
    {
        path: '/editor/:editorId',
        Component: Page?.EditorPage,
    },
    {
        path: '/',
        Component: Page?.MainPage,
    },
];

export default AppRoutes;