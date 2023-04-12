import express from 'express';
import {
    getAll,
    toggleArchivatedPlan,
    editPlan,
    filterPlan,
} from '../controllers/plan.js';

const router = express.Router();

router.get('/all', getAll);
router.put('/archive', toggleArchivatedPlan);
router.put('/edit', editPlan);
router.post('/filter', filterPlan);

export default router;
