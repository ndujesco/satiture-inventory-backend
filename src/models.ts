import { Schema, model } from 'mongoose';

export interface ProductVariation {
  name: string;
  sizeAmount: number;
  unit: string;
  quantity: number;
  price: number;
  sold?: number;
}

export interface ProductBatch {
  productName: string;
  productionDate: string;
  rawMaterialCost: number;
  packagingCost: number;
  logisticsCost: number;
  variations: ProductVariation[];
  notes: string;
}

const productBatchSchema = new Schema<ProductBatch>(
  {
    productName: { type: String, required: true },
    productionDate: { type: String, required: true },
    rawMaterialCost: { type: Number, required: true },
    packagingCost: { type: Number, required: true },
    logisticsCost: { type: Number, required: true },
    variations: [
      {
        name: { type: String, required: true },
        sizeAmount: { type: Number, required: true },
        unit: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        sold: { type: Number, default: 0 }
      }
    ],
    notes: { type: String, required: true }
  },
  { timestamps: true }
);

export const ProductBatchModel = model<ProductBatch>('ProductBatch', productBatchSchema);