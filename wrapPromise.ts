const wrapPromise = (pr: Promise<Array<Object>>) => {
    let status = "pending";
    let result: any;
    const suspender = pr
        .then((res) => {
            status = "success";
            result = res;
        })
        .catch((err) => {
            status = "error";
            result = err;
        });

    const read = () => {
        if (status === "pending") throw suspender;
        if (status === "error") throw result;
        return result;
    };

    return { read };
};
export default wrapPromise;
