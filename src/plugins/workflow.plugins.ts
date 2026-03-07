import { Plugin } from 'payload'

export const workflowPlugin: Plugin = (config) => {

  console.log("Workflow plugin loaded")

  return {
    ...config,
    onInit: async (payload) => {
      console.log("Workflow system initialized")
    },
  }
}