import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // includes roleAssignments
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// middleware/authMiddleware.js
export const authorize = (allowedScopeTypes = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roleAssignments) {
      return res.status(403).json({ message: 'No role assignments.' });
    }

    const isAuthorized = req.user.roleAssignments.some(assign =>
      allowedScopeTypes.includes(assign.scopeType)
    );

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Insufficient permissions.' });
    }

    next();
  };
};
