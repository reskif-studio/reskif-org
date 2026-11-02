# reskif.org

Site de l'association Reskif : accueil en scène 3D (« sphère ») et page **Impact Studio**.

- HTML/CSS/JS statique, sans build : tout est dans `public/`. Hébergé sur Cloudflare Pages (`reskif-org`), en ligne à chaque push sur `main`.
- Accueil : code repris de la maquette de Julien, [vjuju/design@2df7fba](https://github.com/vjuju/design/tree/main/sphere) (three.js 0.132 via jsDelivr, modèle `public/models/`). Ne réécrivez pas la scène : modifiez le texte des panneaux et les styles en tête du fichier.
- Design system : [reskif-commons](https://github.com/reskif-studio/reskif-commons) (`brand/reskif.css`, `brand/pictos/`, `brand/sphere/`). Plan dans `content/design.md`, à relire avant toute refonte.
- Contenu d'origine : page Notion « Reskif — le réseau de kif » (`content/notion.md`).

## Pages
| URL | Fichier |
|---|---|
| `/` | `public/index.html` (scène 3D, panneaux, branches feu/air/eau/terre) |
| `/studio/` | `public/studio/index.html` (styles : `public/css/reskif.css`, `public/css/pictos.css`) |
| 404 | `public/404.html` |

## Crédits
Sphère : Organic Sphere de Bruno Simon (MIT) · particules : The Spirit d'Edan Kwan (MIT, `public/LICENSE-The-Spirit.md`) · buste : Lee Perry-Smith par Infinite-Realities (CC BY 3.0, `public/models/LeePerrySmith-LICENSE.txt`) · arbre d'après Marius Ballot.
