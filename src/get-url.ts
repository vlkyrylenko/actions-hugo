export default function getURL(
  os: string,
  arch: string,
  extended: boolean,
  withdeploy: boolean,
  version: string
): string {

  const extendedStr = (extended: boolean): string => {
    if (extended) {
      return 'extended_';
    } else {
      return '';
      // } else {
      //   throw new Error(`Invalid input (extended): ${extended}`);
    }
  };

  const deployStr = (deploy: boolean): string => {
    if (deploy) {
      return 'withdeploy_';
    } else {
      return '';
      // } else {
      //   throw new Error(`Invalid input (extended): ${extended}`);
    }
  };

  const ext = (os: string): string => {
    if (os === 'Windows') {
      return 'zip';
    } else {
      return 'tar.gz';
    }
  };

  const hugoName = `hugo_${extendedStr(extended)}${deployStr(withdeploy)}${version}_${os}-${arch}`;
  const baseURL = 'https://github.com/gohugoio/hugo/releases/download';
  const url = `${baseURL}/v${version}/${hugoName}.${ext(os)}`;

  return url;
}
