import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaClock, FaGithub, FaTwitter, FaLinkedin, FaTag } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SectionHeader from '../ui/SectionHeader';
import './blog.scss';

// Blog Data
const blogPosts = [
  {
    id: 1,
    slug: 'ci-cd-github-actions',
    title: 'Setting Up CI/CD Pipeline with GitHub Actions',
    excerpt: 'Learn how to automate your deployment workflow using GitHub Actions with Docker and AWS.',
    date: 'Dec 15, 2025',
    readTime: '8 min read',
    tags: ['DevOps', 'CI/CD', 'GitHub Actions'],
    image: 'https://github.githubassets.com/images/modules/site/social-cards/actions.png',
    content: `
## Introduction

Continuous Integration and Continuous Deployment (CI/CD) is a crucial practice in modern software development. GitHub Actions provides a powerful, integrated way to automate your build, test, and deployment pipeline.

## Why GitHub Actions?

- **Native Integration**: Built directly into GitHub
- **Free for Public Repos**: Generous free tier for open source
- **Marketplace**: Thousands of pre-built actions
- **Matrix Builds**: Test across multiple OS/versions simultaneously

## Setting Up Your First Workflow

Create a file at \`.github/workflows/deploy.yml\`:

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Tests
        run: npm test
      
      - name: Build Application
        run: npm run build

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to AWS S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: \${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'dist'
\`\`\`

## Adding Docker Build

For containerized applications, add Docker build and push:

\`\`\`yaml
  docker:
    needs: build-and-test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_TOKEN }}
      
      - name: Build and Push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: user/app:latest
\`\`\`

## Best Practices

1. **Use Secrets**: Never hardcode credentials
2. **Cache Dependencies**: Speed up builds with caching
3. **Parallel Jobs**: Run independent jobs concurrently
4. **Branch Protection**: Require CI to pass before merging

## Conclusion

GitHub Actions simplifies CI/CD by keeping everything in one place. Start with a simple workflow and gradually add complexity as needed.
    `
  },
  {
    id: 2,
    slug: 'docker-best-practices',
    title: 'Docker Containerization Best Practices',
    excerpt: 'Master Docker with production-ready practices for building efficient, secure containers.',
    date: 'Nov 28, 2025',
    readTime: '10 min read',
    tags: ['Docker', 'DevOps', 'Containers'],
    image: 'https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png',
    content: `
## Introduction

Docker has revolutionized how we build, ship, and run applications. However, there's a significant difference between a working Dockerfile and a production-ready one.

## Multi-Stage Builds

Reduce image size dramatically with multi-stage builds:

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
\`\`\`

## Security Best Practices

### 1. Use Non-Root User

\`\`\`dockerfile
# Create non-root user
RUN addgroup -g 1001 -S appgroup && \\
    adduser -u 1001 -S appuser -G appgroup

USER appuser
\`\`\`

### 2. Scan for Vulnerabilities

\`\`\`bash
# Using Docker Scout
docker scout cves myimage:latest

# Using Trivy
trivy image myimage:latest
\`\`\`

### 3. Use Specific Tags

\`\`\`dockerfile
# Bad - unpredictable
FROM node:latest

# Good - specific version
FROM node:20.10.0-alpine3.18
\`\`\`

## Optimizing Layer Cache

Order matters! Put rarely changing layers first:

\`\`\`dockerfile
FROM node:20-alpine

# System dependencies (rarely change)
RUN apk add --no-cache dumb-init

# Dependencies (change occasionally)
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Source code (changes frequently)
COPY . .

CMD ["dumb-init", "node", "server.js"]
\`\`\`

## Docker Compose for Development

\`\`\`yaml
version: '3.8'

services:
  app:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
\`\`\`

## Health Checks

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Conclusion

Following these practices will result in smaller, faster, and more secure Docker images. Always measure the impact of optimizations and iterate continuously.
    `
  },
  {
    id: 3,
    slug: 'nodejs-rest-api',
    title: 'Building RESTful APIs with Node.js & Express',
    excerpt: 'A comprehensive guide to building scalable REST APIs with proper architecture and error handling.',
    date: 'Oct 12, 2025',
    readTime: '12 min read',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    image: 'https://nodejs.org/static/images/logo.svg',
    content: `
## Introduction

Building robust REST APIs requires more than just setting up routes. This guide covers architecture patterns, error handling, validation, and security best practices.

## Project Structure

\`\`\`
src/
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── services/
│   └── userService.js
├── utils/
│   └── ApiError.js
└── app.js
\`\`\`

## Setting Up Express

\`\`\`javascript
// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});
app.use('/api', limiter);

// Routes
app.use('/api/v1/users', userRoutes);

// Error handling
app.use(errorHandler);

export default app;
\`\`\`

## Custom Error Class

\`\`\`javascript
// utils/ApiError.js
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
\`\`\`

## Error Handler Middleware

\`\`\`javascript
// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  if (!err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }
  
  res.status(statusCode || 500).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};
\`\`\`

## Controller Pattern

\`\`\`javascript
// controllers/userController.js
import userService from '../services/userService.js';
import ApiError from '../utils/ApiError.js';

export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await userService.findAll({ page, limit });
    
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
\`\`\`

## Input Validation with Joi

\`\`\`javascript
// middleware/validate.js
import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const message = error.details.map(d => d.message).join(', ');
    return next(new ApiError(400, message));
  }
  
  next();
};

// Schemas
export const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
\`\`\`

## JWT Authentication

\`\`\`javascript
// middleware/auth.js
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Access token required'));
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};
\`\`\`

## Conclusion

A well-structured API is maintainable, testable, and scalable. Follow these patterns and adapt them to your specific needs.
    `
  },
  {
    id: 4,
    slug: 'kubernetes-intro',
    title: 'Introduction to Kubernetes for Developers',
    excerpt: 'Understand Kubernetes fundamentals and deploy your first application to a K8s cluster.',
    date: 'Sep 5, 2025',
    readTime: '15 min read',
    tags: ['Kubernetes', 'DevOps', 'Cloud'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png',
    content: `
## What is Kubernetes?

Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

## Core Concepts

### Pods
The smallest deployable unit. Usually contains one container.

### Deployments
Manages ReplicaSets and provides declarative updates.

### Services
Exposes pods to network traffic (ClusterIP, NodePort, LoadBalancer).

### ConfigMaps & Secrets
Store configuration and sensitive data separately from code.

## Your First Deployment

### 1. Create a Deployment

\`\`\`yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: my-app:1.0.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "200m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 3
\`\`\`

### 2. Create a Service

\`\`\`yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
\`\`\`

### 3. Apply Configuration

\`\`\`bash
# Apply resources
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Check status
kubectl get pods
kubectl get services
kubectl get deployments

# View logs
kubectl logs -f deployment/my-app

# Scale deployment
kubectl scale deployment my-app --replicas=5
\`\`\`

## ConfigMaps and Secrets

\`\`\`yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  API_URL: "https://api.example.com"
  LOG_LEVEL: "info"
---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-app-secrets
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=  # base64 encoded
\`\`\`

### Using in Deployment

\`\`\`yaml
spec:
  containers:
    - name: my-app
      envFrom:
        - configMapRef:
            name: my-app-config
        - secretRef:
            name: my-app-secrets
\`\`\`

## Horizontal Pod Autoscaling

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
\`\`\`

## Useful Commands

\`\`\`bash
# Get all resources
kubectl get all -n default

# Describe a pod (debugging)
kubectl describe pod <pod-name>

# Execute command in pod
kubectl exec -it <pod-name> -- /bin/sh

# Port forward for local testing
kubectl port-forward svc/my-app-service 8080:80

# View resource usage
kubectl top pods
kubectl top nodes

# Rolling update
kubectl set image deployment/my-app my-app=my-app:2.0.0

# Rollback
kubectl rollout undo deployment/my-app
\`\`\`

## Conclusion

Kubernetes provides powerful tools for managing containerized applications at scale. Start with these fundamentals and progressively explore advanced features like Ingress, RBAC, and Helm charts.
    `
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const renderContent = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const language = match[1] || 'text';
          const code = match[2].trim();
          return (
            <SyntaxHighlighter
              key={index}
              language={language}
              style={vscDarkPlus}
              customStyle={{
                borderRadius: '12px',
                padding: '20px',
                margin: '20px 0',
                fontSize: '14px',
              }}
            >
              {code}
            </SyntaxHighlighter>
          );
        }
      }
      
      // Parse markdown-like content
      return (
        <div key={index} className="blog-content__text">
          {part.split('\n').map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i}>{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
              return <h3 key={i}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('- ')) {
              return <li key={i}>{line.replace('- ', '')}</li>;
            }
            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
              return <li key={i}>{line.replace(/^\d+\. /, '')}</li>;
            }
            if (line.includes('**')) {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i}>
                  {parts.map((p, j) => 
                    j % 2 === 1 ? <strong key={j}>{p}</strong> : p
                  )}
                </p>
              );
            }
            if (line.includes('`') && !line.startsWith('```')) {
              const parts = line.split(/`(.*?)`/g);
              return (
                <p key={i}>
                  {parts.map((p, j) => 
                    j % 2 === 1 ? <code key={j} className="inline-code">{p}</code> : p
                  )}
                </p>
              );
            }
            if (line.trim()) {
              return <p key={i}>{line}</p>;
            }
            return null;
          })}
        </div>
      );
    });
  };

  // Blog Post View
  if (selectedPost) {
    return (
      <div className="blog-section">
        <div className="container">
          <motion.button
            className="back-btn"
            onClick={() => setSelectedPost(null)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <FaArrowLeft /> Return to Blog List
          </motion.button>

          <motion.article
            className="blog-post"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <header className="blog-post__header">
              <h1>{selectedPost.title}</h1>
              <div className="blog-post__meta">
                <span><FaCalendar /> {selectedPost.date}</span>
                <span><FaClock /> {selectedPost.readTime}</span>
              </div>
              <div className="blog-post__tags">
                {selectedPost.tags.map((tag, i) => (
                  <span key={i} className="tag"><FaTag /> {tag}</span>
                ))}
              </div>
            </header>

            <div className="blog-post__image">
              <img src={selectedPost.image} alt={selectedPost.title} />
            </div>

            <div className="blog-post__content">
              {renderContent(selectedPost.content)}
            </div>

            <footer className="blog-post__footer">
              <div className="share-section">
                <span>Share this article:</span>
                <div className="share-buttons">
                  <a href={`https://twitter.com/intent/tweet?text=${selectedPost.title}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href={`https://linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/sagararnav07" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
              </div>
            </footer>
          </motion.article>
        </div>
      </div>
    );
  }

  // Blog List View
  return (
    <div className="blog-section">
      <div className="container">
        <SectionHeader 
          title="Blog"
          subtitle="Thoughts, tutorials, and insights on development"
        />

        <motion.div 
          className="blog-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPost(post)}
            >
              <div className="blog-card__image">
                <img src={post.image} alt={post.title} />
                <div className="blog-card__overlay" />
              </div>

              <div className="blog-card__content">
                <div className="blog-card__tags">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <h3 className="blog-card__title">{post.title}</h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>

                <div className="blog-card__meta">
                  <span><FaCalendar /> {post.date}</span>
                  <span><FaClock /> {post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
