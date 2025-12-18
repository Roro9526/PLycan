# Déploiement Kubernetes - Loup-Garou 🐺

Ce dossier contient les fichiers de configuration pour déployer l'application sur un cluster Kubernetes (comme Docker Desktop ou Minikube).

## Pré-requis
1. Avoir **Docker Desktop** installé et Kubernetes activé dans les réglages.
2. Avoir construit les images Docker localement :
   ```bash
   docker build -t loup-garou-backend:latest ./backend
   docker build -t loup-garou-frontend:latest ./frontend
   ```

## Déploiement
Dans le dossier du projet, lancez :

```bash
kubectl apply -f k8s/mongo-statefulset.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

## Vérification
Vérifiez que tout tourne :
```bash
kubectl get pods
kubectl get services
```

## Accès
L'application frontend est accessible via le NodePort 30080 :
- [http://localhost:30080](http://localhost:30080)

## Nettoyage
```bash
kubectl delete -f k8s/
```
