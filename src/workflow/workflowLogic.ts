export const startWorkflow = async ({
  payload,
  collection,
  docId,
}: {
  payload: any
  collection: string
  docId: string
}) => {

  const workflows = await payload.find({
    collection: 'workflows',
    where: {
      targetCollection: {
        equals: collection,
      },
    },
  })

  if (!workflows.docs.length) return

  const workflow = workflows.docs[0]

  const firstStep = workflow.steps?.[0]

  if (!firstStep) return

  await payload.create({
    collection: 'workflowLogs',
    data: {
      workflow: workflow.id,
      collection,
      documentId: docId,
      step: firstStep.stepName,
      action: 'started',
    },
  })

  console.log(`Workflow started for ${collection} ${docId}`);
}