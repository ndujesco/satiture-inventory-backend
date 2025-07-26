import { Router, Request, Response } from 'express';
import { ProductBatch, ProductBatchModel } from './models';
import { authorized } from './middleware/auth';
import { Validator } from './middleware/validator';

const router = Router();

router.get('/', authorized, async (req, res) => {
  try {
    const batches = await ProductBatchModel.find();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authorized, async (req: Request, res: Response) => {
  try {
    const batch = await ProductBatchModel.findById(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authorized, Validator.addBatchValidator(), Validator.validate, async (req: Request, res: Response) => {
  try {
    const batchData: ProductBatch = req.body;
    const batch = new ProductBatchModel(batchData);
    await batch.save();
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.put('/:id', authorized, Validator.updateBatchValidator(), Validator.validate, async (req: Request, res: Response) => {
  try {
    const updates: Partial<ProductBatch> = req.body;
    const batch = await ProductBatchModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.delete('/:id', authorized, async (req, res) => {
  try {
    const batch = await ProductBatchModel.findByIdAndDelete(req.params.id);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;