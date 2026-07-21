import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const staticExportDirectory = resolve(projectRoot, 'out');
const deploymentDirectory = resolve(projectRoot, 'dist');
const clientDirectory = resolve(deploymentDirectory, 'client');
const serverDirectory = resolve(deploymentDirectory, 'server');

await rm(deploymentDirectory, { force: true, recursive: true });
await mkdir(serverDirectory, { recursive: true });
await cp(staticExportDirectory, clientDirectory, { recursive: true });

const staticSiteWorker = `export default {
  async fetch(request, environment) {
    return environment.ASSETS.fetch(request);
  },
};
`;

await writeFile(resolve(serverDirectory, 'index.js'), staticSiteWorker, 'utf8');
