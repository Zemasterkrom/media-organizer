
                            Media Organizer
Objectifs de l’application :

- on peut ajouter les médias qu'on veut : des fichiers
  textes, des PDF, des musiques, des vidéos, des liens vers des vidéos YouTube/ Dailymotion.
- Si on ajoute un lien vers une vidéo YouTube/Dailymotion, l'appli trouve automatiquement
  l'iframe pour l'intégrer lors de l'affichage dans l'application.
- Si on ajoute un format qui n'a jamais été détecté auparavant, alors une catégorie est créée,
  genre Musique / Texte / PDF / YouTube / Dailymotion, sinon c'est ajouté à la liste des
  catégories.
- Sur l'accueil, si des catégories sont présentes et qu'on clique sur une, alors on voit la liste
  des items ajoutés.
- Si on clique sur un item, on peut le jouer (lire une musique/vidéo), sinon on affiche le texte.
- Evidemment, si on ajoute un item, on peut le supprimer

Organisation du dépôt Git :
- Un seul dépôt qui contient un dossier back et un dossier front
- Un README à la racine du dépôt pour expliquer comment cloner/installer les deux
  projets (y compris les étapes de base, on suppose que l’utilisateur ne sait presque
  rien de ce qu’il faut faire)
- Gestion des branches :
- Main : on merge uniquement dessus lorsque c’est fonctionnel (front ou back)
- front : on merge front_development lorsque le front est opérationnel
- front_development : développement du front
- back : on merge back_development le back est opérationnel
- back_development : développement du back

Conception du front :
- Une page d’accueil
- Bouton “Ajouter un média”
- Redirection vers une page
- A voir : sur la page ⇒ ajouter des boutons pour les différents types
  (PDF, texte, musique, vidéo) OU ajouter une combobox qui change le
  formulaire en fonction du type de données sélectionné
- Bouton de validation ou d’annulation
- Boutons pour chaque catégorie ⇒ seulement si au moins un item ajouté dans
  la catégorie
- Si on clique dessus ⇒ affichage de la liste des items



Conception du back :
- Types concrets :
- PDF, Word, Excel, txt
- Texte ( = note)
- Musique
- Vidéo
- Vidéo en ligne (YouTube/Dailymotion)
- Correspondance des attributs :
- label : nom de la ressource
- type : type de la ressource
- Links : YouTube/Dailymotion
- Documents : PDF/Word/Excel/Musique/Vidéo
- path : chemin dans le projet du back vers la ressource stockée/envoyée par
  le client
- date : date d’ajout de la ressource
- Structure des collections :
- Link { _id, name, type, url, date}
- Document { _id , name, type, path,
- date }
- Note { _id , name, content, date}
- Swagger
- Routes :
- link/add (POST)
- link/update/:id (PUT)
- link/delete/:id (DELETE)
- document/add (POST)
- document/update/:id (PUT)
- document/delete/:id (DELETE)
- note/add (POST)
- note/update/:id (PUT)
- note/delete/:id (DELETE)
- link/all (GET)
- link/findById/:id (GET)
- document/all (GET)
- document/findById/:id (GET)
- note/all (GET)
- note/findById/:id (GET)

#commande docker
docker pull mongo:latest
docker run -d -p 27017:27017 --name tadaweb mongo:latest
