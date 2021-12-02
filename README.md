# Media Organizer
---
Organiser vos médias en quelques clics et les centraliser dans un dépôt visuel.

## Installation des composants nécessaires

Pour lancer l'application, les composants suivants sont nécessaires: 
- Node JS : https://nodejs.org/en/download/
- Docker : https://docs.docker.com/engine/install/

Pour faciliter l'installation, vous pouvez utiliser l'IDE WebStorm :
https://www.jetbrains.com/fr-fr/webstorm/

1. La première étape consiste à récupérer les fichiers du projet, pour cela, dans WebStorm, cliquez sur ``Get from VCS`` et entrez l'URL suivante : https://github.com/Zemasterkrom/media-organizer.git
(vous pouvez aussi utiliser la commande ``git clone`` et indiquer cette URL).

2. Si vous ne posséder ces dépendances, il est nécessaire de les installer Yarn pour lancer le projet correctement. Exécutez dans le terminal : 
- ``npm install -g yarn``
- ``yarn global add @angular\cli``
- ``yarn global add @nestjs\cli``

3. Si cela n'est pas déjà fait, exécutez cette commande (si vous êtes sur un terminal) : ``ng config --global cli.packageManager``.


## Installation du front

Pour installer le front, rendez-vous sur le dossier front et exécutez la commande suivante dans un terminal : ``yarn install``.

## Lancement du front

Pour lancer le front, rendez-vous sur le dossier front et exécutez la commande suivante dans un terminal : ``yarn run start:dev``. Sur WebStorm, vous pouvez simplifier la procédure en cliquant sur ``Edit configurations`` puis ``npm``. Rentrez ensuite ``run`` dans ``Command``, puis ``start:dev`` dans ``Scripts``, et sélectionnez ``yarn`` dans ``Package manager``.  Vous devez également sélectionner le package.json du dossier front.

## Installation du back

Pour installer le back, rendez-vous sur le dossier back et exécutez la commande suivante dans un terminal : ``yarn install``.

## Lancement du back

Pour lancer le back, rendez-vous sur le dossier back/config et exécutez la commande suivante dans un terminal : ``docker-compose up``. 

Dans un autre terminal, rendez-vous sur le dossier back et exécutez la commande suivante dans un terminal : ``yarn install``. Sur WebStorm, vous pouvez simplifier la procédure en cliquant sur ``Edit configurations`` puis ``npm``. Rentrez ensuite ``run`` dans ``Command``, puis ``start:dev`` dans ``Scripts``, et sélectionnez ``yarn`` dans ``Package manager``. Vous devez également sélectionner le package.json du dossier back.