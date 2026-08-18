import { Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../../build/routes";

const router = Router()
router.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import("../../build/swagger.json"))
    );
});
RegisterRoutes(router);

export default router