

# Steps

Initialized Payload CMS  
      ↓  
Designed the collections  
      ↓  
Designed the workflow logic  
      ↓  
Made hooks inside the Blog and Contract collections  
      ↓  
Created plugin system  
      ↓  
Designed the APIs and endpoints as mentioned  

---

# 1. Collections  
Path: `./src/collections`

**Blog**
- Title
- Content
- Author

**Contract**
- Name
- Client
- Document
- Amount
- Status

**Workflow**
- name
- targetCollection
- steps  
  - stepName  
  - stepType  
  - assignedUser  
  - order  

**WorkflowLogs**
- workflow
- collection
- documentId
- step
- action
- user
- comment
- timestamp

---

# 2. Creating Hooks  
Path:  
`./src/collections/blog.collection.ts`  
`./src/collections/contract.collection.ts`

- Blog Hooks
- Contract Hooks

---

# 3. Workflow Logic  
Path: `./src/workflow/workflowLogic.ts`

User saves Blog or Contract  
            ↓  
afterChange hook gets triggered  
            ↓  
startWorkflow() function executes  
            ↓  
System checks for the workflow matching the targeted collection  
            ↓  
If not found → return()  
            ↓  
If found → automatically creates a new entry in the WorkflowLogs (audit trail)

---

# 4. Creating Plugins  
Path: `./src/plugins/workflow.plugins.ts`

Designed plugins inside the system in order to register it globally inside Payload CMS to increase the reusability of the code.

---

# 5. API Endpoints

### Trigger Workflow
POST `/api/workflows/trigger`
Triggers a workflow for a specific document.

GET `/api/workflows/status/:docId`
Check Workflow Status
