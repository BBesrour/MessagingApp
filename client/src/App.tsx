import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Root from './pages/Root';
import useDarkMode from 'use-dark-mode';
import { AuthContextProvider } from './contexts/AuthContext';
import { checkAuthLoader } from './utils/auth.service';
import Chat from './components/chat/Chat';
import { SocketContextProvider } from './contexts/SocketContext';

const RoutesJSX = (
    <>
        <Route path="/" element={<Root />} loader={checkAuthLoader}>
            <Route index element={<Chat />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
    </>
);

const routes = createRoutesFromElements(RoutesJSX);

const router = createBrowserRouter(routes);

function App() {
    const darkMode = useDarkMode();

    return (
        <NextUIProvider>
            <AuthContextProvider>
                <SocketContextProvider>
                    <main
                        className={`${
                            darkMode.value ? 'dark' : ''
                        } text-foreground bg-background`}
                    >
                        <RouterProvider router={router} />
                    </main>
                </SocketContextProvider>
            </AuthContextProvider>
        </NextUIProvider>
    );
}

export default App;
