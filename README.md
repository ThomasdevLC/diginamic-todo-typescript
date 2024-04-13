# TODO LIST EN TYPESCRIPT

Pour démarrer l'application, assurez-vous d'exécuter `npm install` pour installer les dépendances nécessaires.

### npm start

Exécute l'application en mode développement.
Ouvre http://localhost:8080 pour la visualiser dans le navigateur.

La page se rechargera si vous apportez des modifications.
Vous verrez également toutes les erreurs de lint dans la console.

### Serveur JSON (JSON Server)

Pour simuler un serveur de base de données, vous pouvez utiliser JSON Server. Voici comment l'installer et le démarrer :

1. Installez JSON Server globalement en exécutant la commande suivante dans votre terminal : npm install -g json-server

2. Pour démarrer JSON Server, exécutez la commande suivante en spécifiant le chemin vers le fichier de données JSON : json-server --watch ./jsonserver/db.json
