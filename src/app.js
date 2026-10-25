const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "light"));
  localStorage.setItem("portfolio-theme", theme);
}

setTheme(initialTheme);
themeButton.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));
document.querySelector("#year").textContent = new Date().getFullYear();

const projectGrid = document.querySelector("#project-grid");
const repoCount = document.querySelector("#repo-count");

function escapeHtml(value = "") {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]);
}

function renderProject(repo) {
  const description = repo.description || "Projeto público disponível para consulta no GitHub.";
  const updated = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(repo.updated_at));
  return `
    <article class="project-card">
      <div class="project-meta">
        <span class="project-language">${escapeHtml(repo.language || "Código")}</span>
        <span>Atualizado ${updated}</span>
      </div>
      <h3>${escapeHtml(repo.name.replaceAll("-", " "))}</h3>
      <p>${escapeHtml(description)}</p>
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${escapeHtml(repo.name)} no GitHub">Ver repositório</a>
    </article>`;
}

async function loadRepositories() {
  try {
    const response = await fetch("https://api.github.com/users/GuHenri/repos?sort=updated&per_page=100", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
    const repositories = await response.json();
    const publicProjects = repositories.filter((repo) => !repo.fork && !repo.archived);
    repoCount.textContent = String(publicProjects.length).padStart(2, "0");
    const featured = publicProjects.slice(0, 6);
    if (!featured.length) throw new Error("Nenhum repositório público encontrado");
    projectGrid.innerHTML = featured.map(renderProject).join("");
  } catch (error) {
    repoCount.textContent = "01";
    projectGrid.innerHTML = renderProject({
      name: "PortfolioHUB",
      description: "Portfólio responsivo integrado ao GitHub, com automação de testes, documentação e práticas de segurança.",
      language: "JavaScript",
      updated_at: new Date().toISOString(),
      html_url: "https://github.com/GuHenri/-Desafio-Etapa-Final-Bootcamp",
    });
    console.info("A listagem dinâmica não foi carregada; exibindo o projeto principal.", error);
  } finally {
    projectGrid.setAttribute("aria-busy", "false");
  }
}

loadRepositories();

