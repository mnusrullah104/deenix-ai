import { defineField } from "sanity";

export default {
    name:"author",
    title:"author",
    type:"document",
    fields:[
        defineField({
           name: "name",
           type:"string",
           title:"name"
        }),
        defineField({
           name: "slug",
           type:"slug",
           options:{source:"name"}
        }),
        defineField({
            name: "image",
            type:"image",
            title:"profileImage",
            options:{hotspot:true}
        })
    ]
}