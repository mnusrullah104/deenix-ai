import { rule } from "postcss";
import { title } from "process";
import { defineField } from "sanity";
import author from "./author";

export default {
  name: "post",
  title: "post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "title",
      description: "This is your blog post title",
    }),
    defineField({
      name: "description",
      title: "description",
      description:
        "make this description brief so the visitor knows what too  expect  in the post",
      type: "string",
      validation: (rule) => rule.min(50).max(250).required(),
    }),
    
    defineField({
        type: "reference",
        to:[{type:"author"}],
      name: "author",
      title: "Author",
      
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "profileImage",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
};
