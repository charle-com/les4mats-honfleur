# Checklist Finale - Avant Mise en Ligne

## P0 - Obligatoire

- [ ] **Remplacer [BASE_URL]** dans tous les fichiers :
  - `index.html` (canonical, OpenGraph, Twitter, Schema.org, footer)
  - `menu.html` (canonical, OpenGraph, Twitter, footer)
  - `contact.html` (canonical, OpenGraph, Twitter, footer)
  - `robots.txt` (Sitemap)
  - `sitemap.xml` (toutes les URLs)
  
  Exemple : `https://charlesneveu.github.io/les4mats-honfleur`

- [ ] **Remplacer les placeholders Schema.org** dans `index.html` :
  - `[SERVES_CUISINE]` → ex: "Brasserie", "Cuisine française", "Fruits de mer"
  - `[PRICE_RANGE]` → ex: "€€", "€€-€€€", "Modéré"

## P1 - Recommandé

- [ ] **Vérifier le lien Google Maps** :
  - Le lien actuel (`https://share.google/Yf8FlhNAl2ptDzRtz`) semble être un lien de partage
  - Remplacer par un lien Google Maps standard si nécessaire
  - Format attendu : `https://www.google.com/maps/place/...`

- [ ] **Ajouter des images réelles** si disponibles :
  - Remplacer les placeholders de la galerie dans `index.html`
  - Utiliser le dossier `assets/img/` si vous ajoutez des images
  - Ajouter les attributs `alt` descriptifs
  - Optimiser les images (WebP si possible, compression)

- [ ] **Vérifier les liens Instagram** :
  - Tester que le lien Instagram fonctionne
  - Vérifier que le compte est public

## P2 - Optionnel mais recommandé

- [ ] **Ajouter un favicon** :
  - Créer `favicon.ico` et `apple-touch-icon.png`
  - Ajouter les balises dans le `<head>`

- [ ] **Optimiser les performances** :
  - Vérifier le chargement des polices Google Fonts
  - Tester avec PageSpeed Insights
  - Lazy loading des images (déjà en place)

- [ ] **Tester sur différents navigateurs** :
  - Chrome/Edge
  - Firefox
  - Safari
  - Mobile (iOS/Android)

- [ ] **Vérifier l'accessibilité** :
  - Contraste des couleurs
  - Navigation au clavier
  - Screen readers

- [ ] **Tester les liens** :
  - Tous les liens internes
  - Liens externes (Instagram, Google Maps)
  - Boutons de réservation (tel:)

## Notes

- Les placeholders d'images sont fonctionnels et propres
- Le style premium minimaliste est appliqué
- Le responsive mobile est optimisé
- Les séparateurs entre sections sont discrets
- Les CTA "Réserver" sont répétés aux endroits stratégiques

