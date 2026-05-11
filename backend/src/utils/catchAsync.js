/**
 * Wrap async functions to catch errors and pass them to next()
 */
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export default catchAsync;
