# Plan de design reskif.org (skill frontend-design, anthropics/skills@41bbe19)

## Brief
- Sujet : Reskif, association et réseau de kif ; sa première brique, l'Impact Studio.
- Public : porteur·ses de projets (assos, side-projects, étudiant·es), financeurs, expert·es. Militant, jeune, français.
- Job principal : comprendre en 30 s ce qu'est Reskif et le Studio, puis écrire pour rejoindre, proposer un projet ou financer.
- Contraintes : communs Reskif (logo 28 px, Rubik, effet riso), couleurs demandées par Julien : jaune, cyan, magenta.

## Couleurs (les encres d'une risographe)
- Jaune #ffcc00, cyan #00aaff, magenta #ff00e5 : uniquement comme **encres d'impression** des photos riso (deux passages superposés en multiply sur papier blanc), et magenta pour les « vi » du titre.
- Encre #042e4d : tout le texte, filets, boutons.
- Blanc #ffffff : papier, sections calmes, voile de lecture.
Règle (Julien, 30/10/2026) : **jamais d'aplat de couleur en fond**. Un fond = blanc, ou une photo tramée en riso léger (points de 3,5 px, contraste bas) sous un voile blanc pour le texte.

## Typo
Rubik seule (communs). Titres 900, interlignage serré 0,95-1,02, approche -0,03em ; texte 400 à 1,0625-1,25 rem, lignes < 70 caractères ; intertitres 700. Pas de capitales pour les étiquettes, pas de mot accentué en couleur dans un titre.

## Layout
```
[logo] Le Studio  Contribuer  Projets                 (Proposer un projet)
FOUGÈRE riso jaune+cyan, toute la fenêtre
            le Vi rtuel
        au ser vi ce          les trois « vi » sur une même verticale
            du vi vant
RISO forêt (magenta+cyan)   Un réseau de kif + texte, voile blanc à gauche
RISO table (jaune+magenta)  L'Impact Studio, voile blanc plein
RISO parc (cyan+magenta)    Contribuer, voile blanc plein
BLANC                       Projets
```
Alignement à gauche partout, sauf le titre d'ouverture (centré, aligné sur la colonne des « vi »). Retour à la ligne après les phrases importantes.

## Principes
- Le moment fort unique : l'ouverture plein écran, la fougère imprimée en jaune + cyan (le vert naît de la superposition des encres) et le titre dont les « vi » de virtuel, service et vivant s'empilent en magenta.
- La structure dit quelque chose : barres d'encre = profils ; numéros seulement pour les étapes du mois (vraie séquence).
- Mouvement : aucun.

## Revue contre les défauts génériques
- Supprimé : étiquettes en capitales au-dessus des titres, séparateurs « · », flèches dans les boutons, grilles de cartes arrondies identiques, gros chiffres + petit libellé pour le modèle (remplacés par une phrase).
- Gardé volontairement (brief) : boutons pilule encre, header blanc translucide, Rubik.
