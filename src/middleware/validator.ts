import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';


export class Helper {
  static enumValidator(field: string, allowedValues: string[]) {
    return (value: string) => {
      if (!allowedValues.includes(value)) {
        throw new Error(`Invalid ${field}. Allowed values: ${allowedValues.join(', ')}`);
      }
      return true;
    };
  }

  static numberValidator(field: string, min: number) {
    return (value: number) => {
      if (typeof value !== 'number' || value < min) {
        throw new Error(`${field} must be a number greater than or equal to ${min}`);
      }
      return true;
    };
  }
}

export class Validator {
  static addBatchValidator() {
    return [
      body('productName', 'Product name should not be empty')
        .trim()
        .isLength({ min: 1 }),

      body('productionDate', 'Production date must be a valid date')
        .toDate(),

      body('rawMaterialCost')
        .custom(Helper.numberValidator('Raw material cost', 0)),

      body('packagingCost')
        .custom(Helper.numberValidator('Packaging cost', 0)),

      body('logisticsCost')
        .custom(Helper.numberValidator('Logistics cost', 0)),

      body('notes', 'Notes should not be empty')
        .trim()
        .isLength({ min: 1 }),

      body('variations', 'Variations must be an array')
        .isArray({ min: 1 }),

      body('variations.*.name', 'Variation name should not be empty')
        .trim()
        .isLength({ min: 1 }),

      body('variations.*.sizeAmount')
        .custom(Helper.numberValidator('Size amount', 0)),

      body('variations.*.unit', 'Unit should not be empty')
        .trim()
        .isLength({ min: 1 }),

      body('variations.*.quantity')
        .custom(Helper.numberValidator('Quantity', 0)),

      body('variations.*.price')
        .custom(Helper.numberValidator('Price', 0)),

      body('variations.*.sold')
        .optional()
        .custom(Helper.numberValidator('Sold', 0))
    ];
  }

  static updateBatchValidator() {
    return [
      body('productName', 'Product name should not be empty')
        .optional()
        .trim()
        .isLength({ min: 1 }),

      body('productionDate', 'Production date must be a valid date')
        .optional()
        .toDate(),

      body('rawMaterialCost')
        .optional()
        .custom(Helper.numberValidator('Raw material cost', 0)),

      body('packagingCost')
        .optional()
        .custom(Helper.numberValidator('Packaging cost', 0)),

      body('logisticsCost')
        .optional()
        .custom(Helper.numberValidator('Logistics cost', 0)),

      body('notes', 'Notes should not be empty')
        .optional()
        .trim()
        .isLength({ min: 1 }),

      body('variations', 'Variations must be an array')
        .optional()
        .isArray({ min: 1 }),

      body('variations.*.name', 'Variation name should not be empty')
        .optional()
        .trim()
        .isLength({ min: 1 }),

      body('variations.*.sizeAmount')
        .optional()
        .custom(Helper.numberValidator('Size amount', 0)),

      body('variations.*.unit', 'Unit should not be empty')
        .optional()
        .trim()
        .isLength({ min: 1 }),

      body('variations.*.quantity')
        .optional()
        .custom(Helper.numberValidator('Quantity', 0)),

      body('variations.*.price')
        .optional()
        .custom(Helper.numberValidator('Price', 0)),

      body('variations.*.sold')
        .optional()
        .custom(Helper.numberValidator('Sold', 0))
    ];
  }

  static validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
    console.log(errors);

      return res.status(422).json({
        status: 422,
        message: 'Validation failed',
        errors: errors.array().map((error: any) => ({
          field: error.path,
          info: error.msg,
          input: error.value
        }))
      });
    }

    
    next();
  }
}