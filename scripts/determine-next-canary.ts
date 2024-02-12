import { execSync } from 'child_process'
import semver from 'semver'
import { packageName } from './_shared'

const getNextCanary = () => {
  const output = execSync(`npm view ${packageName} versions --json`).toString(
    'utf8'
  )
  let versions = JSON.parse(output) as string[] | string
  if (!Array.isArray(versions)) {
    versions = [versions]
  }
  const canaryVersions = versions.filter(version => version.includes('-canary'))

  const lastStableVersion = versions.sort(semver.rcompare)[0]
  const latestCanary = canaryVersions.sort(semver.rcompare)[0]

  const isShouldStartNewCanary = semver.gt(lastStableVersion, latestCanary)

  // Increment the patch version by default
  const nextCanaryVersion = isShouldStartNewCanary
    ? semver.inc(lastStableVersion, 'prerelease', 'canary')
    : semver.inc(lastStableVersion, 'patch')
  return nextCanaryVersion
}

const nextCanary = getNextCanary()
console.log(nextCanary)
