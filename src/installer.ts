import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as io from '@actions/io';
import getOS from './get-os';
import getURL from './get-url';

export default async function installer(version: string) {
  try {
    const extended: string = core.getInput('extended');
    console.log(`Hugo extended: ${extended}`);

    const osName: string = getOS(process.platform);
    console.log(`Operating System: ${osName}`);

    const hugoURL: string = getURL(osName, extended, version);
    core.debug(`hugoURL: ${hugoURL}`);

    const hugoPath: string = `${process.env.HOME}/bin`;
    await io.mkdirP(hugoPath);
    core.addPath(hugoPath);

    // Download and extract Hugo binary
    const hugoAssets: string = await tc.downloadTool(hugoURL);
    let hugoBin: string = '';
    if (osName === 'Windows') {
      const hugoExtractedFolder: string = await tc.extractZip(
        hugoAssets,
        '/tmp'
      );
      hugoBin = `${hugoExtractedFolder}/hugo.exe`;
    } else {
      const hugoExtractedFolder: string = await tc.extractTar(
        hugoAssets,
        '/tmp'
      );
      hugoBin = `${hugoExtractedFolder}/hugo`;
    }
    await io.mv(hugoBin, hugoPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}