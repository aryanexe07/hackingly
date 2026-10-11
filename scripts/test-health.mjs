const routes = [
  '/',
  '/dashboard',
  '/courses',
  '/students',
  '/community',
  '/analytics',
  '/settings',
  '/help',
  '/login'
];

async function checkRoutes() {
  console.log('Testing Sutra application routes on http://localhost:3000 ...\n');
  let allPassed = true;

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        console.log(`[PASS] ${route.padEnd(16)} -> HTTP ${res.status} OK`);
      } else {
        console.error(`[FAIL] ${route.padEnd(16)} -> HTTP ${res.status}`);
        allPassed = false;
      }
    } catch (err) {
      console.error(`[ERR]  ${route.padEnd(16)} -> ${err.message}`);
      allPassed = false;
    }
  }

  console.log('\n----------------------------------------');
  if (allPassed) {
    console.log('ALL ROUTES PASSED (100% HEALTHY)');
    process.exit(0);
  } else {
    console.log('SOME ROUTES ENCOUNTERED ISSUES');
    process.exit(1);
  }
}

checkRoutes();
