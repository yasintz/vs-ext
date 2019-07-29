import template from './template';

export default async data => {
  await template(data).run();
};
