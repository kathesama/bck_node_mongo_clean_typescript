import { Router } from 'express';
// import express from 'express';
import { AdapterRoute } from '../adapters/express.adapter';
import { makeTestFactorie } from '../factories/test.factorie';

const router: Router = Router();

router.get('/', AdapterRoute(makeTestFactorie()));

export { router as testRoutes };
