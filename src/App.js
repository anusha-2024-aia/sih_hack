import React from 'react'; // Only need React
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import CapturePage from './pages/CapturePage';
import PreprocessingPage from './pages/PreprocessingPage';
import OcrTextPage from './pages/OcrTextPage';
import CompliancePage from './pages/CompliancePage';
import TrainingPage from './pages/TrainingPage';
import PipelinePage from './pages/PipelinePage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import './App.css'; // Global application styles
// FIX: Import AppProvider for wrapping, keep AppContext for access outside the provider
import { AppProvider, AppContext } from './AppContext'; 
import Notification from './components/Notification'; // Notification component


function App() {
    // ------------------------------------------------------------------
    // REMOVED ALL STATE & FUNCTIONS (uploadedImage, showNotification, etc.)
    // They are now in AppContext.js
    // ------------------------------------------------------------------
    
    // We still need to access the notification state, which is now in context.
    // However, since Notification is outside the <AppProvider> *in this structure*,
    // we need to access it outside. A common pattern is to make App a functional 
    // component that just uses the AppProvider. 
    
    // NOTE: We need to access the context's notification state outside the provider.
    // The cleanest solution is usually to move the <Notification> component 
    // inside the <AppProvider> in App.js and use the hook, OR create a wrapper.
    // Since you used <AppContext.Provider> with a value prop before, 
    // the value is NOW provided by <AppProvider>. We need a way to get the state.
    
    // TEMPORARY FIX: A simple wrapper to display the Notification outside the context.
    // The most correct fix is usually to define the Notification component inside the router
    // so it can access the context via useAppContext().
    
    // Let's refactor App.js to use the <AppProvider> wrapper and move the notification access 
    // inside the area where context is available.
    
    return (
        <Router>
            {/* FIX: Use AppProvider to wrap the content. 
              The 'value' prop is now defined INSIDE AppProvider in AppContext.js.
            */}
            <AppProvider> 
                <Header />
                <div className="container">
                    {/* Navigation */}
                    <nav className="nav-pills">
                        <NavLink to="/" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Welcome</NavLink>
                        <NavLink to="/upload" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Upload</NavLink>
                        <NavLink to="/preprocessing" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Preprocessing</NavLink>
                        <NavLink to="/ocr" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>OCR</NavLink>
                        <NavLink to="/compliance" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Compliance</NavLink>
                        <NavLink to="/training" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Training</NavLink>
                        <NavLink to="/pipeline" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Pipeline</NavLink>
                        <NavLink to="/history" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>History</NavLink>
                        <NavLink to="/settings" className={({ isActive }) => "nav-pill" + (isActive ? " active" : "")}>Settings</NavLink>
                    </nav>

                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/upload" element={<CapturePage />} />
                        <Route path="/preprocessing" element={<PreprocessingPage />} />
                        <Route path="/ocr" element={<OcrTextPage />} />
                        <Route path="/compliance" element={<CompliancePage />} />
                        <Route path="/training" element={<TrainingPage />} />
                        <Route path="/pipeline" element={<PipelinePage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </div>
                {/* The Notification component needs access to the 'notification' state.
                  Since it's inside the AppProvider, it can now use useAppContext().
                  If your Notification component already uses the context, this is fine.
                  If it was relying on props, you may need to update it.
                */}
                <NotificationWrapper />
            </AppProvider>
        </Router>
    );
}

// Create a wrapper component to access context for the Notification display
// and ensure it's rendered within the <AppProvider>
const NotificationWrapper = () => {
    // You need to update your AppContext.js to export useAppContext() and use this hook.
    // Since we updated AppContext.js, we can use the original pattern to access it
    const { notification } = React.useContext(AppContext);

    if (!notification) return null;

    return (
        <Notification message={notification.message} type={notification.type} />
    );
};


export default App;