import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'SunTechLand — Cybersecurity News',
    description: 'Latest cybersecurity news, threat intelligence, CVE alerts, and security research.',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map(post => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        link: `/post/${post.id}/`,
        categories: [post.data.category],
        author: post.data.author ?? 'SunTechLand Staff',
      })),
    customData: `<language>en-us</language>`,
  });
}
