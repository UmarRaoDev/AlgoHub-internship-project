// middleware/validate.js
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Extract Zod errors into a clean format
    const errors = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // Replace req.body with the sanitized and validated data
  req.body = result.data;
  next();
};

module.exports = { validate };