import React from 'react';
import { Star, MessageSquareQuote, CheckCircle, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#FFFBF5] border-b border-[#E8DDCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CC8800]/15 border border-[#CC8800]/30 text-[#8F5500] font-mono text-xs font-bold uppercase tracking-wider">
            <ThumbsUp className="w-3.5 h-3.5 text-[#CC8800]" />
            Facebook Community Feedback & Suki Love
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight uppercase">
            PATOK SA <span className="text-[#C55221]">SALU-SALO</span> AT HANDAAN SA CAVITE
          </h2>
          <p className="text-gray-700 text-sm sm:text-base font-normal">
            Tatak Chef na ulam trays, pancit bilaos, at family bundles. Heto ang sabi ng ating mga suki mula sa Indang, Mendez, at Alfonso.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {REVIEWS.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border-2 border-[#111827] p-6 sm:p-7 shadow-[4px_4px_0px_0px_#111827] hover:shadow-[6px_6px_0px_0px_#CC8800] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#CC8800] text-[#CC8800]" />
                    ))}
                    <span className="ml-1 text-xs font-mono font-bold text-[#111827]">5.0</span>
                    {review.fbVerified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] text-[10px] font-mono font-bold">
                        <CheckCircle className="w-3 h-3 text-[#1877F2]" />
                        FB Community
                      </span>
                    )}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-[#C55221]/30" />
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-800 leading-relaxed italic">
                  "{review.comment}"
                </p>

                {/* Favorite Order Badge */}
                <div className="bg-[#FFFBF5] border border-[#E8DDCE] rounded-lg p-2.5 text-xs">
                  <span className="text-gray-500 font-mono text-[10px] block uppercase">Paboritong Order:</span>
                  <span className="font-display font-bold text-[#C55221]">🔥 {review.favoriteOrder}</span>
                </div>
              </div>

              {/* Reviewer Profile */}
              <div className="pt-4 mt-4 border-t border-[#E8DDCE] flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#CC8800]"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-display font-bold text-sm text-[#111827]">{review.name}</h4>
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    {review.role} • <span className="text-[#C55221] font-semibold">{review.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
