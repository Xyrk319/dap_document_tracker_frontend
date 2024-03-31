import { Navigate } from 'react-router-dom';
import NavbarComponent from '../../components/navbar';
import SidebarComponent from '../../components/sidebar';

const AuthenticatedLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <header className="w-full">
                <NavbarComponent />
            </header>
            <div className="flex flex-1 overflow-hidden">
                <aside className="w-64 h-full overflow-y-auto bg-gray-800 text-white">
                    <SidebarComponent />
                </aside>
                <main className="flex-1 overflow-y-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthenticatedLayout;