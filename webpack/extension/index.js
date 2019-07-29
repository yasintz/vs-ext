import extension from './extension';

export default async d => {
    console.log('calisti');
    await extension(d).run();
};
