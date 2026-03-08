import { CollectionConfig } from 'payload'
import { startWorkflow } from '../workflow/workflowLogic'
export const Contract: CollectionConfig = {
  slug: 'contract',

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
  ],

  hooks: {
  afterChange: [
    async ({ doc, req }) => {
    await startWorkflow({
    payload: req.payload,
    collection: 'contract',
    docId: doc.id,
  })
}
  ],
},
}