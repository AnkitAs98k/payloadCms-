Key Features
  Dynamic workflow configuration through the Payload Admin UI
  Multi-stage approval workflows with configurable steps
  Automatic workflow triggering using collection hooks
  Immutable audit trail using WorkflowLogs
  Plugin-based modular workflow system
  Custom REST APIs for workflow management
  Reusable workflow engine applicable to multiple collections

steps:

Initilaized payload cms 
          ↓    
designed the collection
          ↓   
designed the workflow logic  
          ↓     
made hooks inside the blogs and contract
          ↓
created plugin system
          ↓
Designed the api and the endpoints as mentioned


1.Collection : path : ./src/collections
    * Blog        :  Title, content, author
    * Contract    :  Name, client, document, Amount, status
    * Workflow    :  name, targetCollection, steps(stepName,stepType,assignedUser,order) 
    * WorkflowLogs : workflow, collection, documentId, step, action, user, comment, timestamp


2.Creating hooks: path : ./src/collections/blog.collection.ts   &   ./src/collections/contract.collection.ts
  -> Blog Hooks
  -> Contract hook



3.WorkFlow logic :  path : ./src/worklog/workflowlogic.ts
    
  user save blog or contarct
              ↓
  afterchange hook gets triggered
              ↓
  startWorkflow() funciton executes
              ↓
  system checks for the workflow matching the targetted collection -> if not found, return();
              ↓
  if found, automatically creates a new entry in the workflowLog(audit trail)


4.Creating plugins -> path : ./src/plugins/wrokflow.plugins.ts
  designed plugins inside the system inorder registered it globally inside Payload CMS to increase the reusablity of the code.

5.Api Endpoints : 
  POST /api/workflows/trigger       -> triggers a workflow for a specific document.
  GET /api/workflows/status/:docId  -> retrieves the workflow logs and current workflow status for a document.

