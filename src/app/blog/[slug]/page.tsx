// Blog yazısı detay sayfası — veri çeker, JSON-LD oluşturur, BlogPostDetail'e iletir.
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getPost } from "@/lib/sanity-fetchers"
import { buildMetadata } from "@/components/seo/MetadataBuilder"
import JsonLd from "@/components/seo/JsonLd"
import BlogPostDetail from "@/components/blog/BlogPostDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const ogImage = post.heroImage ? urlFor(post.heroImage).width(1200).height(630).url() : undefined
  const description = post.excerpt
    ? post.excerpt.length > 155
      ? `${post.excerpt.slice(0, 152).trimEnd()}…`
      : post.excerpt
    : `Read ${post.title} — styling tips and fashion inspiration on STYLEFINDEN.`

  return buildMetadata({
    title: post.title,
    description,
    canonical: `https://stylefinden.com/blog/${slug}`,
    ogImage,
    type: "article",
    publishedTime: post.publishedAt ?? undefined,
    keywords: [post.title, ...(post.tags ?? []), "fashion", "style", "STYLEFINDEN"],
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const heroUrl = post.heroImage ? urlFor(post.heroImage).width(1200).height(630).url() : undefined

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    ...(heroUrl ? { image: heroUrl } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    url: `https://stylefinden.com/blog/${slug}`,
    author: { "@type": "Organization", name: "STYLEFINDEN", url: "https://stylefinden.com" },
    publisher: {
      "@type": "Organization",
      name: "STYLEFINDEN",
      url: "https://stylefinden.com",
      logo: { "@type": "ImageObject", url: "https://stylefinden.com/stylefinden-logo.png" },
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stylefinden.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://stylefinden.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BlogPostDetail post={post} />
    </>
  )
}
