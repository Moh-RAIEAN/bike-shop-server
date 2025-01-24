import { Schema } from 'mongoose';

const setDefaultSchemaOptions = <GSchema, GMethods>(
  schema: Schema<GSchema, GMethods>,
): void => {
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
