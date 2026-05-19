import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { fetchArticles, mapArticleFromApi } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const { data } = await fetchArticles();
        const list = Array.isArray(data) ? data : data?.articles ?? [];
        const activeArticles = list
          .filter((a) => a.isActive !== false)
          .map((a) => ({
            ...mapArticleFromApi(a),
            ...a,
          }));
        setArticles(activeArticles);
      } catch (error) {
        console.error('Error loading articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured here are the languages in which I am knowledgeable in!
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Here are some articles about the programming languages I am familiar with.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
        </div>

        {loading ? (
          <p className="text-center text-zinc-600">Loading articles...</p>
        ) : articles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((article, idx) => (
              <article key={article.id || article._id || idx} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
                  <img
                    src={article.imageUrl || '/assets/images/placeholder.jpg'}
                    alt={article.title}
                    className="h-80 w-120 object-fill block"
                    onError={(e) => {
                      e.target.src = '/assets/images/placeholder.jpg';
                    }}
                  />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Article {idx + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-900">{article.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {article.description || (article.content && article.content[0]) || 'No description available.'}
                </p>
                <Button to={`/articles/${article.name}`} className="mt-4">
                  Read More
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-600">No articles available.</p>
        )}
      </section>

  
    </div>
  );
};

export default ArticleListPage;