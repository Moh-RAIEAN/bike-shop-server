import { Schema } from 'mongoose';

const setDefaultSchemaOptions = (schema: Schema): void => {
  schema.set('toJSON', {
    transform: function (_doc, ret) {
      ret.__v = undefined;
    },
  });

  schema.set('toObject', {
    transform: function (_doc, ret) {
      ret.__v = undefined;
    },
  });
};

export default setDefaultSchemaOptions;
