import { useState, useEffect } from 'react';

interface InstagramPost {
  id: string;
  media_url: string;
  media_type: string;
  permalink: string;
  caption?: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // You'll need to generate this token once using Instagram Basic Display API
  // Steps: 
  // 1. Create Instagram App at developers.facebook.com
  // 2. Add Instagram Basic Display product
  // 3. Generate long-lived access token (lasts 60 days, can be refreshed)
  const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN_HERE';

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,caption&limit=6&access_token=${ACCESS_TOKEN}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        const imagePosts = data.data.filter((post: InstagramPost) => 
          post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
        );
        setPosts(imagePosts);
      } catch (error) {
        console.error('Instagram feed error:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (ACCESS_TOKEN !== 'YOUR_ACCESS_TOKEN_HERE') {
      fetchInstagramFeed();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-0.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-gray-50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full">
        <a 
          href="https://www.instagram.com/greentea.w.honey00/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-12 border border-gray-200 hover:border-gray-400 transition-colors"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-2">Follow on Instagram</p>
          <p className="text-sm font-light">@greentea.w.honey00</p>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          className="relative aspect-square overflow-hidden bg-gray-50 group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={post.media_url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </a>
      ))}
    </div>
  );
}