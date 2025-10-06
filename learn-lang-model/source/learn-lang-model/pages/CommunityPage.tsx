import React from 'react';

const posts = [
  { id: 1, author: 'Alex D.', avatar: 'https://i.pravatar.cc/40?u=1', title: 'How to fine-tune a small LM on a custom dataset?', tags: ['fine-tuning', 'dataset', 'small-lm'], comments: 12, likes: 45, time: '2h ago' },
  { id: 2, author: 'Jane P.', avatar: 'https://i.pravatar.cc/40?u=2', title: 'Best practices for prompt engineering in 2024?', tags: ['prompt-engineering', 'best-practices'], comments: 8, likes: 62, time: '5h ago' },
  { id: 3, author: 'Sam T.', avatar: 'https://i.pravatar.cc/40?u=3', title: 'Running LLMs on M2/M3 Macs: A performance comparison', tags: ['local-lm', 'mac', 'performance'], comments: 23, likes: 102, time: '1d ago' },
  { id: 4, author: 'Maria G.', avatar: 'https://i.pravatar.cc/40?u=4', title: 'Understanding the Attention mechanism with simple code', tags: ['attention', 'fundamentals', 'code'], comments: 5, likes: 78, time: '2d ago' },
  { id: 5, author: 'Kenji H.', avatar: 'https://i.pravatar.cc/40?u=5', title: 'Project Idea: Using a local LLM for smart home automation', tags: ['project', 'iot', 'local-lm'], comments: 15, likes: 91, time: '3d ago' },
];

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-slate-800 text-slate-400 text-xs font-medium px-2.5 py-1 rounded-full">
        #{children}
    </span>
);

const PostCard: React.FC<{ post: typeof posts[0] }> = ({ post }) => (
    <div className="bg-slate-900 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all duration-300 flex space-x-4">
        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-slate-50 leading-tight">{post.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                        Posted by <span className="font-medium text-slate-300">{post.author}</span> &bull; {post.time}
                    </p>
                </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5 hover:text-slate-200 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {post.comments}
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-slate-200 cursor-pointer">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        {post.likes}
                    </span>
                </div>
            </div>
        </div>
    </div>
);


export default function CommunityPage() {
    return (
        <div className="py-12">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-slate-50">Community Forum</h2>
                <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
                    Ask questions, share your projects, and connect with fellow LLM enthusiasts.
                </p>
            </div>

            <div className="mt-10 flex justify-between items-center">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search topics..."
                        className="flex h-10 w-full md:w-80 rounded-md border border-slate-800 bg-transparent px-3 py-2 text-sm ring-offset-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 pl-10"
                    />
                     <svg className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 bg-slate-50 text-slate-900 hover:bg-slate-50/90 h-10 px-5 py-2">
                    New Post
                </button>
            </div>

            <div className="mt-8 space-y-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}