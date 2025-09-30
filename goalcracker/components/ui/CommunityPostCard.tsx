'use client';

import { CommunityPost } from '@/lib/types';

interface CommunityPostCardProps {
  post: CommunityPost;
}

const CommunityPostCard: React.FC<CommunityPostCardProps> = ({ post }) => {
  const typeColorMap = {
    '질문': 'bg-blue-500',
    '요청': 'bg-green-500',
    '일반': 'bg-gray-500',
  };

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-wood p-6">
      <div className="flex items-start">
        <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full mr-4"/>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold">{post.author}</span>
              <span className="text-xs text-text-light/70 dark:text-text-dark/70">{post.timestamp}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${typeColorMap[post.type]}`}>{post.type}</span>
          </div>
          <h3 className="text-lg font-bold mt-1">{post.title}</h3>
          <p className="mt-2 text-sm text-text-light/90 dark:text-text-dark/90">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;
