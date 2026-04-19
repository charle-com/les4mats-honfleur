# Les 4 Mâts

Site one-page bilingue (FR / EN) du restaurant **Les 4 Mâts**, table marine à Honfleur. HTML / CSS / JS statique, design éditorial, SEO local optimisé.

**En ligne :** https://charle-com.github.io/les4mats-honfleur/

## Pages

- `/` (FR) : one-page complète · hero, le lieu, la carte, l'équipage, le carnet, réserver, contact
- `/en/` : version anglaise de la one-page
- `/mentions-legales.html` · `/en/legal.html`
- `/confidentialite.html` · `/en/privacy.html`

Les anciens HTML `menu.html`, `equipe.html`, `contact.html` ont été retirés : leur contenu vit désormais en sections ancrées de l'index pour concentrer le link juice et éviter le duplicate content.

## Structure

```
.
├── index.html                  FR · one-page
├── mentions-legales.html       FR
├── confidentialite.html        FR
├── en/
│   ├── index.html              EN · one-page
│   ├── legal.html              EN
│   └── privacy.html            EN
├── assets/
│   ├── css/style.css           Design system + responsive
│   ├── js/main.js              Burger menu, reveal scroll, CTA dynamique bilingue
│   ├── *.jpeg / *.webp         Photos du restaurant (façade, équipe, plats, salle)
│   ├── logo.webp · logo.jpg    Favicon
│   └── Menu_4_mats.pdf         Carte complète (téléchargeable)
├── sitemap.xml                 Bilingue avec xhtml:link alternate
└── robots.txt
```

## Design

- **Typographie** : [Fraunces](https://fonts.google.com/specimen/Fraunces) (display, variable, italique WONK) et [Satoshi](https://www.fontshare.com/fonts/satoshi) (body)
- **Palette** : crème chaude, brume, terracotta (coques de bateau), nuit marine
- **Détails** : grain papier en overlay, numérotation éditoriale (N° 01 à 06), waveform animée dans le marquee
- **Photos** : Charles Neveu (charlesneveu.fr)

## SEO

- **Schema.org Restaurant** JSON-LD complet (adresse, géo, horaires, cuisine, menu PDF)
- **Hreflang** bidirectionnel FR/EN + x-default sur toutes les pages
- **Sitemap** enrichi avec `xhtml:link rel="alternate"` par URL
- **Canonical** par langue
- **Twitter Card** + Open Graph
- **h1 unique** par page
- **Preload** image hero, preconnect Google Fonts / Fontshare
- **noscript fallback** pour que le contenu reste visible sans JavaScript
- **Cible FR** : `restaurant honfleur` (14 800 recherches/mois, KD 0.1) + longue traîne
- **Cible EN** : `restaurant honfleur`, `honfleur restaurants` (840+ recherches/mois UK + US)

## Fonctionnalités

- **One-page scroll** avec smooth-scroll et offset de header
- **Burger menu** overlay plein écran en mobile avec liens + contact + language switcher
- **CTA « Réserver » dynamique** : affiche `ce midi`, `ce soir`, `pour demain`, `pour mardi` (si dimanche tard), `cette semaine` (si lundi fermé) selon l'heure, en français et en anglais
- **Responsive** breakpoints 1200 / 960 / 640 / 380px
- **`prefers-reduced-motion`** respecté

## Contact restaurant

- 4 rue de la Ville, 14600 Honfleur
- 02 31 81 61 91
- Ouvert du mardi au dimanche, fermé le lundi
- Déjeuner 12h à 14h30, dîner 19h à 23h

## Développement

Le site est statique, aucune dépendance à installer. Pour prévisualiser :

```bash
# Prévisualisation rapide
open index.html

# Ou avec un serveur local (recommandé pour tester le JS bilingue)
python3 -m http.server 8000
# puis http://localhost:8000/
```

## Déploiement

Hébergé sur **GitHub Pages**. Chaque push sur `main` déploie automatiquement. Pour activer Pages à la main :

1. Settings · Pages
2. Source : `main` / `/ (root)`
3. URL : `https://charle-com.github.io/les4mats-honfleur/`

## Licence

Site et contenu © Les 4 Mâts · Design et développement [Charles Neveu](https://charlesneveu.fr).
