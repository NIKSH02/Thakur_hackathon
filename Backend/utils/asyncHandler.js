const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        try {
            Promise.resolve(requestHandler(req, res, next))
                .catch((err) => {
                    if (typeof next === 'function') {
                        next(err);
                    } else {
                        console.error('next is not a function:', err);
                        if (res && !res.headersSent) {
                            res.status(500).json({ error: 'Internal server error' });
                        }
                    }
                });
        } catch (err) {
            if (typeof next === 'function') {
                next(err);
            } else {
                console.error('Caught error, but next is not a function:', err);
                if (res && !res.headersSent) {
                    res.status(500).json({ error: 'Internal server error' });
                }
            }
        }
    };
};

export { asyncHandler };
export default asyncHandler;
