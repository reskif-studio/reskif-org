# Plan de design reskif.org — système « sphère »

Source : la maquette de Julien, `vjuju/design@2df7fba` (sphere/), reprise telle quelle pour l'accueil.
Communs : `reskif-commons` (brand/reskif.css, brand/sphere/, brand/pictos/). Skill : frontend-design (Anthropic).

## Brief
- Accueil = la maquette sphère, sans réécriture : trois panneaux plein écran sur une scène 3D (sphère organique → plongée → arbre), puis quatre branches (feu, air, eau, terre) pour quatre profils.
- Ajouts limités : lien « L'Impact Studio » discret en haut à gauche, une action par branche (mailto ou /studio/).
- /studio/ et 404 : pages défilantes dans le même univers, sans 3D (légèreté, lisibilité).

## Couleurs
| Nom | Valeur | Rôle |
|---|---|---|
| Nuit | #010101 | fond unique, partout |
| Encre | #ffffff | titres, texte fort |
| Brume | rgba(255,255,255,.62) | texte courant, légendes |
| Trait | rgba(255,255,255,.22) | filets, bordures |
| Chaud | #ffb08a | financer, conseiller (feu, eau) |
| Froid | #9cc0ff | éclairer, porter (air, terre) |
Verre : rgba(10,4,24,.55) + flou 10 px pour les panneaux posés sur la scène.

## Typo
- **Syne** 800, capitales, interlignage .9-.95 : titres. 500, capitales espacées .14-.16em : navigation, boutons, surtitres.
- **Fraunces** italique 300 : tout le texte courant et les accroches (voix chaleureuse, manuscrite).
- **EB Garamond** + petites capitales : définitions façon dictionnaire (« Reskif, n. f. »).

## Layout /studio/
```
[logo]                                    ACCUEIL  STUDIO  CONTACT
              (lueur chaud/froid, très floue)
                 L'IMPACT STUDIO
         Studio, n. m. — contraction de ...       (dictionnaire)
         accroche Fraunces italique, centrée
             (Proposer un projet) (Le deal)
───────────────────────────────────────────────────────────────
POUR QUI            | texte italique
UN MOIS AU STUDIO   | 1 Découverte  2 Lancement  3 Construction  4 Sortie
LE DEAL             | 1 000 € PAR PROJET. ON NE GARDE RIEN.
JEAN-CLAUDE         | verbes en Syne, compléments en Fraunces
QUATRE PROFILS      | 4 panneaux de verre avec les pictos animés (feu/air/eau/terre)
LES PROJETS         | lignes : nom (Syne) | résumé (Fraunces) | lien
```
Hero centré (comme la sphère), le reste aligné à gauche en deux colonnes titre | contenu.

## Principes
- Un seul univers, la nuit ; la couleur ne sert qu'à dire un rôle (chaud / froid), jamais à décorer.
- Le moment fort de l'accueil, c'est la scène 3D ; sur /studio/, les définitions de dictionnaire et les pictos des éléments.
- Mouvement : les pictos et la lueur seulement, coupés avec prefers-reduced-motion.
- Vouvoiement, comme la maquette.
