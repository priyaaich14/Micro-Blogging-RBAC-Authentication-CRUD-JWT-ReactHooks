import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.header('Authorization');
  
//   if (!authHeader) {
//     return res.status(401).json({ error: 'Access denied, no token provided' });
//   }

//   const token = authHeader.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ error: 'Access denied, no token provided' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };

// export default authMiddleware;


const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log(`Authorization Header: ${authHeader}`); // Log the authorization header

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log(`Token extracted: ${token}`); // Log the extracted token

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Decoded token: ${JSON.stringify(decoded)}`); // Log the decoded token
    req.user = decoded;
    next();
  } catch (error) {
    console.error(`Token verification error: ${error.message}`); // Log the error
    res.status(400).json({ error: 'Invalid token' });
  }
};
export default authMiddleware;