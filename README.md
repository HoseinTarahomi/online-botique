# Online Boutique - Microservices Demo with GitOps & Observability

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ArgoCD](https://img.shields.io/badge/argocd-%23ef7b4d.svg?style=for-the-badge&logo=argon-dash&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%23D33833.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)

This repository features a cloud-native microservices application (Google's Online Boutique) optimized for a full **Production-Grade DevOps Lifecycle**. It demonstrates modern infrastructure-as-code (IaC) practices, including automated CI/CD and GitOps-based observability.

---

## 🚀 Key Highlights

* **GitOps Workflow:** Fully automated synchronization between GitHub and Kubernetes using **ArgoCD**.
* **Infrastructure as Code (IaC):** Clean separation between application source code (`/src`) and infrastructure manifests (`/GitOps`).
* **Centralized Logging:** Integrated **PLG Stack** (Promtail, Loki, Grafana) for real-time log aggregation across all 11 microservices.
* **Environment Management:** Implemented **Kustomize** to handle environment-specific overrides (Staging/Production) without duplicating code (DRY principle).

---

## 🏗️ Architecture Overview

The system consists of 11 polyglot microservices written in Go, Java, Python, and Node.js, communicating via **gRPC**.

![System Architecture](./Architecture/Architecture.jpg)

* **Frontend:** User interface for browsing products and checking out.
* **Backend Services:** Core logic including cart, currency, and payment processing.
* **Observability Layer:** Real-time logging and monitoring stack.

Detailed diagrams are available in the `/Architecture` directory.

---

## 📂 Project Structure

.
├── src/                 # All Microservices source code (Multi-language)
├── GitOps/              # Infrastructure Layer (Kubernetes & ArgoCD manifests)
├── Observability/       # Logging Stack (Grafana, Loki, Promtail, Kustomization)
├── Architecture/        # System design diagrams and visual assets
├── Jenkinsfile          # Main CI Pipeline for automated builds
└── README.md            # Comprehensive documentation


---

## 🪵 Centralized Logging (PLG Stack)

To ensure production-grade reliability, I implemented the **PLG Stack** for real-time log aggregation and visualization:

* **Loki:** Optimized log storage system (Prometheus-inspired).
* **Promtail:** Local agent that discovers logs from all microservices containers.
* **Grafana:** Dashboards for querying logs using **LogQL**.
* **Implementation:** Deployed via **Kustomize** within the `/Observability` directory for seamless environment propagation.

---

## 🔧 CI/CD Workflow

* **Commit:** Developer pushes code to the `src/` directory.
* **Build (Jenkins):** Automated pipelines build Docker images, run tests, and push to the registry.
* **Sync (ArgoCD):** Detects changes in the `GitOps/` or `Observability/` directories and automatically updates the cluster state.

---

## 🛠️ Tech Stack

| Category | Tools |
| :--- | :--- |
| **Orchestration** | Kubernetes (K8s) |
| **CI/CD** | Jenkins, ArgoCD |
| **Containerization** | Docker |
| **Config Management** | Kustomize |
| **Observability** | Loki, Promtail, Grafana |

---
**Developed and Maintained by [Hosein Tarahomi](https://github.com/HoseinTarahomi)**