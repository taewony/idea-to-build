'use client'

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

interface Article {
  title: string;
  path: string;
}

const articles: Article[] = [
  {
    title: '0. Introduction: Running Your Own Small Language Model',
    path: '/learning-materials/local-llm/0-introduction.md',
  },
  // Add more articles here as they are created
];

const ArticleRenderer: React.FC<{ article: Article }> = ({ article }) => {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(article.path)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(text => {
        setMarkdown(text);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch markdown:", error);
        setMarkdown('Failed to load content.');
        setIsLoading(false);
      });
  }, [article.path]);

  const parsedContent = marked.parse(markdown);

  return (
    <article className="bg-slate-900 rounded-2xl p-8 border border-slate-800 min-h-[200px]">
      <h2 className="text-2xl font-bold text-slate-50 border-b border-slate-800 pb-4 mb-4">{article.title}</h2>
      {isLoading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <div
          className="prose prose-invert max-w-none text-slate-300
                     prose-headings:text-slate-100
                     prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                     prose-p:leading-relaxed
                     prose-a:text-sky-400 hover:prose-a:text-sky-300
                     prose-code:bg-slate-800 prose-code:text-amber-400 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm
                     prose-pre:bg-gradient-to-br prose-pre:from-slate-800 prose-pre:to-slate-900 prose-pre:border prose-pre:border-slate-700
                     prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:font-mono prose-pre:text-sm
                     prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:bg-slate-800/50 prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-sky-200 prose-blockquote:rounded-r-lg
                     prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-sky-400
                     prose-ol:list-decimal prose-ol:pl-6 prose-li:pl-1"
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      )}
    </article>
  );
};

export default function LocalLlmPage() {
  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-50">Running a Local LLM</h1>
        <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
          Learn to install and run a small language model on your own machine.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {articles.map(article => (
          <ArticleRenderer key={article.title} article={article} />
        ))}
      </div>
    </div>
  );
}
