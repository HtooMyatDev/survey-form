import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Survey from './pages/Survey'
import Success from './pages/Success'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute, AuthenticatedRoute } from './components/PrivateRoute'
import Responses from './pages/Responses'
import ResponseDetail from './pages/ResponseDetail'
import Questions from './pages/Questions'
import ViewSubmission from './pages/ViewSubmission'
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <div data-theme="hellokitty">
            <Routes>
                <Route path='/' element={
                    <AuthenticatedRoute>
                        <Login />
                    </AuthenticatedRoute>
                } />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>

                    }
                />
                <Route path='/survey' element={<Survey />} />
                <Route path='/success' element={<Success />} />
                <Route path='/list' element={
                    <ProtectedRoute>
                        <Responses />
                    </ProtectedRoute>
                } />
                <Route path='/details/:id' element={
                    <ProtectedRoute>
                        <ResponseDetail />
                    </ProtectedRoute>
                } />
                <Route path='/questions' element={
                    <ProtectedRoute>
                        <Questions />
                    </ProtectedRoute>
                } />
                <Route path='/view-submission/:id' element={<ViewSubmission />} />
                {/* 404 Not Found Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
