import { exec } from 'child_process';
import path from 'path';

const runSeeder = (file) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve(`./seed/${file}`);
    const child = exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error running ${file}:`, error.message);
        return reject(error);
      }
      if (stderr) {
        console.error(`⚠️ STDERR from ${file}:\n${stderr}`);
      }
      console.log(`✅ Output from ${file}:\n${stdout}`);
      resolve();
    });

    // Stream output live (optional)
    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
  });
};

const runAllSeeders = async () => {
  try {
    console.log('\n🚀 Starting full DB seeding...\n');

    await runSeeder('usersSeeder.js');
    await runSeeder('venueSeeder.js');
    await runSeeder('categorySeeder.js');
    await runSeeder('artistSeeder.js');
    await runSeeder('eventSeeder.js');
    await runSeeder('eventInstanceSeeder.js');
    await runSeeder('eventInstanceArtistSeeder.js');
    await runSeeder('ticketTypeSeeder.js;');

    console.log('\n🌱 All seeders executed successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Seeding process failed\n');
    process.exit(1);
  }
};

runAllSeeders();
