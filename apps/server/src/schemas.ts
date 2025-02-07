import { z } from 'zod';

const GET_VALENTINE_PARAMS_SCHEMA = z.object({
  id: z.string().length(12).nanoid(),
});

type GET_VALENTINE_PARAMS_TYPE = z.infer<typeof GET_VALENTINE_PARAMS_SCHEMA>;

const CREATE_VALENTINE_SCHEMA = z
  .object({
    id: z
      .string({
        invalid_type_error: 'Indenifier should be string',
        required_error: 'Please provide id',
      })
      .length(12, 'Identifier should be 12 characters long')
      .nanoid('Provide valid nanoid'),
    text: z
      .string({
        invalid_type_error: 'Text should be string',
        required_error: 'Please provide text',
      })
      .nonempty('Please enter text')
      .max(50, 'Text cannot be longer than 50 characters'),
    to: z
      .string({
        invalid_type_error: 'To whom this valentine is meant should be string',
        required_error: 'Please provide to whom this valentine is meant',
      })
      .nonempty('Please enter to whom this valentine is meant')
      .max(
        25,
        'To whom this valentine is meant cannot be longer than 25 characters',
      ),
    from: z
      .string({
        invalid_type_error: 'From whom valentine is sent should be string',
        required_error: 'Please provide from whom valentine is sent',
      })
      .nonempty('Please enter from whom valentine is sent')
      .max(
        25,
        'From whom valentine is sent cannot be longer than 25 characters',
      ),
    template: z.enum(['template-1']),
  })
  .strict('Only id, text, to, from and template fields are accepted');

type CREATE_VALENTINE_TYPE = z.infer<typeof CREATE_VALENTINE_SCHEMA>;

export {
  GET_VALENTINE_PARAMS_SCHEMA,
  type GET_VALENTINE_PARAMS_TYPE,
  CREATE_VALENTINE_SCHEMA,
  type CREATE_VALENTINE_TYPE,
};
