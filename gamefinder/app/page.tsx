"use client";

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { GameSearch } from './components/GameSearch';
import { LoginModal } from './components/LoginModal';
import { GameDetailPage } from './components/GameDetailPage';
import { PersonalizedPage } from './components/PersonalizedPage';
import type { Game } from './types';
import { searchGames } from './services/gameService';


const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [view, setView] = useState<'home' | 'detail' | 'personalized'>('home');

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [actionAfterLogin, setActionAfterLogin] = useState<{ type: 'wishlist' | 'viewDetails'; game: Game } | null>(null);

  // State lifted from GameSearch to persist results
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const showDetailPage = (game: Game) => {
    setSelectedGame(game);
    setView('detail');
  };

  const showHomePage = () => {
    setView('home');
    setSelectedGame(null);
  };
  
  const showPersonalizedPage = () => {
    setView('personalized');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);

    if (actionAfterLogin) {
      if (actionAfterLogin.type === 'wishlist') {
        setWishlist(prev => new Set(prev).add(actionAfterLogin.game.id));
      } else if (actionAfterLogin.type === 'viewDetails') {
        showDetailPage(actionAfterLogin.game);
      }
      setActionAfterLogin(null);
    } else {
      // If logging in from the header, show the personalized page
      showPersonalizedPage();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setWishlist(new Set()); // Clear wishlist on logout
    showHomePage(); // Go back to home page on logout
  };

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);
  
  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setActionAfterLogin(null);
  }, []);

  const handleSelectGame = useCallback((game: Game) => {
    if (isLoggedIn) {
      showDetailPage(game);
    } else {
      setActionAfterLogin({ type: 'viewDetails', game });
      setIsLoginModalOpen(true);
    }
  }, [isLoggedIn]);
  
  const handleToggleWishlist = useCallback((game: Game) => {
    if (isLoggedIn) {
      setWishlist(prev => {
        const newWishlist = new Set(prev);
        if (newWishlist.has(game.id)) {
          newWishlist.delete(game.id);
        } else {
          newWishlist.add(game.id);
        }
        return newWishlist;
      });
    } else {
      setActionAfterLogin({ type: 'wishlist', game });
      setIsLoginModalOpen(true);
    }
  }, [isLoggedIn]);

  const handleSearch = async (query: string) => {
    setIsSearchLoading(true);
    setSearchError(null);
    setHasSearched(true);
    try {
      const games = await searchGames(query);
      setSearchResults(games);
    } catch (err) {
      setSearchError('Failed to fetch game recommendations. Please try again.');
    } finally {
      setIsSearchLoading(false);
    }
  };

  const renderView = () => {
    switch(view) {
      case 'home':
        return (
          <main className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
                Find Your Next Favorite Game
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                Describe your dream game or enter keywords, and let our AI engine find the perfect match for you from our database.
              </p>
            </div>
            <GameSearch 
              onSelectGame={handleSelectGame} 
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onSearch={handleSearch}
              results={searchResults}
              isLoading={isSearchLoading}
              error={searchError}
              hasSearched={hasSearched}
            />
          </main>
        );
      case 'detail':
        return selectedGame && <GameDetailPage game={selectedGame} onBack={showHomePage} />;
      case 'personalized':
        return (
            <PersonalizedPage 
                isLoggedIn={isLoggedIn}
                onBack={showHomePage}
                onSelectGame={handleSelectGame}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
            />
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={openLoginModal}
        onLogoutClick={handleLogout}
      />
      
      {renderView()}

      <footer className="text-center py-6 border-t border-slate-800 mt-16">
        <p className="text-slate-500">Powered by GameFinder &copy; 2024</p>
      </footer>

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default HomePage;