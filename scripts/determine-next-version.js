const execSync = require('child_process').execSync
const semver = require('semver')
const packageName = '@imbios/datepicker'

const getNextVersion = () => {
  const output = execSync(`npm view ${packageName} versions --json`)
  let versions = JSON.parse(output)

  // Filter out pre-releases like canary builds
  versions = versions.filter(version => !version.includes('-canary'))

  // Assuming the latest version is the highest one according to semver
  const latestVersion = versions.sort(semver.rcompare)[0]

  // Increment the patch version by default
  return semver.inc(latestVersion, 'patch')
}

const nextVersion = getNextVersion()
console.log(nextVersion)
