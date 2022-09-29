const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.priginalUrl}`);
    next();
}

module.exports = logger;