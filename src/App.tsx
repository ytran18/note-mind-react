import { Fragment } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import DefaultLayout from '@components/Layout/DefaultLayout';
import ProtectedRoute from '@lib/ProtectedRoute';
import NotFoundPage from '@components/Layout/NotFoundPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {
                    AppRoutes.map((item, index) => {
                        const Layout = item.defaultLayout ? DefaultLayout : Fragment;
                        const Page = item.Component;
                        return (
                            <Route
                                key={`route-${index}`}
                                path={item.path}
                                element={
                                    <Layout>
                                        {item.isProtected ? (
                                            <ProtectedRoute>
                                                <Page />
                                            </ProtectedRoute>
                                        ) : (
                                            <Page />
                                        )}
                                    </Layout>
                                }
                            />
                        )
                    })
                }
                <Route
                    path='*'
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
