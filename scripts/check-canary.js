const execSync = require('child_process').execSync
const semver = require('semver')
const packageName = '@imbios/datepicker'

const getLastStableVersionDate = () => {
  // Get all versions including time to find the latest stable release date
  const output = execSync(`npm view ${packageName} time --json`)
  const times = JSON.parse(output)

  // Ignore pre-releases and sort by semver to get the latest version
  const stableVersions = Object.keys(times).filter(
    version => semver.valid(version) && !semver.prerelease(version)
  )
  const latestStableVersion = stableVersions.sort(semver.rcompare)[0]

  return new Date(times[latestStableVersion])
}

const hasCanaryReleaseSinceLastStable = () => {
  const lastStableVersionDate = getLastStableVersionDate()

  // Get all versions
  const allVersions = execSync(`npm view ${packageName} versions --json`)
  const versions = JSON.parse(allVersions)

  // Check if there is a canary version newer than the last stable version
  return versions.some(version => {
    const isCanary = version.includes('canary')
    if (!isCanary) return false

    const versionDate = new Date(
      JSON.parse(execSync(`npm view ${packageName} time --json`))[`${version}`]
    )
    return versionDate > lastStableVersionDate
  })
}

console.log(hasCanaryReleaseSinceLastStable() ? 'true' : 'false')
