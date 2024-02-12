import { execSync } from 'child_process'
import semver from 'semver'
import { packageName } from './_constant'

const getDefaultLastTag = () => {
  const output = execSync(`npm view ${packageName} versions --json`).toString()
  let versions = JSON.parse(output) as string[] | string
  if (!Array.isArray(versions)) {
    versions = [versions]
  }

  // Filter out pre-releases like canary builds
  versions = versions.filter(version => !version.includes('-canary'))

  // Assuming the latest version is the highest one according to semver
  const latestVersion = versions.sort(semver.rcompare)[0]

  return latestVersion
}

const nextVersion = getDefaultLastTag()
console.log(nextVersion)
