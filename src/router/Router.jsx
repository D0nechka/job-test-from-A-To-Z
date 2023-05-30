import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export const Router = () => {
    return (
        <Routes>
            {routes.map(({Element, path}) => (
                <Route element={<Element />} path={path} key={path} />
            ))}
        </Routes>
    );
};