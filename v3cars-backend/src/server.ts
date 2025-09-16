
import 'dotenv/config';   
import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './lib/prisma.js';

const server = app.listen(env.PORT, () => {
  console.log(`API running on :${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  // stop taking new requests
  await new Promise<void>((resolve) => server.close(() => resolve()));
  try {
    await prisma.$disconnect();
  } finally {
    process.exit(0);
  }
}

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach((sig) => {
  process.on(sig as NodeJS.Signals, () => void shutdown(sig));
});

// (optional) catch crashes so we still disconnect
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection', err);
  void shutdown('unhandledRejection');
});
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  void shutdown('uncaughtException');
});




