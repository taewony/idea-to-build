'use client';

import React from 'react';

export default function StyleGuide() {
  const tokens = {
    "colors": {
      "primary": {
        "DEFAULT": "#8B4513"
      },
      "accent": {
        "DEFAULT": "#D2691E"
      },
      "background": {
        "light": "#F5DEB3",
        "dark": "#6B4226"
      },
      "text": {
        "light": "#4A2C2A",
        "dark": "#F5F5DC"
      },
      "card": {
        "light": "#DEB887",
        "dark": "#A0522D"
      },
      "neutral": {
        "background": "#EDE3DA"
      }
    },
    "typography": {
      "display": {
        "fontFamily": "var(--font-inter), sans-serif"
      },
      "handwriting": {
        "fontFamily": "var(--font-handwriting), cursive"
      }
    },
    "spacing": {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem"
    },
    "radii": {
      "default": "0.5rem",
      "lg": "1rem",
      "xl": "1.5rem",
      "full": "9999px"
    },
    "shadows": {
      "wood": "0 4px 6px -1px rgba(74, 44, 42, 0.4), 0 2px 4px -2px rgba(74, 44, 42, 0.3)",
      "wood-lg": "0 10px 15px -3px rgba(74, 44, 42, 0.4), 0 4px 6px -4px rgba(74, 44, 42, 0.3)",
      "card": "0 3px 12px rgba(0,0,0,0.12)"
    }
  };

  const generateColorSwatches = () => 
    Object.entries(tokens.colors).flatMap(([category, values]) => 
      Object.entries(values).map(([key, value]) => {
        const name = key === 'DEFAULT' ? category : `${category}-${key}`;
        return (
          <div key={name} className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div className="w-20 h-20 rounded-lg border border-gray-200 mb-2" style={{ backgroundColor: value }}></div>
            <span className="text-sm text-center font-medium text-gray-800">{name}</span>
            <code className="text-xs mt-1 text-gray-500">{value}</code>
          </div>
        );
      })
    );

  const generateTypography = () => 
    Object.entries(tokens.typography).map(([type, styles]) => {
      const sampleText = 'Typography Example: Design System and Component Guide';
      return (
        <div key={type} className="border-l-4 border-gray-200 pl-4 py-2 mb-6">
            <p style={styles} className="text-lg">{sampleText}</p>
            <div className="text-sm mt-2 text-gray-500">
                <code className="text-xs bg-gray-100 p-1 rounded">font-{type}</code>
            </div>
        </div>
      );
    });

  const generateSpacings = () => 
    Object.entries(tokens.spacing).map(([size, value]) => (
      <div key={size} className="flex items-center bg-white p-2 rounded-md">
          <div className="bg-blue-300 h-6 rounded" style={{ width: value }}></div>
          <span className="text-sm ml-4 font-medium text-gray-800">spacing-{size} <span className="text-gray-500">({value})</span></span>
      </div>
    ));

  const generateRadii = () => 
    Object.entries(tokens.radii).map(([size, value]) => (
      <div key={size} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="w-20 h-20 bg-blue-400 flex items-center justify-center" style={{ borderRadius: value }}>
              <span className="text-white text-sm font-medium">rounded-{size}</span>
          </div>
          <code className="text-xs mt-2 text-gray-500">{value}</code>
      </div>
    ));

  const generateShadows = () => 
    Object.entries(tokens.shadows).map(([type, value]) => (
      <div key={type} className="bg-white p-4 rounded-lg w-full">
          <div className="w-full h-24 bg-gray-50 rounded-lg flex items-center justify-center" style={{ boxShadow: value }}>
              <span className="text-sm font-medium text-gray-800">shadow-{type}</span>
          </div>
          <div className="mt-3">
              <code className="text-xs bg-gray-100 p-2 rounded block text-gray-600">{value}</code>
          </div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <header className="text-center py-8 mb-8 border-b">
          <h1 className="text-4xl font-bold">Design System Style Guide</h1>
          <p className="text-lg text-gray-600 mt-2">
            Generated from <code>tokens.json</code> for the 'goalcracker' project.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {generateColorSwatches()}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Typography</h2>
          <div className="space-y-8">
            {generateTypography()}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Spacing</h2>
          <div className="space-y-4 max-w-sm">
            {generateSpacings()}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Border Radius</h2>
          <div className="flex flex-wrap gap-6 items-end">
            {generateRadii()}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {generateShadows()}
          </div>
        </section>

      </div>
    </div>
  );
}
