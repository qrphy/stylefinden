// Kart üzerindeki "Trending / New / Popular" etiketlerinin Tailwind renk sınıfları.
export const tagColors: Record<string, string> = {
  Trending: "bg-black text-white",
  New:      "bg-white text-black border border-black",
  Popular:  "bg-gray-100 text-gray-700",
};

// Blog kartlarında kategori etiketinin arka plan/yazı rengi — LatestArticles ve BlogPage tarafından kullanılır.
export const categoryColor: Record<string, string> = {
  "Styling Tips": "bg-black text-white",
  "Trends":       "bg-white text-black border border-black",
  "Accessories":  "bg-gray-100 text-gray-700",
  "Outfit Guide": "bg-gray-900 text-white",
};
