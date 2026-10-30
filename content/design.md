# Plan de design reskif.org (skill frontend-design, anthropics/skills@41bbe19)

## Brief
- Sujet : Reskif, association et réseau de kif ; sa première brique, l'Impact Studio.
- Public : porteur·ses de projets (assos, side-projects, étudiant·es), financeurs, expert·es. Militant, jeune, français.
- Job principal : comprendre en 30 s ce qu'est Reskif et le Studio, puis écrire pour rejoindre, proposer un projet ou financer.
- Contraintes : communs Reskif (logo 28 px, Rubik, effet riso), couleurs demandées par Julien : jaune, cyan, magenta.

## Couleurs (les encres d'une risographe)
| Nom | Hex | Rôle |
|---|---|---|
| Jaune | #ffcc00 | papier du hero d'accueil, parcours du Studio |
| Cyan | #00aaff | section Studio, Jean-Claude, encre d'impression |
| Magenta | #ff00e5 | encre d'impression, le deal, financeurs |
| Encre | #042e4d | tout le texte, filets, boutons |
| Blanc | #ffffff | sections calmes |
Règles : texte toujours en encre (jamais de texte courant blanc sur magenta : contraste insuffisant). Une section = une encre.

## Typo
Rubik seule (communs). Titres 900, interlignage serré 0,95-1,02, approche -0,03em ; texte 400 à 1,0625-1,25 rem, lignes < 70 caractères ; intertitres 700. Pas de capitales pour les étiquettes, pas de mot accentué en couleur dans un titre.

## Layout
```
[logo] Le Studio  Contribuer  Projets                 (Proposer un projet)
JAUNE ───────────────────────────────────────────────────────────────
  Mettre le virtuel               ┌──────────────────┐
  au service du vivant.           │ photo riso        │  2 passages
  intro (2-3 lignes)              │ magenta + cyan    │  décalés
  (Découvrir le Studio) (…)       └──────────────────┘
BLANC   phrase-manifeste grande | texte
CYAN    L'Impact Studio : 2 colonnes séparées par un filet, le modèle en une phrase
BLANC   Contribuer : 3 lignes, chacune marquée par une barre d'encre (M / C / J)
BLANC   Projets : lignes nom | résumé | lien du site
```
Alignement à gauche partout. Filets encre 1 px pour structurer, pas de cartes identiques.

## Principes
- Le moment fort unique : la photo du hero imprimée en deux passages (magenta puis cyan en multiply, trames à 45° et 15°) avec un léger défaut de calage qui se résorbe au chargement. Le reste est calme.
- La structure dit quelque chose : barres d'encre = profils ; numéros seulement pour les étapes du mois (vraie séquence).
- Mouvement : seulement le calage du hero, désactivé si `prefers-reduced-motion`.

## Revue contre les défauts génériques
- Supprimé : étiquettes en capitales au-dessus des titres, séparateurs « · », flèches dans les boutons, grilles de cartes arrondies identiques, gros chiffres + petit libellé pour le modèle (remplacés par une phrase).
- Gardé volontairement (brief) : boutons pilule encre, header blanc translucide, Rubik.
