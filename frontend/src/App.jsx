import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { EnrollmentProvider } from './context/EnrollmentContext';
import { ProgressProvider } from './context/ProgressContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotesProvider } from './context/NotesContext';
import { PlayerProvider } from './context/PlayerContext';
import { LearningProvider } from './context/LearningContext';
import { TimerProvider } from './context/TimerContext';

import AppRouter from './routes/AppRouter';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TimerProvider>
            <CartProvider>
              <EnrollmentProvider>
                <ProgressProvider>
                  <WishlistProvider>
                    <NotesProvider>
                      <PlayerProvider>
                        <LearningProvider>
                          <AppRouter /> {/* Just AppRouter - no Header/Footer here */}
                        </LearningProvider>
                      </PlayerProvider>
                    </NotesProvider>
                  </WishlistProvider>
                </ProgressProvider>
              </EnrollmentProvider>
            </CartProvider>
          </TimerProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}



export default App;