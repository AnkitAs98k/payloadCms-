import { CollectionConfig } from 'payload'
import { startWorkflow } from '../workflow/workflowLogic'
export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Under Review', value: 'review' },
        { label: 'Approved', value: 'approved' },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],


 hooks: {
  afterChange: [
   async ({ doc, req }) => {
  await startWorkflow({
    payload: req.payload,
    collection: 'blog',
    docId: doc.id,
  })
}
  ],
}
}