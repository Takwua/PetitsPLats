// Import des recettes depuis recipes.js
import recettes from './recipes.js';

const ingredientsSelectionnes = []; // Liste pour stocker les ingrédients sélectionnés
const appareilSelectionnes = []; // Liste pour stocker les appareils sélectionnés
const ustensileSelectionnes = []; // Liste pour stocker les ustensiles sélectionnés

// Fonction pour obtenir tous les ingrédients uniques des recettes
const tousLesIngredients = recettes.reduce((ingredients, recette) => {
    recette.ingredients.forEach(ingredient => {
        if (!ingredients.some(i => i.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase())) {
            ingredients.push({
                ingredient: ingredient.ingredient.toLowerCase(),
            });
        }
    });
    return ingredients;
}, []);

// Fonction pour obtenir tous les appareils uniques des recettes
const tousLesAppareils = recettes.reduce((appareils, recette) => {
    if (!appareils.includes(recette.appliance.toLowerCase())) {
        appareils.push(recette.appliance.toLowerCase());
    }
    return appareils;
}, []);

// Fonction pour obtenir tous les ustensiles uniques des recettes
const tousLesUstensiles = recettes.reduce((ustensiles, recette) => {
    recette.ustensils.forEach(ustensile => {
        if (!ustensiles.includes(ustensile.toLowerCase())) {
            ustensiles.push(ustensile.toLowerCase());
        }
    });
    return ustensiles;
}, []);

// Fonction pour mettre à jour la liste déroulante des ingrédients
function mettreAJourListeIngredients(ingredients) {
    const conteneurListeDD1 = document.querySelector('.md1-list');
    conteneurListeDD1.innerHTML = '';

    ingredients.forEach(ingredient => {
        const pElement = document.createElement('p');
        pElement.textContent = ingredient.ingredient;
        pElement.dataset.ingredient = ingredient.ingredient; // Ajouter un attribut data pour faciliter la sélection
        pElement.addEventListener('click', function () {
            toggleIngredient(this);
        });

        // Ajouter la classe .ingredient-selectionne si l'ingrédient est sélectionné comme filtre
        if (ingredientsSelectionnes.includes(ingredient.ingredient)) {
            pElement.classList.add('ingredient-selectionne');
        }

        conteneurListeDD1.appendChild(pElement);
    });
}

// Fonction pour mettre à jour la liste déroulante des appareils
function mettreAJourListeAppareils(appareils) {
    const conteneurListeDD2 = document.querySelector('.md2-list');
    conteneurListeDD2.innerHTML = '';

    appareils.forEach(appareil => {
        const pElement = document.createElement('p');
        pElement.textContent = appareil;
        pElement.dataset.appareil = appareil; // Ajouter un attribut data pour faciliter la sélection
        pElement.addEventListener('click', function () {
            toggleAppareil(this);
        });

        // Ajouter la classe .appareil-selectionne si l'appareil est sélectionné comme filtre
        if (appareilSelectionnes.includes(appareil)) {
            pElement.classList.add('appareil-selectionne');
        }

        conteneurListeDD2.appendChild(pElement);
    });
}

// Fonction pour mettre à jour la liste déroulante des ustensiles
function mettreAJourListeUstensiles(ustensiles) {
    const conteneurListeDD3 = document.querySelector('.md3-list');
    conteneurListeDD3.innerHTML = '';

    ustensiles.forEach(ustensile => {
        const pElement = document.createElement('p');
        pElement.textContent = ustensile;
        pElement.dataset.ustensile = ustensile; // Ajouter un attribut data pour faciliter la sélection
        pElement.addEventListener('click', function () {
            toggleUstensile(this);
        });

        // Ajouter la classe .ustensile-selectionne si l'ustensile est sélectionné comme filtre
        if (ustensileSelectionnes.includes(ustensile)) {
            pElement.classList.add('ustensile-selectionne');
        }

        conteneurListeDD3.appendChild(pElement);
    });
}

// Fonction pour mettre à jour la liste des filtres sélectionnés
function mettreAJourFiltresSelectionnes() {
    const filtresSelectionnes = document.querySelector('.filtres-selectionnes');
    filtresSelectionnes.innerHTML = '';

    ingredientsSelectionnes.forEach(ingredient => {
        const divElement = document.createElement('div');
        divElement.classList.add('item-selectionne');

        const pElement = document.createElement('p');
        pElement.textContent = ingredient;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'x'; // Texte du bouton pour fermer
        closeButton.addEventListener('click', function () {
            deselectIngredient(ingredient);
        });

        divElement.appendChild(pElement);
        divElement.appendChild(closeButton);
        filtresSelectionnes.appendChild(divElement);
    });

    appareilSelectionnes.forEach(appareil => {
        const divElement = document.createElement('div');
        divElement.classList.add('item-selectionne');

        const pElement = document.createElement('p');
        pElement.textContent = appareil;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.addEventListener('click', function () {
            deselectAppareil(appareil);
        });

        divElement.appendChild(pElement);
        divElement.appendChild(closeButton);
        filtresSelectionnes.appendChild(divElement);
    });

    ustensileSelectionnes.forEach(ustensile => {
        const divElement = document.createElement('div');
        divElement.classList.add('item-selectionne');

        const pElement = document.createElement('p');
        pElement.textContent = ustensile;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'x';
        closeButton.addEventListener('click', function () {
            deselectUstensile(ustensile);
        });

        divElement.appendChild(pElement);
        divElement.appendChild(closeButton);
        filtresSelectionnes.appendChild(divElement);
    });

    // Filtrer et afficher les recettes en fonction des filtres sélectionnés
    filtrerRecettesParIngredientsAppareilsUstensiles();
}

// Fonction pour filtrer les recettes en fonction des filtres sélectionnés
function filtrerRecettesParIngredientsAppareilsUstensiles() {
    const recettesFiltrees = recettes.filter(recette => {
        const contientIngredients = ingredientsSelectionnes.every(ingredient => {
            return recette.ingredients.some(item => item.ingredient.toLowerCase() === ingredient.toLowerCase());
        });
        const contientAppareil = appareilSelectionnes.length === 0 || appareilSelectionnes.includes(recette.appliance.toLowerCase());
        const contientUstensiles = ustensileSelectionnes.every(ustensile => {
            return recette.ustensils.includes(ustensile.toLowerCase());
        });

        return contientIngredients && contientAppareil && contientUstensiles;
    });

    afficherRecettes(recettesFiltrees);
    afficherNombreRecettes(recettesFiltrees); // Ajouter cette ligne pour mettre à jour le nombre de recettes
}

// Fonction pour afficher le nombre de recettes
function afficherNombreRecettes(recettes) {
    const nombreRecettesElement = document.getElementById('number-recipes');
    nombreRecettesElement.textContent = `${recettes.length} recette(s)`;
}

// Fonction pour créer une carte de recette à partir d'un objet recette
function creerCarteRecette(recette) {
    const article = document.createElement('article');
    article.classList.add('card');

    const imageCarte = document.createElement('img');
    imageCarte.src = './images/Recettes/' + recette.image;
    imageCarte.alt = recette.name;
    imageCarte.classList.add('card-image');
    article.appendChild(imageCarte);

    const tempsRecette = document.createElement('div');
    tempsRecette.classList.add('recipe-time');
    tempsRecette.textContent = ` ${recette.time} minutes`;
    article.appendChild(tempsRecette);

    const corpsCarte = document.createElement('div');
    corpsCarte.classList.add('card-body');

    const titreCarte = document.createElement('h2');
    titreCarte.textContent = recette.name;
    titreCarte.classList.add('card-title');
    corpsCarte.appendChild(titreCarte);

    const sousTitreRecette = document.createElement('h3');
    sousTitreRecette.textContent = 'Recette';
    sousTitreRecette.classList.add('recipe-subtitle');
    corpsCarte.appendChild(sousTitreRecette);

    const descriptionCarte = document.createElement('p');
    descriptionCarte.textContent = recette.description;
    descriptionCarte.classList.add('card-description');
    corpsCarte.appendChild(descriptionCarte);

    const sousTitreIngredients = document.createElement('h3');
    sousTitreIngredients.textContent = 'Ingrédients';
    sousTitreIngredients.classList.add('recipe-subtitle');
    corpsCarte.appendChild(sousTitreIngredients);

    const listeIngredients = document.createElement('ul');
    listeIngredients.classList.add('ingredient-list');

    recette.ingredients.forEach(ingredient => {
        const itemIngredient = document.createElement('li');
        let textIngredient = `${ingredient.ingredient}`;
        if (ingredient.quantity !== undefined) {
            textIngredient += `<br><span class="ingredient-quantity">${ingredient.quantity}`;
            if (ingredient.unit !== undefined) {
                textIngredient += ` ${ingredient.unit}`;
            }
            textIngredient += `</span>`;
        }
        itemIngredient.innerHTML = textIngredient;
        listeIngredients.appendChild(itemIngredient);
    });

    corpsCarte.appendChild(listeIngredients);
    article.appendChild(corpsCarte);

    return article;
}

// Fonction pour afficher toutes les recettes dans le conteneur des cartes
function afficherRecettes(recettes) {
    const conteneurCartes = document.getElementById('cards-container');
    conteneurCartes.innerHTML = '';

    recettes.forEach(recette => {
        const carteRecette = creerCarteRecette(recette);
        conteneurCartes.appendChild(carteRecette);
    });
}

// Fonction pour gérer la sélection ou la désélection d'un ingrédient
function toggleIngredient(element) {
    const ingredient = element.textContent.trim();

    if (ingredientsSelectionnes.includes(ingredient)) {
        deselectIngredient(ingredient);
    } else {
        selectIngredient(element);
    }
}

// Fonction pour gérer la sélection ou la désélection d'un appareil
function toggleAppareil(element) {
    const appareil = element.textContent.trim();

    if (appareilSelectionnes.includes(appareil)) {
        deselectAppareil(appareil);
    } else {
        selectAppareil(element);
    }
}

// Fonction pour gérer la sélection ou la désélection d'un ustensile
function toggleUstensile(element) {
    const ustensile = element.textContent.trim();

    if (ustensileSelectionnes.includes(ustensile)) {
        deselectUstensile(ustensile);
    } else {
        selectUstensile(element);
    }
}

// Fonction pour gérer la sélection d'un ingrédient
function selectIngredient(element) {
    const ingredient = element.textContent.trim();

    // Sélectionner l'ingrédient actuel
    element.classList.add('ingredient-selectionne');

    // Ajouter l'ingrédient à la liste des ingrédients sélectionnés (uniquement s'il n'est pas déjà sélectionné)
    if (!ingredientsSelectionnes.includes(ingredient)) {
        ingredientsSelectionnes.push(ingredient);
        mettreAJourFiltresSelectionnes();
    }
}

// Fonction pour gérer la sélection d'un appareil
function selectAppareil(element) {
    const appareil = element.textContent.trim();

    // Sélectionner l'appareil actuel
    element.classList.add('appareil-selectionne');

    // Ajouter l'appareil à la liste des appareils sélectionnés (uniquement s'il n'est pas déjà sélectionné)
    if (!appareilSelectionnes.includes(appareil)) {
        appareilSelectionnes.push(appareil);
        mettreAJourFiltresSelectionnes();
    }
}

// Fonction pour gérer la sélection d'un ustensile
function selectUstensile(element) {
    const ustensile = element.textContent.trim();

    // Sélectionner l'ustensile actuel
    element.classList.add('ustensile-selectionne');

    // Ajouter l'ustensile à la liste des ustensiles sélectionnés (uniquement s'il n'est pas déjà sélectionné)
    if (!ustensileSelectionnes.includes(ustensile)) {
        ustensileSelectionnes.push(ustensile);
        mettreAJourFiltresSelectionnes();
    }
}

// Fonction pour désélectionner un ingrédient
function deselectIngredient(ingredient) {
    const index = ingredientsSelectionnes.indexOf(ingredient);
    if (index > -1) {
        ingredientsSelectionnes.splice(index, 1);
        mettreAJourFiltresSelectionnes();
    }

    // Retirer la sélection visuelle de l'élément
    const element = document.querySelector(`.md1-list [data-ingredient="${ingredient}"]`);
    if (element) {
        element.classList.remove('ingredient-selectionne');
    }
}

// Fonction pour désélectionner un appareil
function deselectAppareil(appareil) {
    const index = appareilSelectionnes.indexOf(appareil);
    if (index > -1) {
        appareilSelectionnes.splice(index, 1);
        mettreAJourFiltresSelectionnes();
    }

    // Retirer la sélection visuelle de l'élément
    const element = document.querySelector(`.md2-list [data-appareil="${appareil}"]`);
    if (element) {
        element.classList.remove('appareil-selectionne');
    }
}

// Fonction pour désélectionner un ustensile
function deselectUstensile(ustensile) {
    const index = ustensileSelectionnes.indexOf(ustensile);
    if (index > -1) {
        ustensileSelectionnes.splice(index, 1);
        mettreAJourFiltresSelectionnes();
    }

    // Retirer la sélection visuelle de l'élément
    const element = document.querySelector(`.md3-list [data-ustensile="${ustensile}"]`);
    if (element) {
        element.classList.remove('ustensile-selectionne');
    }
}

// Écouteur d'événement pour exécuter le code lorsque le document est entièrement chargé
document.addEventListener('DOMContentLoaded', () => {
    const conteneurCartes = document.getElementById('cards-container');
    const nombreRecettesElement = document.getElementById('number-recipes');

    // Afficher le nombre initial de recettes
    afficherNombreRecettes(recettes);

    // Afficher toutes les recettes initialement
    afficherRecettes(recettes);

    // Toggle du menu déroulant 1 pour afficher les ingrédients
    const menuDeroulant1 = document.querySelector('.menu-deroulant1');
    const partieVisible1 = menuDeroulant1.querySelector('.md1-partie-visible');
    partieVisible1.addEventListener('click', function () {
        menuDeroulant1.classList.toggle('open');
        if (menuDeroulant1.classList.contains('open')) {
            mettreAJourListeIngredients(tousLesIngredients);
        }
    });

    // Ajouter l'écouteur d'événement pour la barre de recherche des ingrédients
    const md1Input = document.getElementById('md1-input');
    md1Input.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredIngredients = tousLesIngredients.filter(ingredient => ingredient.ingredient.includes(query));
        mettreAJourListeIngredients(filteredIngredients);
    });

    // Écouteur d'événement pour fermer la recherche
    const fermerRecherche = document.getElementById('fermer-la-recherche');
    fermerRecherche.addEventListener('click', function () {
        md1Input.value = ''; // Réinitialiser la valeur de recherche
        mettreAJourListeIngredients(tousLesIngredients); // Réafficher tous les ingrédients
    });

    // Toggle du menu déroulant 2 pour afficher les appareils
    const menuDeroulant2 = document.querySelector('.menu-deroulant2');
    const partieVisible2 = menuDeroulant2.querySelector('.md2-partie-visible');
    partieVisible2.addEventListener('click', function () {
        menuDeroulant2.classList.toggle('open');
        if (menuDeroulant2.classList.contains('open')) {
            mettreAJourListeAppareils(tousLesAppareils);
        }
    });

    // Ajouter l'écouteur d'événement pour la barre de recherche des appareils
    const md2Input = document.getElementById('md2-input');
    md2Input.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredAppareils = tousLesAppareils.filter(appareil => appareil.includes(query));
        mettreAJourListeAppareils(filteredAppareils);
    });

    // Toggle du menu déroulant 3 pour afficher les ustensiles
    const menuDeroulant3 = document.querySelector('.menu-deroulant3');
    const partieVisible3 = menuDeroulant3.querySelector('.md3-partie-visible');
    partieVisible3.addEventListener('click', function () {
        menuDeroulant3.classList.toggle('open');
        if (menuDeroulant3.classList.contains('open')) {
            mettreAJourListeUstensiles(tousLesUstensiles);
        }
    });

    // Ajouter l'écouteur d'événement pour la barre de recherche des ustensiles
    const md3Input = document.getElementById('md3-input');
    md3Input.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredUstensiles = tousLesUstensiles.filter(ustensile => ustensile.includes(query));
        mettreAJourListeUstensiles(filteredUstensiles);
    });
});


// Fonction de recherche principale
function rechercheGlobale(requete) {
    // Convertir la requête en minuscules et retirer les espaces inutiles aux extrémités
    const requeteMinuscule = requete.toLowerCase().trim();

    // Vérifier si la requête contient au moins 3 caractères
    if (requeteMinuscule.length < 3) {
        // Si la requête est trop courte, afficher toutes les recettes
        afficherRecettes(recettes);
        afficherNombreRecettes(recettes);
        return;
    }

    // Tableau pour stocker les recettes filtrées
    const recettesFiltrees = [];

    // Boucle sur chaque recette
    for (let recetteIndex = 0; recetteIndex < recettes.length; recetteIndex++) {
        const recette = recettes[recetteIndex];

        // Vérifier si la recette correspond à la requête dans le titre, la description, les ingrédients, l'appareil ou les ustensiles
        const correspondTitre = recette.name.toLowerCase().includes(requeteMinuscule);
        const correspondDescription = recette.description.toLowerCase().includes(requeteMinuscule);
        const correspondIngredients = recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(requeteMinuscule));
        const correspondAppareil = recette.appliance.toLowerCase().includes(requeteMinuscule);
        const correspondUstensiles = recette.ustensils.some(ustensile => ustensile.toLowerCase().includes(requeteMinuscule));

        // Si la recette correspond à la requête
        if (correspondTitre || correspondDescription || correspondIngredients || correspondAppareil || correspondUstensiles) {
            // Vérifier les critères de sélection supplémentaires
            let tousIngredientsCorrespondent = true;
            let tousAppareilsCorrespondent = true;
            let tousUstensilesCorrespondent = true;

            // Filtrer en fonction des ingrédients sélectionnés
            for (let ingredients = 0; ingredients < ingredientsSelectionnes.length; ingredients++) {
                const ingredientSelectionne = ingredientsSelectionnes[ingredients].toLowerCase();
                const ingredientPresent = recette.ingredients.some(item => item.ingredient.toLowerCase() === ingredientSelectionne);
                if (!ingredientPresent) {
                    tousIngredientsCorrespondent = false;
                    break;
                }
            }

            // Filtrer en fonction des appareils sélectionnés
            for (let appareils = 0; appareils < appareilSelectionnes.length; appareils++) {
                const appareilSelectionne = appareilSelectionnes[appareils].toLowerCase();
                if (!recette.appliance.toLowerCase().includes(appareilSelectionne)) {
                    tousAppareilsCorrespondent = false;
                    break;
                }
            }

            // Filtrer en fonction des ustensiles sélectionnés
            for (let ustensiles = 0; ustensiles < ustensileSelectionnes.length; ustensiles++) {
                const ustensileSelectionne = ustensileSelectionnes[ustensiles].toLowerCase();
                if (!recette.ustensils.includes(ustensileSelectionne)) {
                    tousUstensilesCorrespondent = false;
                    break;
                }
            }

            // Ajouter la recette aux résultats filtrés si elle satisfait tous les critères
            if (tousIngredientsCorrespondent && tousAppareilsCorrespondent && tousUstensilesCorrespondent) {
                recettesFiltrees.push(recette);
            }
        }
    }

    // Afficher les résultats
    afficherRecettes(recettesFiltrees);
    afficherNombreRecettes(recettesFiltrees);
}



document.addEventListener('DOMContentLoaded', () => {
    const zoneDeRecherche = document.getElementById('zone-de-recherche');

    zoneDeRecherche.addEventListener('input', function () {
        // Convertir la valeur de la zone de recherche en minuscules pour la recherche
        const requeteMinuscule = this.value.toLowerCase(); // Conserver les espaces mais convertir en minuscules

        // Mettre à jour la valeur de la zone de recherche avec la chaîne convertie en minuscules
        this.value = requeteMinuscule;

        // Appeler la fonction de recherche avec la requête convertie en minuscules
        rechercheGlobale(requeteMinuscule);
    });

    // Initialiser la recherche globale avec une chaîne vide pour appliquer les filtres dès le chargement
    rechercheGlobale('');
});




