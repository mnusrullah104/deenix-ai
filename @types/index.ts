import { SanityImageAssetDocument } from 'next-sanity';
import Image from 'next/image';
export namespace sanityTypes{
    export interface Post{
        _id:string;
        _createdAt:Date,
        _updatedAt:Date,
        title:string,
        description:string,
        slug:{current:string}
        image:SanityImageAssetDocument,
        content:any;
    author:Author <SanityImageAssetDocument |undefined > ;
    comments: {
        _id: string;
        name: string;
        comment: string;
        createdAt: string;
    }[];
    }
}
export interface Author<T>{
    _id:string;
    name:string;
    image:any;
}
