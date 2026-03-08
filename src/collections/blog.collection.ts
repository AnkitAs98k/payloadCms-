import { CollectionConfig } from 'payload'
import { startWorkflow } from '../workflow/workflowLogic'
export const Blog: CollectionConfig = {
  slug: 'blog',
  access: {
  create: ({ req }) => req.user?.role === "user",
  update: ({ req }) => req.user?.role === "admin",
  read: () => true
},
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
    async ({ doc, previousDoc, req }) => {

      // 1️⃣ Workflow start
      if (!previousDoc) {
        await startWorkflow({
          payload: req.payload,
          collection: "blog",
          docId: doc.id,
        })
      }

      // 2️⃣ Admin approval log
      if (previousDoc && previousDoc.status !== doc.status) {

        await req.payload.create({
          collection: "workflowLogs",
          data: {
            workflow: doc.workflow,
            documentId: doc.id,
            collection: "blog",
            step: "review",
            action: doc.status,
            user: req.user?.id,
            timestamp: new Date().toISOString(),
          },
        })

      }

    },
  ],
}
  
}