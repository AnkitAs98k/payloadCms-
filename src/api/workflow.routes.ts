console.log("Workflow endpoints registered")

import type { PayloadRequest } from "payload";
import { startWorkflow } from "../workflow/workflowLogic";

export const workflowEndpoints = [
  {
    path: "/workflows/trigger",
    method: "post" as const,
    handler: async (req: PayloadRequest) => {
      try {
        const body = req.json ? await req.json() : {};
        const { collection, docId } = body as {
          collection: string;
          docId: string;
        };

        if (!collection || !docId) {
          return Response.json(
            { message: "collection and docId required" },
            { status: 400 }
          );
        }

        await startWorkflow({
          payload: req.payload,
          collection,
          docId,
        });

        return Response.json({
          message: "Workflow triggered successfully",
        });
      } catch (error) {
        console.error(error);
        return Response.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    },
  },

  {
    path: "/workflows/status/:docId",
    method: "get" as const,
    handler: async (req: PayloadRequest) => {
      try {
      const docId = (req as any).routeParams?.docId

        if (!docId) {
          return Response.json(
            { message: "docId missing" },
            { status: 400 }
          );
        }

        const logs = await req.payload.find({
          collection: "workflowLogs",
          where: {
            documentId: {
              equals: docId,
            },
          },
        });

        return Response.json({
          workflowLogs: logs.docs,
        });
      } catch (error) {
        console.error(error);
        return Response.json(
          { error: "Failed to fetch workflow status" },
          { status: 500 }
        );
      }
    },
  },
];





/*import { Request, Response } from "express"
import { startWorkflow } from "../workflow/workflowLogic"

export const workflowEndpoints = [
  
  {
    path: "/workflows/trigger",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const { collection, docId } = req.body as {
        collection: string
        docId: string
      }

      await startWorkflow({
        payload: (req as any).payload, 
        collection,
        docId,
      })

      return res.json({
        message: "Workflow triggered successfully",
      })
    },
  },

  {
    path: "/workflows/status/:docId",
    method: "get",
    handler: async (req: Request, res: Response) => {
      const docId = (req as any).params.docId

      const logs = await (req as any).payload.find({
        collection: "workflowLogs",
        where: {
          documentId: {
            equals: docId,
          },
        },
      })

      return res.json({
        workflowLogs: logs.docs,
      })
    },
  },
]

*/