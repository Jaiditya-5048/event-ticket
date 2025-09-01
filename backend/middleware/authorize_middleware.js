const authorize =
  (allowedRoles = []) =>
    (req, res, next) => {
      console.log('allowedRoles', allowedRoles)
      const { role } = req.user;
      console.log('role', role)
      if (!allowedRoles.includes(role)) {
        return res
          .status(403)
          .json({ error: 'Access denied: insufficient permissions' });
      }
      next();
    };

export default authorize;