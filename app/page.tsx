'use client';

import { useState } from 'react';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

interface Keyword {
  id: number;
  keyword: string;
  searchVolume: number;
  keywordDifficulty: number;
  cpc: number;
  intent: string;
}

interface SERPResult {
  position: number;
  url: string;
  title: string;
  domain: string;
}

// ==========================================
// DUMMY DATA FOR DEMONSTRATION
// ==========================================

const dummyKeywords: Keyword[] = [
  {
    id: 1,
    keyword: 'best running shoes',
    searchVolume: 74000,
    keywordDifficulty: 67,
    cpc: 2.45,
    intent: 'Commercial'
  },
  {
    id: 2,
    keyword: 'how to tie shoelaces',
    searchVolume: 22000,
    keywordDifficulty: 32,
    cpc: 0.45,
    intent: 'Informational'
  },
  {
    id: 3,
    keyword: 'nike running shoes',
    searchVolume: 165000,
    keywordDifficulty: 78,
    cpc: 3.20,
    intent: 'Commercial'
  },
  {
    id: 4,
    keyword: 'marathon training plan',
    searchVolume: 33000,
    keywordDifficulty: 45,
    cpc: 1.85,
    intent: 'Informational'
  },
  {
    id: 5,
    keyword: 'buy running shoes online',
    searchVolume: 18000,
    keywordDifficulty: 72,
    cpc: 4.10,
    intent: 'Transactional'
  },
  {
    id: 6,
    keyword: 'running shoes reviews',
    searchVolume: 12000,
    keywordDifficulty: 55,
    cpc: 2.15,
    intent: 'Commercial'
  }
];

const dummySERPResults: SERPResult[] = [
  { position: 1, url: 'https://example.com/best-shoes', title: 'Top 10 Running Shoes of 2024', domain: 'example.com' },
  { position: 2, url: 'https://runner-world.com/shoes', title: 'Complete Running Shoe Guide', domain: 'runner-world.com' },
  { position: 3, url: 'https://nike.com/running', title: 'Nike Running Shoes - Official Store', domain: 'nike.com' },
  { position: 4, url: 'https://reviews.com/running-shoes', title: 'Running Shoes Reviews & Comparisons', domain: 'reviews.com' },
  { position: 5, url: 'https://amazon.com/running-shoes', title: 'Running Shoes - Amazon.com', domain: 'amazon.com' },
  { position: 6, url: 'https://adidas.com/running', title: 'Adidas Running Shoes Collection', domain: 'adidas.com' },
  { position: 7, url: 'https://sports-blog.com/shoes', title: 'How to Choose the Right Running Shoes', domain: 'sports-blog.com' },
  { position: 8, url: 'https://zappos.com/running', title: 'Running Shoes | Free Shipping at Zappos', domain: 'zappos.com' },
  { position: 9, url: 'https://runnersguide.com/shoes', title: 'Running Shoe Buying Guide 2024', domain: 'runnersguide.com' },
  { position: 10, url: 'https://footlocker.com/running', title: 'Running Shoes - Foot Locker', domain: 'footlocker.com' },
  { position: 11, url: 'https://brooks.com/running-shoes', title: 'Brooks Running Shoes', domain: 'brooks.com' },
  { position: 12, url: 'https://newbalance.com/running', title: 'New Balance Running Shoes', domain: 'newbalance.com' },
  { position: 13, url: 'https://asics.com/running', title: 'ASICS Running Shoes - Official', domain: 'asics.com' },
  { position: 14, url: 'https://marathon.com/gear', title: 'Best Shoes for Marathon Training', domain: 'marathon.com' },
  { position: 15, url: 'https://fit-guide.com/shoes', title: 'Running Shoe Fit Guide', domain: 'fit-guide.com' },
  { position: 16, url: 'https://youtube.com/running-shoes', title: 'Running Shoe Reviews - YouTube', domain: 'youtube.com' },
  { position: 17, url: 'https://reddit.com/r/running', title: 'r/running - Running Shoe Recommendations', domain: 'reddit.com' },
  { position: 18, url: 'https://outdoorgear.com/running', title: 'Trail Running Shoes Guide', domain: 'outdoorgear.com' },
  { position: 19, url: 'https://sportschek.com/running', title: 'Running Shoes | Sport Chek', domain: 'sportschek.com' },
  { position: 20, url: 'https://runrepeat.com/reviews', title: 'RunRepeat - Running Shoe Reviews', domain: 'runrepeat.com' }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function KeywordResearchTool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>(dummyKeywords);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter keywords based on search query
  const filteredKeywords = keywords.filter(kw =>
    kw.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle keyword selection
  const handleKeywordClick = (keyword: Keyword) => {
    setSelectedKeyword(keyword);
  };

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Get intent color based on type
  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'Commercial':
        return 'bg-blue-600';
      case 'Informational':
        return 'bg-green-600';
      case 'Transactional':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  // Get difficulty color based on score
  const getDifficultyColor = (kd: number) => {
    if (kd < 40) return 'text-green-400';
    if (kd < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="bg-[#111] border-b border-gray-800 px-6 py-4">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Keyword Research Tool
          </h1>
          <p className="text-gray-400 text-sm mt-1">Discover and analyze keywords for your SEO strategy</p>
        </div>
      </header>

      {/* Main Content - Two Panel Layout */}
      <div className="max-w-[1800px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">

          {/* ==========================================
              LEFT PANEL - Search & Keywords List
              ========================================== */}
          <div className="flex flex-col space-y-4 overflow-hidden">

            {/* Search Bar */}
            <div className="bg-[#111] rounded-lg border border-gray-800 p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for keywords..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 pl-11 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Found {filteredKeywords.length} keyword{filteredKeywords.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Keywords Results List */}
            <div className="flex-1 bg-[#111] rounded-lg border border-gray-800 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold">Keywords</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredKeywords.length > 0 ? (
                  <div className="divide-y divide-gray-800">
                    {filteredKeywords.map((keyword) => (
                      <button
                        key={keyword.id}
                        onClick={() => handleKeywordClick(keyword)}
                        className={`w-full text-left p-4 hover:bg-[#1a1a1a] transition-colors ${
                          selectedKeyword?.id === keyword.id ? 'bg-[#1a1a1a] border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-100 flex-1">{keyword.keyword}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getIntentColor(keyword.intent)} bg-opacity-20 ${getIntentColor(keyword.intent).replace('bg-', 'text-')}`}>
                            {keyword.intent}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500 text-xs">Volume</span>
                            <p className="font-semibold text-gray-200">{formatNumber(keyword.searchVolume)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs">KD</span>
                            <p className={`font-semibold ${getDifficultyColor(keyword.keywordDifficulty)}`}>
                              {keyword.keywordDifficulty}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs">CPC</span>
                            <p className="font-semibold text-gray-200">${keyword.cpc.toFixed(2)}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>No keywords found</p>
                      <p className="text-sm text-gray-600 mt-1">Try a different search term</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ==========================================
              RIGHT PANEL - Keyword Overview & SERP
              ========================================== */}
          <div className="flex flex-col space-y-4 overflow-hidden">

            {selectedKeyword ? (
              <>
                {/* Keyword Overview Section */}
                <div className="bg-[#111] rounded-lg border border-gray-800 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{selectedKeyword.keyword}</h2>
                      <span className={`inline-block text-xs px-3 py-1 rounded-full ${getIntentColor(selectedKeyword.intent)} bg-opacity-20 ${getIntentColor(selectedKeyword.intent).replace('bg-', 'text-')}`}>
                        {selectedKeyword.intent} Intent
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Search Volume</p>
                      <p className="text-2xl font-bold text-blue-400">{formatNumber(selectedKeyword.searchVolume)}</p>
                      <p className="text-xs text-gray-500 mt-1">monthly searches</p>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Keyword Difficulty</p>
                      <p className={`text-2xl font-bold ${getDifficultyColor(selectedKeyword.keywordDifficulty)}`}>
                        {selectedKeyword.keywordDifficulty}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedKeyword.keywordDifficulty < 40 ? 'Easy' : selectedKeyword.keywordDifficulty < 70 ? 'Medium' : 'Hard'}
                      </p>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Cost Per Click</p>
                      <p className="text-2xl font-bold text-green-400">${selectedKeyword.cpc.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">average CPC</p>
                    </div>

                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
                      <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Search Intent</p>
                      <p className="text-2xl font-bold text-purple-400">{selectedKeyword.intent}</p>
                      <p className="text-xs text-gray-500 mt-1">primary intent</p>
                    </div>
                  </div>
                </div>

                {/* SERP Overview Section */}
                <div className="flex-1 bg-[#111] rounded-lg border border-gray-800 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="text-lg font-semibold">SERP Overview - Top 20 Results</h3>
                    <p className="text-xs text-gray-500 mt-1">Current ranking positions for "{selectedKeyword.keyword}"</p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="divide-y divide-gray-800">
                      {dummySERPResults.map((result) => (
                        <div key={result.position} className="p-4 hover:bg-[#1a1a1a] transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#1a1a1a] border border-gray-700 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-400">#{result.position}</span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-200 mb-1 truncate">
                                {result.title}
                              </h4>
                              <p className="text-xs text-blue-400 mb-1 truncate">{result.url}</p>
                              <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-1 rounded">
                                {result.domain}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Empty State - No Keyword Selected
              <div className="flex-1 bg-[#111] rounded-lg border border-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-500 max-w-md px-6">
                  <svg
                    className="w-20 h-20 mx-auto mb-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2 text-gray-400">No Keyword Selected</h3>
                  <p className="text-sm text-gray-600">
                    Select a keyword from the left panel to view detailed metrics, SERP overview, and competitive analysis
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
