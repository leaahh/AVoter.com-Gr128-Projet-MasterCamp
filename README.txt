            READ ME
        [Groupe 128] Projet MasterCamp - A Voter

    Membres de l'équipe
Louisa Arayedh
Léah Etzol
Quentin Lambert
Wassim Mahroug
Léo Nahmias
Anouar Smaoui

Lien GitHub du projet : https://github.com/leaahh/AVoter.com-Gr128-Projet-MasterCamp
    

    Installation et lancement du projet
    
Télécharger MySQL Workbench, aller sur https://dev.mysql.com/downloads/workbench/
Installer le logiciel MySQL Workbench sur votre ordinateur avec les configurations par défauts

Créer un identifiant et un mot de passe. Notez ces identifiants, vous en aurez besoin pour la suite !
Ouvrir le fichier avoter.sql (position : dossier du projet) dans MySQL Workbench et lancer le chargement du fichier (éclair jaune)

Insérer l'identifiant et le mot de passe de MySQL Workbench dans le fichier mysql.js (dans le dossier "mysql-test") au ligne 4 et 5 sous la forme : 
    user: 'votre_identifiant',
    password: 'votre_mot_de_passe'

Si cela n'est pas déjà fait, installer https://nodejs.org/

Ouvrir le terminal de votre appareil et accéder au dossier du projet : cd /chemin_vers_le_projet

Entrer la commande suivante : npm install
En cas d'erreur, vérifier votre chemin d'accès et entrer la commande suivante : npm install mysql express bcrypt body-parser

Un dossier node_modules avec les dépendances du projet devrait être installé.

Entrer ensuite la commande : npm start (un statut "Connecté" s'affichera dans votre terminal pour indiquer que vous êtes bien connecté.e à la base de données)

Tester le site :)


    Nota Bene

Si vous voulez effectuer des tests sur les dates, il faudra modifier les infos de la table "tour" car c'est un administrateur 
qui gère l'ajout, la suppression et la modification des informations.

Nous n'avons pas affiché les résultats des élections car ils seront théoriquement communiqué sur les sites d'actualités.
