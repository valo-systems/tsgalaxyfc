import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export function ArticlePage() {
  const navigate = useNavigate();

  const relatedArticles = [
    {
      title: 'Squad News: Players Return',
      category: 'Squad News',
      image: 'bg-gradient-to-br from-blue-500 to-blue-700',
      date: '5 hours ago'
    },
    {
      title: 'Academy Trials Open',
      category: 'Club News',
      image: 'bg-gradient-to-br from-green-500 to-green-700',
      date: '1 day ago'
    },
    {
      title: 'Queens Secure Victory',
      category: 'TS Galaxy Queens',
      image: 'bg-gradient-to-br from-purple-500 to-pink-600',
      date: '1 day ago'
    }
  ];

  return (
    <div className="pb-8">
      {/* Back Button */}
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <button onClick={() => navigate('/news')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 lg:px-6 max-w-4xl">
        <div className="mb-6">
          <span className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Match Preview
          </span>
          <h1 className="font-bold text-3xl lg:text-5xl mb-4 leading-tight">
            Preview: The Rockets Ready for Crucial Home Fixture
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>May 13, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>3 min read</span>
            </div>
            <span>By TS Galaxy Media Team</span>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">Share:</span>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors">
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="h-64 lg:h-96 bg-gradient-to-br from-red-500 to-red-700 rounded-xl mb-8" />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            TS Galaxy FC look to continue their winning streak this weekend as they welcome opponents to Mbombela Stadium. The team's recent form has been impressive, and supporters are excited for what promises to be an exciting match.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Rockets have been in excellent form over the past few weeks, securing important victories that have lifted them up the DStv Premiership table. With key players returning from injury and the squad showing great cohesion on the pitch, confidence is high ahead of Saturday's fixture.
          </p>

          <h2 className="font-bold text-2xl mt-8 mb-4">Team News</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Head Coach has welcomed back three important players to training this week. All three are expected to be available for selection, giving the team a significant boost ahead of the crucial home match.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            "We're in a good place right now," the coach said in his pre-match press conference. "The players have been working hard, and we're seeing the results on the pitch. The atmosphere at Mbombela Stadium is always special, and we're looking forward to having our supporters behind us."
          </p>

          {/* Pull Quote */}
          <div className="bg-gray-50 border-l-4 border-red-600 p-6 my-8">
            <p className="text-xl lg:text-2xl font-medium italic text-gray-800 mb-2">
              "We're ready for this challenge. The team has been working hard all week."
            </p>
            <p className="text-sm text-gray-600">- Head Coach</p>
          </div>

          <h2 className="font-bold text-2xl mt-8 mb-4">Looking Ahead</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The match kicks off at 15:00 on Saturday at Mbombela Stadium. Tickets are still available and can be purchased online or at the stadium on matchday. Gates open at 13:00, giving supporters plenty of time to soak in the matchday atmosphere.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            The club shop will also be open before and after the match, with the new 2025/26 kit available for purchase. It promises to be a great day for the entire TS Galaxy family.
          </p>

          <div className="bg-red-600 text-white rounded-xl p-6 my-8">
            <h3 className="font-bold text-xl mb-3">Matchday Information</h3>
            <ul className="space-y-2 text-sm">
              <li><strong>Kickoff:</strong> Saturday, 15:00</li>
              <li><strong>Venue:</strong> Mbombela Stadium</li>
              <li><strong>Gates Open:</strong> 13:00</li>
              <li><strong>Tickets:</strong> Available online and at the stadium</li>
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">
            The Rockets will be looking to secure all three points and continue their push up the table. With home advantage and the backing of the supporters, the team is confident of delivering a positive result.
          </p>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-bold text-2xl mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className={`h-40 ${article.image}`} />
                <div className="p-4">
                  <span className="text-xs font-semibold text-red-600 uppercase">{article.category}</span>
                  <h4 className="font-bold text-sm mt-2 mb-2">{article.title}</h4>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
