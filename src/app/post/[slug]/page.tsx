import { client } from "@/sanity/lib/client";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sanityTypes } from "../../../../@types";
import { Calendar1Icon } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { Metadata } from "next";

type Props = {
  params: { slug: string }; // ✅ Fix: Ensure `params` type matches Next.js expected format
  searchParams?: Record<string, string | string[] | undefined>; // ✅ Optional: Fix `searchParams`
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const query = `*[_type=="post"&&slug.current==$slug]{_id,title,description,image}[0]`;
  
  // ✅ Ensure the fetch function gets the correct slug
  const data = await client.fetch(query, { slug: params.slug });

  if (!data) {
    return {
      title: "Post Not Found",
      description: "This post does not exist",
    };
  }

  return {
    applicationName: "Deenix",
    creator: "Muhammad Nasrullah",
    metadataBase: new URL("https://yourwebsite.com"), // ✅ Fix: Provide a valid URL
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [urlFor(data.image).url()],
      type: "article",
      locale: "en_AU",
    },
    authors: [{ name: "Muhammad Nasrullah" }],
  };
}


export const revalidate = 60;

async function getPost(slug: string): Promise<any> {
  const query = `*[_type == "post" && slug.current == $slug]{
    _createdAt,
    title,
    content,
    image,
    author-> {
      name
    },
    "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{
      _id,
      name,
      comment,
      createdAt
    }
  }[0]`;
  return await client.fetch(query, { slug });
}
export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <p>The requested blog post does not exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-background">
      <div className="h-full w-full flex flex-1 max-w-[1500px] pb-24 md:px-14 pt-32 px-4 md:px-14 flex-col space-y-4">
        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl tracking-tighter font-extrabold text-center md:text-left">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex flex-row items-center space-x-3 pb-2">
          <div className="flex flex-row items-center space-x-2">
            <Avatar>
              <AvatarFallback>{post.author.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{post.author.name}</p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Calendar1Icon size={20} className="text-primary" />
            <p>{new Date(post._createdAt).toDateString()}</p>
          </div>
        </div>

        {/* Blog Image */}
        <div className="w-full h-96 max-h-96 relative overflow-hidden">
          <Image
            src={urlFor(post.image).url()}
            alt={post.title}
            fill
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <article className="prose lg:prose-lg dark:prose-invert pt-6">
          <PortableText value={post.content} />
        </article>

        {/* Comment Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {post.comments.length > 0 ? (
            post.comments.map((comment: any) => (
              <div key={comment._id} className="mb-4 p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{comment.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <p className="font-bold">{comment.name}</p>
                </div>
                <p className="mt-2 text-gray-600">{comment.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(comment.createdAt).toDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}