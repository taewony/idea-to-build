import CommunityPostCard from '@/components/ui/CommunityPostCard';
import { COMMUNITY_POSTS } from '@/lib/constants';

export default function CommunityPage() {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-text-dark">커뮤니티</h1>
          <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">자유롭게 목표를 공유하고 서로에게 동기를 부여하세요.</p>
        </div>
        <div className="space-y-6">
          {COMMUNITY_POSTS.map(post => (
            <CommunityPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
