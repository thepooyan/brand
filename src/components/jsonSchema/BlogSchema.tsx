import { I_Blog } from "~/db/schema";
import { nameEn, socialLinks } from "../../../config/config";

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
        publisher: {
          "@type": "Organization",
          name: nameEn,
          logo: {
            "@type": "ImageObject",
            url: `${socialLinks.website}/logo.webp`,
          },
        },
        datePublished: blog.date,
        dateModified: blog.date,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${socialLinks.website}/Blog/${encodeURIComponent(blog.slug)}`,
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
