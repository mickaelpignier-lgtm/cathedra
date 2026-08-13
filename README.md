# Cathedra

Guide de tourisme des stades de football mythiques, multilingue (FR/EN/IT/ZH). L'esprit du site : le "CityMapper des stades" — pour chaque stade, on répond d'abord à "comment j'y vais et quand", avant les infos billetterie/boutique/musée.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **next-intl** pour l'i18n (routes `/fr`, `/en`, `/it`, `/zh`, redirection automatique de `/`)
- Contenu des stades en **JSON structuré**, un fichier par stade et par langue (`src/content/stadiums/<slug>/<locale>.json`) — facile à étendre, pas de base de données requise
- **next/image** pour l'optimisation des photos (AVIF/WebP générés à la volée, lazy loading, `sizes` responsive)
- Sitemap + robots.txt générés automatiquement, avec `hreflang` correct sur toutes les pages

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — la redirection vers `/fr` (langue par défaut) est automatique.

## Direction artistique

Charte reprise d'un handoff de design dédié (dossier `design_handoff_cathedra`, non versionné) :

- **Couleurs** : fond sombre `#0B0B0C`, sections claires `#F2EFE9`, accent unique `#2E5BFF` exposé en variable CSS `--acc` (`src/app/globals.css`). Un seul token à changer pour retheme tout le site.
- **Typographies** : **Anton** pour les titres (majuscules, interlignage serré), **IBM Plex Sans** pour le texte courant, **IBM Plex Mono** pour les labels/données (majuscules, tracking large). Chargées via `next/font/google` dans `src/app/[locale]/layout.tsx`. Le chinois retombe sur la police système CJK (pas de police CJK auto-hébergée, pour ne pas alourdir le bundle des autres langues).
- **Rayon 0 partout**, sauf le sélecteur de langue et les puces de la carte (cercles).
- **Interactions** : `src/components/Reveal.tsx` (apparition au scroll via IntersectionObserver), `Marquee.tsx` (bandeau défilant), `ParallaxImage.tsx` (parallaxe des heros) — toutes respectent `prefers-reduced-motion`.
- La fiche stade utilise une sous-navigation collante (`StadiumSubNav`) sous le header fixe ; le calcul `-mt-[99px]` du hero fait passer l'image sous header (56px) + sous-nav (~43px), à ajuster ensemble si l'un des deux change de hauteur.

## Structure du projet

```
src/
  app/
    [locale]/                 # toutes les pages, wrappées par next-intl
      layout.tsx               # <html lang>, NextIntlClientProvider, Header/Footer, hreflang
      page.tsx                 # accueil : hero, stades à la une, carte, "comment ça marche"
      stades/page.tsx          # liste + filtres (pays, championnat, recherche)
      stades/[slug]/page.tsx   # fiche détaillée d'un stade
      not-found.tsx
    sitemap.ts                 # sitemap.xml multilingue avec alternates hreflang
    robots.ts
  components/                  # StadiumCard, StadiumHero, TravelSection, LocationSection, FeaturedGrid,
                                # StadiumSubNav, LanguageSwitcher, Reveal, Marquee, ParallaxImage, ...
  content/stadiums/<slug>/     # 1 fichier JSON par stade et par langue (fr.json, en.json, it.json, zh.json)
  i18n/                        # routing.ts (locales), navigation.ts, request.ts
  lib/
    stadiums.ts                # lecture/typage du contenu JSON
    format.ts                  # formatage prix/nombres localisés, drapeaux, projection carte
  proxy.ts                     # proxy/middleware next-intl (résolution de locale) — convention Next 16
messages/                      # chaînes d'interface fr.json / en.json / it.json / zh.json
```

## Ajouter un nouveau stade

1. Créer `src/content/stadiums/<slug>/fr.json` (et `en.json`, `it.json`, `zh.json`) sur le modèle des 3 fiches existantes (Camp Nou, Old Trafford, Santiago Bernabéu).
2. Chaque fichier contient : nom, club, ville, pays, coordonnées GPS, capacité, comment y aller (aéroport, transports), meilleur moment pour visiter, billets (visite guidée + match), ce qu'il y a à voir, boutique officielle, galerie photo, conseil insider.
3. Si une traduction manque pour une langue, le site retombe automatiquement sur le français (`defaultLocale`).
4. Aucune autre étape : les pages liste/détail/sitemap se régénèrent automatiquement (le slug est découvert dynamiquement depuis le système de fichiers).

## Variables d'environnement

| Variable | Requis | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommandé | URL canonique du site (ex. `https://cathedra.vercel.app` ou domaine custom), utilisée pour les balises `hreflang`, Open Graph et le sitemap. Sans elle, `https://cathedra.vercel.app` est utilisé par défaut. |

Aucune clé API n'est requise pour le fonctionnement de base. La section "carte du monde" de l'accueil est une visualisation stylisée maison (projection des coordonnées GPS en CSS/SVG, sans dépendance externe) — si vous voulez une vraie carte interactive (Mapbox, Google Maps, MapLibre), il suffit de remplacer `src/components/WorldMapPreview.tsx` et d'ajouter la clé correspondante (ex. `NEXT_PUBLIC_MAPBOX_TOKEN`) dans les variables d'environnement Vercel.

## Images

- **Camp Nou, Old Trafford, Santiago Bernabéu, San Siro** utilisent de vraies photos (Wikimedia Commons, licence CC BY / CC BY-SA), auto-hébergées dans `public/images/stadiums/<slug>/` (redimensionnées à 2400px max). Voir [PHOTO_CREDITS.md](./PHOTO_CREDITS.md) pour l'attribution obligatoire de chaque photo.
- Les **22 autres stades** utilisent [Lorem Picsum](https://picsum.photos) comme placeholder — à remplacer par de vraies photos avant mise en production, en suivant le même modèle (télécharger + `scripts/update-photo-paths.ts` en exemple).
- Le domaine `picsum.photos` est autorisé dans `next.config.ts` (`images.remotePatterns`) pour les placeholders ; les photos auto-hébergées n'ont besoin d'aucune configuration supplémentaire.
- ⚠️ Ne pas référencer directement des URL `upload.wikimedia.org` en `remotePatterns` : Wikimedia limite (429) les requêtes du serveur d'optimisation d'images de Next.js faute de User-Agent reconnu. Toujours télécharger et auto-héberger.

## Déploiement sur Vercel

1. Pousser le repo sur GitHub/GitLab/Bitbucket.
2. Sur [vercel.com/new](https://vercel.com/new), importer le repo — Next.js est détecté automatiquement, aucune configuration build nécessaire.
3. Renseigner `NEXT_PUBLIC_SITE_URL` dans les Environment Variables du projet Vercel (ex. `https://cathedra.vercel.app` pour commencer, puis votre domaine custom une fois branché).
4. Déployer. Le site est servi sur `<nom-du-projet>.vercel.app`.
5. Pour un domaine custom : Project Settings → Domains, ajouter `votre-domaine.com`, suivre les instructions DNS, puis mettre à jour `NEXT_PUBLIC_SITE_URL` avec le nouveau domaine et redéployer (pour que sitemap/hreflang/OG pointent au bon endroit).

En local, la CLI Vercel fonctionne aussi directement :

```bash
vercel        # déploiement preview
vercel --prod # déploiement production
```

## Qualité

```bash
npm run lint    # ESLint (Next.js + a11y)
npm run build   # build de production, génère toutes les pages statiques (SSG) par locale
```

Toutes les routes stades/langues sont pré-rendues statiquement (`generateStaticParams`) : 4 langues × (accueil + liste + 3 fiches stades) = 20 pages HTML statiques, servies depuis le CDN Vercel.
