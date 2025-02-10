import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { sanityTypes } from "../../@types";
import { urlFor } from "@/sanity/lib/image";
import { Card } from "@/components/ui/card";
import { Calendar1Icon } from "lucide-react";
import Link from "next/link";

import { ShineBorder } from "@/components/ui/shine-border";
export const revalidate = 60;

async function getPosts() {
  try {
    const query = `
      *[_type == "post"] | order(_createdAt desc)
    `;
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return [];
  }
}

export default async function Home() {
  const posts: sanityTypes.Post[] = await getPosts();
  console.log(posts);

  return (
    <div className="flex flex-col items-center w-full bg-background pt-20">
      {/* Add padding-top to avoid header overlap */}
      <div className="h-full w-full flex flex-col max-w-[1500px] md:px-14 px-4 space-y-4">
        {/* shine border  */}
        <ShineBorder
          className="relative flex h-[100px] md:h-[150px] lg:h-[200px] w-full mt-6 mb-6 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl md:text-6xl lg:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Deenix AI Blog
          </span>
        </ShineBorder>

        <div className="grid md:grid-cols-3 gap-8 grid-cols-1">
          {posts.map((post: sanityTypes.Post, index: number) => (
            <Link
              key={index}
              href={`/post/${post.slug.current}`}
              className="space-y-5 group cursor-pointer"
            >
              <Card className="flex flex-col justify-between h-full">
                <div className="space-y-5">
                  {/* Image container */}
                  <div className="h-48 w-full overflow-hidden rounded-lg rounded-b-none relative">
                    {" "}
                    {/* Reduced height */}
                    <div className="h-full w-full bg-black opacity-0 absolute z-20 group-hover:opacity-25 transition-all duration-200 ease-out" />
                    {/* <Image
                      src={urlFor(post.image).url()}
                      alt={post.title}
                      width={500}
                      height={300}
                      className="h-full object-cover aspect-auto w-full"
                      style={{ objectFit: "cover" }}
                    /> */}
                    <Image
                      src={
                        post.image
                          ? urlFor(post.image).url()
                          : "/placeholder.jpg"
                      } // Use placeholder if image is missing
                      alt={post.title}
                      width={500}
                      height={300}
                      className="h-full object-cover aspect-auto w-full"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="space-y-3 px-4 py-2">
                    <div className="flex flex-row items-center space-x-2">
                      <Calendar1Icon size={20} className="text-primary" />
                      <p className="font-medium">
                        {new Date(post._createdAt).toDateString()}
                      </p>
                    </div>
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    {/* Removed description */}
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-all duration-200 ease-in-out">
                    Read More
                  </button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
