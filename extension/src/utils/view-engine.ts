const searchKey = (key: string) => {
    const seperators = [`#${key}#`, `#${key} #`, `# ${key}#`, `# ${key} #`];

    return seperators;
};

export default (data: Record<string, any>, html: string) => {
    const commentIndex: number[] = [];
    let newHtml = html;
    Object.keys(data).forEach(key => {
        searchKey(key).forEach(seperator => {
            if (Array.isArray(data[key])) {
                newHtml = newHtml.replace(new RegExp(data[key][0](seperator), 'g'), data[key][1]);
            } else {
                newHtml = newHtml.replace(
                    new RegExp(seperator, 'g'),
                    (regexp: string, index: number, content: string) => {
                        const beforeChar = content.substring(index - 1, index);
                        if (beforeChar === '$') {
                            commentIndex.push(index - 1);

                            return regexp;
                        }

                        return data[key];
                    },
                );
            }
        });
    });
    commentIndex.sort().forEach((val, idx) => {
        newHtml = `${newHtml.slice(0, val - idx)}${newHtml.slice(val - idx + 1)}`;
    });

    return newHtml;
};
