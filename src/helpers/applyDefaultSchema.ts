import { Schema } from 'mongoose';

const setDefaultSchemaOptions = <GSchema, GMethods>(
  schema: Schema<GSchema, GMethods>,
): void => {
  schema.set('timestamps', true);
  schema.set('toJSON', {
    transform: function (_doc, ret) {
      ret.__v = undefined;
      delete ret.password;
    },
  });

  schema.set('toObject', {
    transform: function (_doc, ret) {
      ret.__v = undefined;
      delete ret.password;
    },
  });
};

export default setDefaultSchemaOptions;
