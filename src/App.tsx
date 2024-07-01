import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {
                    AppRoutes.map((item, index) => {
                        const Page = item.Component;
                        return (
                            <Route
                                key={`route-${index}`}
                                path={item.path}
                                element={<Page />}
                            />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    );
};

export default App;
