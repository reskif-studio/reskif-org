# reskif.org

Site vitrine de l'association Reskif : page d'accueil et page **Impact Studio**.

- HTML/CSS statique, sans build : tout est dans `public/`.
- Hébergé sur **Cloudflare Pages** (projet `reskif-org`), déployé automatiquement à chaque push sur `main`.
- Identité (logo, couleurs, Rubik, effet riso) copiée depuis [reskif-commons](https://github.com/reskif-studio/reskif-commons) @4dc85c1.
- Contenu d'origine : la page Notion « Reskif — le réseau de kif » (voir `content/notion.md`).

## Pages
| URL | Fichier |
|---|---|
| `/` | `public/index.html` |
| `/studio/` | `public/studio/index.html` |
| 404 | `public/404.html` |

## Modifier
1. Éditer le HTML dans `public/` (styles communs : `public/css/site.css`).
2. Vérifier en local : `python3 -m http.server -d public 8080`.
3. Commit + push sur `main` → en ligne en ~1 min.

Photos : Unsplash (hotlink images.unsplash.com, nécessaire pour l'effet riso en CORS).
