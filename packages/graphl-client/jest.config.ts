import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { defaults } from 'ts-jest/presets'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: compilerOptions.baseUrl,
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: { ...defaults.transform },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}

export default config
