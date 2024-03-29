import chalk from 'chalk'
import fs from 'fs'

const msgPath = process.env.GIT_PARAMS
const msg = fs
  .readFileSync(msgPath, 'utf-8')
  .trim()

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|test|workflow|build|ci|pes|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      'invalid commit message format.'
    )}\n\n` +
      chalk.red(
        '  Proper commit message format is required for automated changelog generation. Examples:\n\n'
      ) +
      `    ${chalk.green('feat(compiler): add \'comments\' option')}\n` +
      `    ${chalk.green(
        'fix(v-model): handle events on blur (close #28)'
      )}\n\n` +
      chalk.red('  See .github/commit-convention.md for more details.\n')
  )
  process.exit(1)
}
