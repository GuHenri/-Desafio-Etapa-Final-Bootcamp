import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = ["dist/index.html", "dist/styles.css", "dist/app.js"];
for (const file of requiredFiles) await access(file, constants.R_OK);

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");
const js = await readFile("dist/app.js", "utf8");

const checks = [
  [html.includes('lang="pt-BR"'), "idioma pt-BR"],
  [html.includes("<main"), "elemento main"],
  [html.includes("skip-link"), "atalho de acessibilidade"],
  [html.includes('id="projetos"'), "seção de projetos"],
  [html.includes('id="seguranca"'), "seção de segurança"],
  [html.includes("Content-Security-Policy"), "política CSP"],
  [css.includes("prefers-reduced-motion"), "respeito a movimento reduzido"],
  [js.includes("api.github.com/users/GuHenri/repos"), "integração GitHub"],
];

const failures = checks.filter(([ok]) => !ok).map(([, label]) => label);
if (failures.length) {
  console.error(`Falhas: ${failures.join(", ")}`);
  process.exit(1);
}

console.log(`${checks.length} verificações concluídas com sucesso.`);

