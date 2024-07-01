import * as Page from './page';

const AppRoutes = [
    {
        path: '/login',
        Component: Page?.LoginPage,
        defaultLayout: true,
    },
    {
        path: '/',
        Component: Page?.DashboardPage,
        defaultLayout: true,
    },
    {
        path: '/editor/:editorId',
        Component: Page?.EditorPage,
        defaultLayout: false,
    },
    {
        path: '/mainpage',
        Component: Page?.MainPage,
        defaultLayout: true,
    },
];

export default AppRoutes;