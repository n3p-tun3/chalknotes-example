import { getPostBySlug } from 'chalknotes';
import NotionRenderer from './NotionRenderer';
import { notFound } from 'next/navigation';

export default async function BlogPost({
  params,
}: any) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-card text-card-foreground rounded-lg border shadow-sm p-8">
          <header className="mb-8 border-b border-border pb-6">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            {post.publishedAt && (
              <time className="text-sm text-muted-foreground mb-4 block">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <NotionRenderer blocks={post.blocks} />
          </div>
        </article>
      </main>
    </div>
  );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { getAllPosts } = await import('chalknotes');
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}