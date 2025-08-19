// 'use client'
// import MobileHeroSection from "@/components/mobile/home/HeroSection";
// import CategorySection from "@/components/responsive/home/CategorySection";
// import HeroSection from "@/components/web/home/HeroSection";
// import useIsMobile from "@/hooks/useIsMobile";
// import TopCarBrands from "@/components/responsive/home/TopCarBrands";
// import UpcomingCars from "@/components/responsive/home/UpcomingCar";
// import LatestCarNews from "@/components/web/home/LatestCarNews";
// import MobileLatestCarNews from "@/components/mobile/home/LatestCarNews";
// import QuickLook from "@/components/responsive/home/QuickLook";
// import CarByType from "@/components/responsive/home/CarByType";
// import CarByPrice from "@/components/responsive/home/CarByPrice";
// import VariantsExplained from "@/components/web/home/VariantsExplained";
// import MobileVariantsExplained from "@/components/mobile/home/VariantsExplained";
// import ExpertCarReviews from "@/components/web/home/ExpertCarReviews";
// import MobileExpertCarReviews from "@/components/mobile/home/ExpertCarReviews";
// import LatestVideos from "@/components/responsive/home/LatestVideos";
// import CarWebStories from "@/components/responsive/home/CarWebStories";

// export default function Home() {

//   const isMobile = useIsMobile() 

//   return (
//     <> 
//       {isMobile ? <MobileHeroSection /> : <HeroSection />}
//       <CategorySection />
//       <UpcomingCars />
//       {isMobile ? <MobileLatestCarNews /> : <LatestCarNews />}
//       <QuickLook />
//       <CarByType /> 
//       <CarByPrice />
//       <CarWebStories />
//       <LatestVideos />
//       {isMobile ? <MobileVariantsExplained /> : <VariantsExplained />}
//       {isMobile ? <MobileExpertCarReviews /> : <ExpertCarReviews />}
//       <TopCarBrands />
//     </>
//   );
// }



'use client';
import { useState, useEffect } from 'react';

function formatViews(number) {
  if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1) + 'B';
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + 'M';
  if (number >= 1_000) return (number / 1_000).toFixed(1) + 'K';
  return number.toString();
}

export default function Home() {
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [views, setViews] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [saves, setSaves] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormComplete = likes && views && comments && shares && saves && followers;

  const strategyBank = {
    likes: [
      "Change thumbnail to bold face + text",
      "Add emotional trigger in caption",
      "Use high relatability hooks like 'This felt personal 🥲'",
      "Try using trending face or moment in first 1s",
    ],
    shares: [
      "Add shock moment in first 3 seconds",
      "Use bold text: 'Send this to your friend 😂'",
      "Add meme reference or remix style",
      "Trigger reactions like 'This is wild 💀'",
    ],
    saves: [
      "Add tip-style content or mini value",
      "Use caption: 'You'll need this later 🔖'",
      "Make it relatable or 'too true to skip'",
    ],
    comments: [
      "Ask debate-style question in caption",
      "Pin comment: 'What would you do?'",
      "End reel with mystery or twist",
      "Trigger emotional replies: 'Did this happen to you too?'",
    ],
  };

  const handleAnalyze = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const numFollowers = parseInt(followers);
      const numLikes = parseInt(likes);
      const numViews = parseInt(views);
      const numComments = parseInt(comments);
      const numShares = parseInt(shares);
      const numSaves = parseInt(saves);

      if (numViews === 0 || isNaN(numViews)) {
        alert("Views must be greater than 0");
        setLoading(false);
        return;
      }

      const ratios = {
        likes: (numLikes / numViews) * 100,
        comments: (numComments / numViews) * 100,
        shares: (numShares / numViews) * 100,
        saves: (numSaves / numViews) * 100,
      };

      const weightedScore = ((numShares * 12) + (numSaves * 10) + (numComments * 6) + (numLikes * 3)) / numViews * 100;
      let score = Math.min(Math.floor(weightedScore), 100);

      let status = '';
      if (score >= 85) status = '🔥 Viral – Your reel has hit the sweet spot!';
      else if (score >= 65) status = '⚡ Decent – It’s picking up. A few tweaks and boom!';
      else status = '📉 Needs Boost – Let’s fix the weak spots!';

      const issues = [];
      const fixPlan = [];

      if (ratios.likes < 8) {
        issues.push("Low Likes");
        fixPlan.push("❤️ Boost Likes:");
        fixPlan.push(...strategyBank.likes);
      }
      if (ratios.saves < 2) {
        issues.push("Low Saves");
        fixPlan.push("💾 Boost Saves:");
        fixPlan.push(...strategyBank.saves);
        fixPlan.push("⚡ Create a mini value-drop so users *have* to save it!");
      }
      if (ratios.shares < 3) {
        issues.push("Low Shares");
        fixPlan.push("🔁 Boost Shares:");
        fixPlan.push(...strategyBank.shares);
        fixPlan.push("🔥 Add a 'this deserves to go viral' moment at the end.");
      }
      if (ratios.comments < 1.5) {
        issues.push("Low Comments");
        fixPlan.push("💬 Boost Comments:");
        fixPlan.push(...strategyBank.comments);
        fixPlan.push("🧠 Use open-ended captions that *beg* for replies.");
      }

      const majorIssue = issues.length > 0 ? issues.join(', ') : '🚀 Nothing major — You’re killing it!';

      const activeFollowers = Math.floor(numFollowers * 0.1);
      const avgEngagementRate = score / 100;
      const multiplierMin = score >= 90 ? 5 : score >= 70 ? 3 : score >= 50 ? 1.5 : 1;
      const multiplierMax = score >= 90 ? 9 : score >= 70 ? 6 : score >= 50 ? 2.5 : 1.5;

      const calculatedMin = Math.floor(activeFollowers * avgEngagementRate * multiplierMin);
      const calculatedMax = Math.floor(activeFollowers * avgEngagementRate * multiplierMax);

      let minViews = Math.max(numViews, calculatedMin);
      let maxViews = Math.max(minViews + 1, calculatedMax);

      let performanceNote = '';

      if (numViews > calculatedMax * 1.2) {
        minViews = numViews;
        maxViews = Math.floor(numViews * 1.3);
        performanceNote = '📈 Your reel is already outperforming estimates! This projection shows where it could head if momentum continues.';
      }

      const maxViewsEstimate = `${formatViews(minViews)} - ${formatViews(maxViews)}`;

      setResult({
        viralScore: score,
        status,
        majorIssue,
        fixPlan,
        maxViewsEstimate,
        performanceNote,
      });

      setLoading(false);
    }, 3000);
  };

  return (

    <div className="max-w-md mx-auto px-4 py-8">
      {[{ label: "👥 Followers", value: followers, setter: setFollowers },
        { label: "👀 Views", value: views, setter: setViews },
        { label: "❤️ Likes", value: likes, setter: setLikes },
        { label: "💬 Comments", value: comments, setter: setComments },
        { label: "🔁 Shares", value: shares, setter: setShares },
        { label: "💾 Saves", value: saves, setter: setSaves },
      ].map((field, idx) => (
        <div key={idx} className="mb-2">
          <label className="block text-sm font-medium mb-1">{field.label}</label>
          <input
            type="number"
            value={field.value}
            onChange={e => field.setter(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleAnalyze}
        disabled={!isFormComplete || loading}
        className={`w-full py-2 text-white font-semibold rounded transition-colors duration-300 ${
          isFormComplete && !loading ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {loading && <div className="mt-4 text-center text-sm text-gray-600">⏳ Crunching numbers…</div>}

      {result && (
        <div className="mt-6 p-4 border rounded bg-white shadow-md hover:shadow-lg transition-all duration-300">

          <p className="text-lg font-semibold">
            🎯 Viral Score: <span className="text-black underline underline-offset-4">{result.viralScore}/100</span>
          </p>

          <p className="font-medium mt-1">
            📊 <span className="text-blue-600">{result.status}</span>
          </p>

          <p className="mt-2 font-semibold text-pink-600">
            🚨 Major Issue: <span className="text-gray-800">{result.majorIssue}</span>
          </p>

          {result.fixPlan.length > 0 && (
            <>
              <p className="mt-2 font-medium text-green-600">✅ Fix Plan:</p>
              <ul className="list-disc pl-5 text-sm">
                {result.fixPlan.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-700">
                🔮 <strong>Estimated Reach Potential:</strong> {result.maxViewsEstimate} views
              </p>
              {result.performanceNote && (
                <p className="text-xs text-blue-500 italic mt-1">{result.performanceNote}</p>
              )}
              <p className="text-xs text-gray-500 mt-1 italic">
                Based on ~10% of your followers being active and dynamic score-based push boost.
              </p>
              <p className="text-xs text-gray-500 italic">
                If your reel gains more likes, shares, or saves over time, update the inputs and re-analyze for a more accurate reach estimate.
              </p>
            </>
          )}

        </div>
      )}
    </div>

  );
}