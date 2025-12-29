# Online Boutique - Microservices Demo with GitOps

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ArgoCD](https://img.shields.io/badge/argocd-%23ef7b4d.svg?style=for-the-badge&logo=argon-dash&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%23D33833.svg?style=for-the-badge&logo=jenkins&logoColor=white)

This repository features a cloud-native microservices application (Google's Online Boutique) optimized for a full **DevOps Lifecycle**. It demonstrates modern infrastructure practices including Containerization, Orchestration, and GitOps-based CD.

## 🚀 Project Overview

Unlike standard deployments, this repository focuses on a production-ready GitOps workflow:
* **Separation of Concerns:** Clear distinction between Application Source Code (`/src`) and Infrastructure Manifests (`/GitOps`).
* **Environment Management:** Implemented **Kustomize** to handle environment-specific overrides (Staging/Production) without duplicating code (DRY principle).
* **Continuous Delivery:** Automated synchronization between this repository and the Kubernetes cluster via **ArgoCD**.

## 🏗️ Architecture Overview

The application consists of 11 microservices written in different languages (Go, Java, Python, Node.js) communicating via **gRPC**.

- **Frontend:** Web UI to browse products and checkout.
- **Cart Service:** Stores items in Redis.
- **Currency Service:** Converts prices.
- **Ad Service:** Provides text ads based on context.
- **Deployment Strategy:** Managed via ArgoCD (GitOps).

## 🛠️ Tech Stack & Features

* **Orchestration:** Kubernetes (K8s) for high availability and scaling.
* **CI/CD:** * **Jenkins:** Automation of CI pipelines for building and testing.
    * **ArgoCD:** Declarative continuous delivery using GitOps patterns.
* **Containerization:** Multi-stage Docker builds for optimized image sizes.
* **Configuration:** Kustomize for environment-specific manifests.

## 📂 Project Structure

```text
.
├── src/                 # All Microservices source code (Go, Java, Python, etc.)
├── GitOps/              # Kubernetes Manifests & ArgoCD Application files
├── Jenkinsfile          # Main CI Pipeline definition
└── README.md            # Project documentation
