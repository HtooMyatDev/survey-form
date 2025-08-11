import React from 'react'
import { Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SurveyPage from './pages/SurveyPage'
import SuccessPage from './pages/SuccessPage'
import DashboardPage from './pages/DashboardPage'
import { ProtectedRoute, AuthenticatedRoute } from './components/PrivateRoute'
import AllResponsesPage from './pages/AllResponsesPage'
import ResponseDetailPage from './pages/ResponseDetailPage'

const App = () => {
    return (
        <div data-theme="hellokitty">
            <Routes>
                <Route path='/' element={
                    <AuthenticatedRoute>
                        <LoginPage />
                    </AuthenticatedRoute>
                } />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>

                    }
                />
                <Route path='/survey' element={<SurveyPage />} />
                <Route path='/success' element={<SuccessPage />} />
                <Route path='/list' element={
                    <ProtectedRoute>
                        <AllResponsesPage />
                    </ProtectedRoute>
                } />
                <Route path='/details/:id' element={
                    <ProtectedRoute>
                        <ResponseDetailPage />
                    </ProtectedRoute>
                }></Route>
            </Routes>
        </div>
    )
}

export default App
