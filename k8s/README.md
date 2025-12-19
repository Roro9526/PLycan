# 🚢 Déploiement Loup-Garou sur Kubernetes

Ce dossier contient tout le nécessaire pour déployer le projet sur un cluster Kubernetes (Minikube ou Docker Desktop).

## 📋 Pré-requis
- **Docker Desktop** (avec Kubernetes activé) ou **Minikube**.
- `kubectl` installé.

## 🚀 Étapes de déploiement

### 1. Construire les images Docker
Kubernetes a besoin d'images locales. Lancez ces commandes depuis la racine du projet :

```powershell
# Build du Backend
docker build -t loup-garou-backend:latest ./backend

# Build du Frontend
docker build -t loup-garou-frontend:latest ./frontend
```

### 2. Appliquer les manifests
Déployez les composants dans l'ordre suivant :

```powershell
# 1. Base de données (avec persistence)
kubectl apply -f k8s/mongo-statefulset.yaml

# 2. Backend (API)
kubectl apply -f k8s/backend-deployment.yaml

# 3. Frontend (Web UI)
kubectl apply -f k8s/frontend-deployment.yaml
```

### 3. Vérification
Vérifiez que les Pods sont en statut `Running` :
```powershell
kubectl get pods
```

### 4. Accès au jeu
Une fois les pods lancés, accédez au jeu sur :
👉 **[http://localhost:30080](http://localhost:30080)**

> [!NOTE]
> Le frontend est configuré pour détecter automatiquement le cluster et se connectera au backend via le port **30001**.

## 🧹 Nettoyage
Pour tout supprimer :
```powershell
kubectl delete -f k8s/
```
