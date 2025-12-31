Online Boutique - Microservices Demo with GitOps & Observability
This repository features a cloud-native microservices application optimized for a full Production-Grade DevOps Lifecycle. It demonstrates modern infrastructure-as-code (IaC) practices, including automated CI/CD and GitOps-based observability.

🚀 Key Highlights
GitOps Workflow: Fully automated synchronization between GitHub and Kubernetes using ArgoCD.

Infrastructure as Code (IaC): Clear distinction between application source code and infrastructure manifests.

Centralized Logging: Integrated PLG Stack (Promtail, Loki, Grafana) for real-time log aggregation across all 11 microservices.

Environment Management: Implemented Kustomize to handle environment-specific overrides (Staging/Production) without duplicating code (DRY principle).

🏗️ Architecture Overview
The system consists of 11 polyglot microservices (Go, Java, Python, Node.js) communicating via gRPC. Detailed diagrams are available in the /Architecture directory.

Frontend: User interface for browsing products and checking out.

Backend Services: Core logic including cart, currency, and payment processing.

Observability Layer: Real-time logging and monitoring stack.

📂 Project Structure

.
├── src/                 # All Microservices source code (Multi-language)
├── GitOps/              # Infrastructure Layer (Kubernetes & ArgoCD manifests)
├── Observability/       # Logging Stack (Grafana, Loki, Promtail, Kustomization)
├── Architecture/        # System design diagrams and visual assets
├── Jenkinsfile          # Main CI Pipeline for automated builds
└── README.md            # Comprehensive documentation


🛠️ Tech Stack & Features
Orchestration: Kubernetes (K8s) for high availability and scaling.

CI/CD: * Jenkins: Automation of CI pipelines for building and testing.

ArgoCD: Declarative continuous delivery using GitOps patterns.

Configuration: Kustomize for managing base and environment-specific manifests.

🪵 Centralized Logging (PLG Stack)
I implemented the PLG Stack for real-time log aggregation and visualization:

Loki: Optimized log storage (Prometheus-inspired).

Promtail: Local agent that discovers logs from all microservices containers.

Grafana: Dashboards for querying logs using LogQL.

Implementation: Deployed via Kustomize within the /Observability directory for seamless environment propagation.

🔧 CI/CD Workflow
Commit: Developer pushes code to the src/ directory.

Build (Jenkins): Automated pipelines build Docker images and run tests.

Sync (ArgoCD): Detects changes in the GitOps/ or Observability/ directories and updates the cluster state.