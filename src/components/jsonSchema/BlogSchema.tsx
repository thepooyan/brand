import { I_Blog } from "~/db/schema";

const BlogSchema = ({ blog }: { blog: I_Blog }) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt,
        image: blog.image,
        author: {
          "@type": "Person",
          name: "Saharnaz sadeghi",
        },
        // author: {
        //   "@type": "Organization",
        //   name: "Hooshbaan",
        // },
        publisher: {
          "@type": "Organization",
          name: "Hooshbaan",
          logo: {
            "@type": "ImageObject",
            url: "https://Hooshbaan.com/logo.webp",
          },
        },
        datePublished: blog.date,
        dateModified: blog.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://Hooshbaan.com/Blog/${encodeURIComponent(blog.slug)}`,
        },
        articleBody: blog.content,
        keywords: blog.tags?.join(", "),
        // interactionStatistic: {
        //   "@type": "InteractionCounter",
        //   interactionType: { "@type": "LikeAction" },
        //   userInteractionCount: blog.likeCount,
        // },
        timeRequired: `PT${blog.readTime}M`,
      })}
    </script>
  );
};

export default BlogSchema;
