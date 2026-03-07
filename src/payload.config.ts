import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { Blog } from './collections/blog.collection'
import { Contract } from './collections/contract.collection'
import { Workflows } from './collections/workflow.collection'
import { WorkflowLogs } from './collections/workflowLog.collection'

import { workflowPlugin } from './plugins/workflow.plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    Blog,
    WorkflowLogs,
    Workflows,
    Contract,
   
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),

  sharp,

  plugins: [workflowPlugin],

  endpoints: [
  // API 1: Trigger Workflow
  {
  path: '/workflows/trigger',
  method: 'post',
  handler: async (request) => {
    try {

      const body = await (request as any).json()
      const { collection, docId } = body

      if (!collection || !docId) {
        return Response.json(
          { message: 'collection and docId required' },
          { status: 400 }
        )
      }

      const workflows = await request.payload.find({
        collection: 'workflows',
        where: {
          targetCollection: {
            equals: collection,
          },
        },
      })

      if (!workflows.docs.length) {
        return Response.json(
          { message: 'No workflow found' },
          { status: 404 }
        )
      }

      const workflow = workflows.docs[0]
      const firstStep = workflow.steps?.[0]

      const log = await request.payload.create({
        collection: 'workflowLogs',
        data: {
          workflow: workflow.id,
          collection,
          documentId: docId,
          step: firstStep?.stepName || 'unknown',
          action: 'triggered',
        },
      })

      return Response.json({
        message: 'Workflow triggered successfully',
        log,
      })

    } catch (error) {
      console.error(error)
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  },
},
],
})