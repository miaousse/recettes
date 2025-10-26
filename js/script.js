const listContainer = document.getElementById("recipe-list");
const contentContainer = document.getElementById("recipe-content");

// Charger la liste des fichiers Markdown via PHP
async function loadRecipeList() {
  try {
    let response = await fetch('php/list_recipes.php');
    let files = await response.json();
    if (files.length === 0) {
      listContainer.innerHTML = "<p>Aucune recette trouvée.</p>";
      return;
    }
    listContainer.innerHTML = '';
    files.forEach(file => {
      const name = file.replace(/_/g, ' ').replace('.md', '');
      const btn = document.createElement("button");
      btn.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      btn.onclick = () => loadRecipe("recettes/" + file);
      listContainer.appendChild(btn);
    });
  } catch (e) {
    listContainer.innerHTML = "<p>Erreur lors du chargement des recettes.</p>";
  }
}

// Fonction pour charger un fichier Markdown et l'afficher en HTML
async function loadRecipe(url) {
  contentContainer.innerHTML = "<p>Chargement...</p>";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fichier non trouvé");
    const mdText = await response.text();
    contentContainer.innerHTML = marked.parse(mdText);
  } catch (e) {
    contentContainer.innerHTML = "<p>Erreur lors du chargement : " + e.message + "</p>";
  }
}

// Code thème clair / pimp
const themeLink = document.getElementById("theme-style");
const toggleThemeBtn = document.getElementById("toggle-theme");

toggleThemeBtn.addEventListener("click", () => {
  if (themeLink.getAttribute("href") === "css/style-clear.css") {
    themeLink.href = "css/style-pimp.css";
    toggleThemeBtn.textContent = "Passer au thème Clair";
  } else {
    themeLink.href = "css/style-clear.css";
    toggleThemeBtn.textContent = "Passer au thème Funky !";
  }
});

loadRecipeList();
