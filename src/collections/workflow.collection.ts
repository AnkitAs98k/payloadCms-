import { CollectionConfig } from 'payload'

export const Workflows: CollectionConfig = {
  slug: 'workflows',

  access: {
  update: () => false,
  delete: () => false,
},
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
      name: 'targetCollection',
      type: 'text',
      required: true,
    },

    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'stepName',
          type: 'text',
          required: true,
        },
        {
          name: 'stepType',
          type: 'select',
          options: [
            { label: 'Approval', value: 'approval' },
            { label: 'Review', value: 'review' },
            { label: 'Sign-Off', value: 'signoff' },
            { label: 'Comment Only', value: 'comment' },
          ],
        },
        {
          name: 'assignedUser',
          type: 'relationship',
          relationTo: 'users',
        },
        {
          name: 'order',
          type: 'number',
        },
      ],
    },
  ],
}