# Deploiement Conteneur Sur Un Serveur DIstant (dans ce cas DevSaphir)

1- faire un build sur le projet et generer le fichier dist

cmd: ng build --prod

2- copier le contenu du fichier dist génèrè dans un dossier temporaire sur le serveur (Utiliser FileZilla)

3- arreter le serveur Tomcat sur ce chemin cd /usr/local/tomcat/tomcat-front/bin

cmd: ./shutdown.sh

4-vider le contenu du dossier conteneur sur tomcat

cmd: sudo rm -rf  /usr/local/tomcat/tomcat-front/webapps/conteneur/*

5-copier le contenu du dist depuis le repetoire temporaire (2) vers le dossier conteneur sur tomcat 

cmd: cp -avr /acu/temp/* /usr/local/tomcat/tomcat-front/webapps/conteneur

5.5- cd /usr/local/tomcat/tomcat-front/webapps/conteneur

6- Modifier le fichier: vi index.html

Appuyer sur la touche Insert pour modifier < base href="/">" en < base href="./">
Une fois modifier, appuyer sur Echap, puis saisir :wq

7-Demarrer le serveur Tomcat sur ce chemin cd /usr/local/tomcat/tomcat-front/bin 

cmd: ./startup.sh

----------------------------------------------------------------------------------------------------------------------
# Si jamais des modifications ont eu lieu dans le dossier Assets et que le serveur ne les prennent pas en compte, alors :

1- cd /usr/local/tomcat/tomcat-front/bin

2- ./shutdown.sh

3- cp -avr /acu/temp/assets/* /usr/local/tomcat/tomcat-front/webapps/assets/

4- ./startup.sh

