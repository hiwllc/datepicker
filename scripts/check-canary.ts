import { execSync } from 'child_process'
import semver from 'semver'
import { packageName } from './_constant'

/**
 * {
  "created": "2023-09-26T03:18:40.196Z",
  "1.0.0": "2023-09-26T03:18:40.511Z",
  "modified": "2023-09-26T03:18:40.789Z"
}
 */
type NpmViewTimeOutput = {
  [version: string]: string
  created: string
  modified: string
}

const getLastStableVersionDate = () => {
  // Get all versions including time to find the latest stable release date
  const output = execSync(`npm view ${packageName} time --json`).toString()
  const times = JSON.parse(output) as NpmViewTimeOutput

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
  const allVersions = execSync(
    `npm view ${packageName} versions --json`
  ).toString()
  const versions = JSON.parse(allVersions) as string[] | string

  // Check if there is a canary version newer than the last stable version
  return Array.isArray(versions)
    ? versions.some(version => {
        const isCanary = version.includes('canary')
        if (!isCanary) return false

        const versionDate = new Date(
          (
            JSON.parse(
              execSync(`npm view ${packageName} time --json`).toString()
            ) as NpmViewTimeOutput
          )[`${version}`]
        )
        return versionDate > lastStableVersionDate
      })
    : false
}

console.log(hasCanaryReleaseSinceLastStable() ? 'true' : 'false')
