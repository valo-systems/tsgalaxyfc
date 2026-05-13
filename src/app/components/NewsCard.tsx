import { useNavigate } from 'react-router';
import { Clock, ChevronRight } from 'lucide-react';
import { LOGO } from '@/lib/assets';
import type { NewsArticle } from '@/lib/news-data';

// ─── Stripe texture constant ──────────────────────────────────────────────────

const STRIPE_SM = {
  backgroundImage: 'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 60%)',
  backgroundSize: '14px 14px',
};

// ─── NewsCardImage ─────────────────────────────────────────────────────────────
// Handles both cover (action photos) and contain (score graphics) rendering.

function NewsCardImage({ article, heightCls }: { article: NewsArticle; heightCls: string }) {
  const isContain = article.imageFit === 'contain';
  const bgCls = article.imageBg === 'dark'
    ? 'bg-gray-950'
    : article.imageBg === 'light'
    ? 'bg-white'
    : '';

  if (article.image) {
    return (
      <div className={`relative ${heightCls} overflow-hidden ${isContain ? bgCls : ''}`}>
        <img
          src={article.image}
          alt={article.imageAlt ?? article.title}
          className={`absolute inset-0 w-full h-full ${isContain ? 'object-contain p-2' : 'object-cover'}`}
          style={!isContain ? { objectPosition: article.imagePosition ?? 'center' } : undefined}
        />
        {/* For cover images, add a subtle top-to-bottom gradient for text readability */}
        {!isContain && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        )}
      </div>
    );
  }

  // Fallback: branded gradient placeholder
  return (
    <div className={`relative ${heightCls} overflow-hidden bg-gradient-to-br ${article.gradient}`}>
      <div className="absolute inset-0 opacity-[0.07]" style={STRIPE_SM} aria-hidden="true" />
      <img
        src={LOGO.favicon.png64}
        alt=""
        aria-hidden="true"
        className="absolute right-3 bottom-3 w-10 h-10 opacity-[0.15] pointer-events-none select-none"
      />
    </div>
  );
}

// ─── NewsCard (standard grid card) ───────────────────────────────────────────

export function NewsCard({ article }: { article: NewsArticle }) {
  const navigate = useNavigate();
  return (
    <article
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => navigate(`/news/${article.id}`)}
      aria-label={article.title}
    >
      {/* Image — aspect-square for score graphics keeps them undistorted */}
      <div className="relative overflow-hidden">
        <NewsCardImage
          article={article}
          heightCls={article.imageFit === 'contain' ? 'h-44 aspect-auto' : 'h-44'}
        />
        <span className={`absolute top-3 left-3 ${article.badgeCls} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide z-10`}>
          {article.categoryLabel}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-sm leading-snug mb-2 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <span className="text-red-600 text-xs font-bold flex items-center gap-0.5 group-hover:gap-1 transition-all">
            Read More <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

// ─── NewsCardCompact (Home page widget) ───────────────────────────────────────

export function NewsCardCompact({ article }: { article: NewsArticle }) {
  const navigate = useNavigate();
  return (
    <article
      className="flex flex-col flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => navigate(`/news/${article.id}`)}
      aria-label={article.title}
    >
      <div className="relative overflow-hidden flex-shrink-0">
        <NewsCardImage article={article} heightCls="h-40" />
        <span className={`absolute top-3 left-3 ${article.badgeCls} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide z-10`}>
          {article.categoryLabel}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-sm leading-snug mb-1.5 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[10px] text-gray-400">{article.date}</span>
          <span className="text-red-600 text-xs font-bold">Read More →</span>
        </div>
      </div>
    </article>
  );
}

// ─── FeaturedNewsCard (News page hero + Home page featured slot) ──────────────

export function FeaturedNewsCard({ article }: { article: NewsArticle }) {
  const navigate = useNavigate();
  return (
    <article
      className="hidden lg:flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => navigate(`/news/${article.id}`)}
      aria-label={article.title}
    >
      <div className="relative overflow-hidden">
        <NewsCardImage article={article} heightCls="h-64" />
        <span className={`absolute top-4 left-4 ${article.badgeCls} text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide z-10`}>
          {article.categoryLabel}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-lg leading-snug mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">{article.date} · {article.readTime}</span>
          <span className="text-red-600 text-sm font-bold flex items-center gap-0.5 group-hover:gap-1 transition-all">
            Read More <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
