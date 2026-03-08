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
import { workflowEndpoints } from './api/workflow.routes'

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

  endpoints: workflowEndpoints,

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
})