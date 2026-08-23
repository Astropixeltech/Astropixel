import Layout from "@/components/Layout";
import ServiceDetailView from "@/views/ServiceDetailView";

export default function DevOpsPage() {
  return (
    <Layout>
      <ServiceDetailView
        slug="devops"
        title="DevOps & Cloud Infrastructure Consulting"
        subtitle="Automating CI/CD pipelines, containerizing workloads, and optimizing cloud architecture on AWS, Vercel, and GCP for 99.99% uptime."
        badge="Cloud & Infrastructure"
        primaryKeyword="DevOps Agency"
        secondaryKeywords={["DevOps Consulting", "Cloud DevOps Services", "AWS DevOps", "CI/CD Pipeline Automation"]}
        description="AstroPixel offers specialized DevOps and cloud infrastructure services for startups and high-traffic web applications. Our engineers automate deployments, enforce security compliance, reduce cloud hosting costs, and prevent server downtime."
        features={[
          { title: "Automated CI/CD Pipelines", desc: "Zero-downtime automated deployment pipelines using GitHub Actions, GitLab CI, or Docker." },
          { title: "AWS & GCP Cloud Architecture", desc: "Designing resilient serverless, EC2, ECS, or Kubernetes infrastructure tailored for scale." },
          { title: "Infrastructure as Code (IaC)", desc: "Provisioning reproducible cloud environments using Terraform, CloudFormation, or Ansible." },
          { title: "Security & Cloud Cost Optimization", desc: "Enforcing IAM policies, SSL certificate management, WAF protection, and monthly AWS bill reductions." }
        ]}
        process={[
          { step: "01", title: "Cloud Audit", desc: "Evaluating current infrastructure, bottlenecks & security." },
          { step: "02", title: "Strategy", desc: "Designing IaC blueprint & deployment architecture." },
          { step: "03", title: "Pipeline Build", desc: "Setting up automated CI/CD testing & deployment." },
          { step: "04", title: "Migration", desc: "Zero-downtime server or database migration." },
          { step: "05", title: "Monitoring", desc: "24/7 logging, metrics, and automated alerts." }
        ]}
        faqs={[
          { question: "How can DevOps reduce our cloud hosting costs?", answer: "By optimizing database queries, implementing auto-scaling, eliminating unused cloud resources, and utilizing spot instances." },
          { question: "Do you support containerization with Docker and Kubernetes?", answer: "Yes, we fully containerize applications and manage orchestration across Docker, Kubernetes, and ECS." }
        ]}
      />
    </Layout>
  );
}
