// app/style-guide/page.tsx
import React from 'react';

const StyleGuidePage = () => {
  const colors = [
    { name: 'Primary', var: 'var(--color-primary)', hex: '#4A90E2' },
    { name: 'Secondary', var: 'var(--color-secondary)', hex: '#F5F5F5' },
    { name: 'Accent', var: 'var(--color-accent)', hex: '#FF6B6B' },
    { name: 'Background', var: 'var(--color-background)', hex: '#FFFFFF' },
    { name: 'Text Default', var: 'var(--color-text-default)', hex: '#333333' },
    { name: 'Text Secondary', var: 'var(--color-text-secondary)', hex: '#666666' },
  ];

  const typography = [
    { name: 'Heading 1', className: 'text-h1', details: 'Font: Heading, Size: 3em, Weight: 700' },
    { name: 'Heading 2', className: 'text-h2', details: 'Font: Heading, Size: 2em, Weight: 700' },
    { name: 'Heading 3', className: 'text-h3', details: 'Font: Heading, Size: 1.5em, Weight: 700' },
    { name: 'Body', className: 'text-body', details: 'Font: Body, Size: 1em, Weight: 400' },
  ];

  const spacing = [
    { name: 'Small', size: '8px', className: 'w-[var(--spacing-small)]' },
    { name: 'Medium', size: '16px', className: 'w-[var(--spacing-medium)]' },
    { name: 'Large', size: '32px', className: 'w-[var(--spacing-large)]' },
    { name: 'X-Large', size: '64px', className: 'w-[var(--spacing-x-large)]' },
  ];

  const radii = [
    { name: 'Small', size: '4px', className: 'rounded-[var(--border-radius-small)]' },
    { name: 'Medium', size: '8px', className: 'rounded-[var(--border-radius-medium)]' },
  ];

  return (
    <div className="p-10 font-sans">
      <h1 className="text-h1 mb-8">Style Guide</h1>

      {/* Colors Section */}
      <section className="mb-12">
        <h2 className="text-h2 mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-md mb-2 border"
                style={{ backgroundColor: color.var }}
              ></div>
              <div className="font-bold">{color.name}</div>
              <div className="text-sm text-gray-500">{color.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-12">
        <h2 className="text-h2 mb-4">Typography</h2>
        <div className="space-y-6">
          {typography.map((type) => (
            <div key={type.name}>
              <p className="text-sm text-gray-500">{type.name} - {type.details}</p>
              <p className={type.className}>Aa Bb Cc Dd Ee Ff Gg</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing Section */}
      <section className="mb-12">
        <h2 className="text-h2 mb-4">Spacing</h2>
        <div className="space-y-4">
          {spacing.map((space) => (
            <div key={space.name} className="flex items-center">
              <div className="w-24 font-medium">{space.name} ({space.size})</div>
              <div className={`${space.className} h-8 bg-blue-200`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius Section */}
      <section>
        <h2 className="text-h2 mb-4">Border Radius</h2>
        <div className="flex space-x-4">
          {radii.map((radius) => (
            <div key={radius.name} className="flex flex-col items-center">
              <div
                className={`w-24 h-24 bg-gray-200 ${radius.className}`}
              ></div>
              <div className="mt-2 font-medium">{radius.name} ({radius.size})</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StyleGuidePage;
