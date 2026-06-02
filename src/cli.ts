#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { SKILLS, getSourceLabel } from './skills';

const REPO_IDENTIFIERS = [
  'ViniHDSouza/skill-java',
  'skill-java',
];

function isOurRepo(arg: string): boolean {
  const normalized = arg.replace(/^https?:\/\/github\.com\//, '');
  return REPO_IDENTIFIERS.some(
    (id) => normalized === id || normalized === `github:${id}`
  );
}

function passthroughToSmithery(): void {
  const args = process.argv.slice(2);
  const result = spawnSync(
    'npx',
    ['--yes', '@smithery/cli', 'skills', ...args],
    { stdio: 'inherit', shell: true }
  );
  process.exit(result.status ?? 1);
}

async function runInteractive(): Promise<void> {
  const { default: inquirer } = await import('inquirer');

  console.log('');
  console.log('\x1b[1m\x1b[36m=== skill-java — Instalador de Skills ===\x1b[0m');
  console.log('');
  console.log('Selecione as skills que deseja instalar (espaco para marcar/desmarcar):');
  console.log('');

  const { selected } = await inquirer.prompt<{ selected: string[] }>([
    {
      type: 'checkbox',
      name: 'selected',
      message: 'Skills disponiveis',
      pageSize: 15,
      choices: SKILLS.map((skill) => ({
        name: `${skill.displayName}  (${getSourceLabel(skill)})`,
        value: skill.name,
        short: skill.displayName,
      })),
    },
  ]);

  if (selected.length === 0) {
    console.log('\n\x1b[33mNenhuma skill selecionada. Abortando.\x1b[0m\n');
    process.exit(0);
  }

  const chosen = SKILLS.filter((s) => selected.includes(s.name));

  console.log('');
  console.log(`\x1b[1mSkills selecionadas (${chosen.length}):\x1b[0m`);
  for (const skill of chosen) {
    console.log(`  - \x1b[36m${skill.displayName}\x1b[0m  (${getSourceLabel(skill)})`);
  }

  const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Confirmar instalacao?',
      default: true,
    },
  ]);

  if (!confirm) {
    console.log('\n\x1b[33mInstalacao cancelada.\x1b[0m\n');
    process.exit(0);
  }

  let ok = 0;
  let fail = 0;
  const failedNames: string[] = [];

  for (let i = 0; i < chosen.length; i++) {
    const skill = chosen[i];
    const label = `[${i + 1}/${chosen.length}]`;
    process.stdout.write(`\n${label} Instalando \x1b[36m${skill.displayName}\x1b[0m... `);

    const result = spawnSync(
      'npx',
      ['--yes', '@smithery/cli', 'skills', 'add', skill.source, '--yes'],
      { stdio: 'pipe', shell: true, encoding: 'utf-8' }
    );

    if (result.status === 0) {
      console.log('\x1b[32mOK\x1b[0m');
      ok++;
    } else {
      console.log('\x1b[31mFALHOU\x1b[0m');
      if (result.stderr) {
        console.log(`  \x1b[31m${result.stderr.trim().split('\n').slice(-2).join('\n')}\x1b[0m`);
      }
      fail++;
      failedNames.push(skill.displayName);
    }
  }

  console.log('');
  console.log('\x1b[1m\x1b[36m=== Resumo ===\x1b[0m');
  console.log(`  \x1b[32mSucesso: ${ok}\x1b[0m`);
  if (fail > 0) {
    console.log(`  \x1b[31mFalhas:  ${fail}\x1b[0m`);
    for (const fn of failedNames) {
      console.log(`    \x1b[31m- ${fn}\x1b[0m`);
    }
  }
  console.log('');
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  const shouldIntercept =
    args[0] === 'add' && args.length >= 2 && isOurRepo(args[1]);

  if (shouldIntercept) {
    await runInteractive();
  } else {
    passthroughToSmithery();
  }
}

main().catch((err) => {
  console.error('\x1b[31mErro inesperado:\x1b[0m', err);
  process.exit(1);
});
