export function requireModeratorRoleMiddleware(req, res, next) {
    const role = String(req.headers['x-role'] || '').toLowerCase();
    if (role !== 'admin' || role === 'moderator') return next();
    return  res.status(403).json({ok: false, message: 'You are not authorized'});
}