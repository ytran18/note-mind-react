import * as Page from './page';

const AppRoutes = [
    {
        path: '/login',
        Component: Page?.LoginPage,
        defaultLayout: true,
        isProtected: false,
    },
    {
        path: '/',
        Component: Page?.DashboardPage,
        defaultLayout: true,
        isProtected: false,
    },
    {
        path: '/editor/:editorId',
        Component: Page?.EditorPage,
        defaultLayout: false,
        isProtected: true,
    },
    {
        path: '/mainpage',
        Component: Page?.MainPage,
        defaultLayout: true,
        isProtected: true,
    },
];

export default AppRoutes;