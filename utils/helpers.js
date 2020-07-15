exports.extract = (string, limit) => {
    const newString = [];
    if (string.length > limit) {
        string.split(' ').reduce((acc, curr) => {
            if (acc + curr.length < limit) {
                newString.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newString.join(' ')} ...`;
    }

    return string;
}