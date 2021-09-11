// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function anonymouslyLogin(req, res) {
  res.status(200).json({
    session: {
      sessionCreated: Date.now(),
      user: {
        name: 'anonymous',
      },
    },
  });
}
