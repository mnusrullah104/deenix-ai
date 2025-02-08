import { type SchemaTypeDefinition } from 'sanity'
import author from './author'
import post from './post'

export const schemaTypes = [author, post,]; // Add comment to your existing schemas

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,post],
}
