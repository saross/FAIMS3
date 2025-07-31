# FAIMS3 (Fieldmark™) Overview for Documentation Planning

## Executive Summary

FAIMS3 (Fieldmark™) is an open-source platform for creating custom mobile applications for offline field data collection. Developed for researchers requiring high-quality, FAIR-compliant data collection, it provides a flexible framework supporting structured, geospatial, instrument, and multimedia data capture across web browsers, Android, and iOS devices.

## What FAIMS3 Does (High-Level)

### Core Functionality
- **Custom Data Collection Notebooks**: Enables creation of customized digital forms ("notebooks") tailored to specific research workflows
- **Offline-First Architecture**: Supports data collection in remote locations without internet connectivity
- **Multi-Platform Support**: Runs on web browsers, Android devices, and iOS devices
- **Opprotunistic Synchronization**: Automatically syncs data when connectivity is available
- **Flexible Data Types**: Supports text, numbers, dates, locations (GPS), photos, QR codes, relationships between records, and arbitrary file attachments
- **Export Capabilities**: Provides data export in CSV, KML, JSON, and other formats
- **Team Collaboration**: Supports multi-user workflows with role-based access control

### Key Use Cases
- Archaeological field recording
- Environmental monitoring (e.g., camera traps, coarse woody debris surveys)  
- Scientific field sampling
- Any structured data collection requiring offline capability

## High-Level Architecture

### System Components

1. **API/Conductor Service** (`/api`)
   - Node.js/Express backend service
   - Handles authentication, authorization, and API endpoints
   - Manages user accounts, teams, and permissions
   - Interfaces with CouchDB for data persistence
   - Provides email services and token management

2. **Mobile/Web Application** (`/app`)
   - React-based application using Ionic Capacitor
   - Single codebase for web, Android, and iOS platforms
   - PouchDB for local data storage and offline capability
   - Real-time sync with CouchDB when online
   - Component-based field rendering system

3. **Web Administration Interface** (`/web`)
   - React application for administrative tasks
   - User and team management
   - Project/notebook management
   - Data export functionality
   - Template management

4. **Notebook Designer** (`/designer`)
   - Visual interface for creating data collection forms
   - Drag-and-drop field configuration
   - Preview and testing capabilities
   - JSON-based notebook specification

5. **Data Model Library** (`/library/data-model`)
   - Shared TypeScript library
   - Common database handling API
   - Used by both frontend and backend
   - Handles data validation and type system

6. **Infrastructure** (`/infrastructure`)
   - AWS CDK deployment scripts
   - Docker configurations
   - Support for cloud and on-premise deployments

### Technology Stack
- **Frontend**: React, TypeScript, Ionic Capacitor, PouchDB
- **Backend**: Node.js, Express, TypeScript
- **Database**: CouchDB (server), PouchDB (client)
- **Build Tools**: Vite, Turbo, npm workspaces
- **Deployment**: Docker, AWS CDK

### Data Flow
1. Notebooks are designed using the Designer (which outputs JSON specifications) or by direct editing of JSON specifications file
2. Notebooks are deployed to users via the Conductor API
3. Users download notebooks to their devices
4. Data is collected offline using PouchDB
5. When online, PouchDB syncs with CouchDB
6. Data can be exported via the web interface

## Current Documentation State

### What Exists

#### User Documentation (`/docs/user`)
- **Introductory Content**: Getting started, logging in, basic navigation
- **Feature Guides**: Mapping, synchronization, field types, relationships
- **Demo Notebooks**: Campus survey and general demo walkthroughs
- **Intermediate Content**: Basic notebook creation guide
- **Advanced Content**: Admin setup, troubleshooting, server setup, user management
- **Technical Specs**: UI specification documentation
- **Export Documentation**: Basic and advanced export guides

#### Developer Documentation (`/docs/developer`)
- **Deployment Guides**: Android and iOS deployment procedures
- **Field Development**: Guide for adding new field types
- **Configuration**: Environment and system configuration
- **Authentication**: Passport auth and refresh token documentation
- **Data Management**: CouchDB migrations, drafts, long-lived tokens
- **Permission Model**: Basic permission system documentation

#### Component-Level Documentation
- Basic README files in each major component directory
- API documentation includes email service setup
- Some inline code documentation

### What Is Missing

#### User Documentation Gaps
- **Comprehensive Field Type Reference**: Detailed documentation for each available field type with examples
- **Notebook Design Best Practices**: Guidelines for effective form design
- **Data Management Workflows**: End-to-end guides for common research scenarios
- **Video Tutorials**: No multimedia learning resources
- **Troubleshooting Expansion**: Limited coverage of common issues and solutions

#### Integrator Documentation Gaps
- **Complete API Reference**: No comprehensive API documentation
- **Notebook JSON Schema Documentation**: Limited documentation of the notebook specification format
- **Integration Guides**: How to integrate FAIMS3 with other systems
- **Custom Field Development**: Detailed guide for creating custom field components
- **Deployment Scenarios**: Guides for various deployment configurations
- **Security Configuration**: Best practices for production deployments

#### Developer Documentation Gaps
- **Architecture Deep Dives**: Detailed explanations of system design decisions
- **Development Environment Setup**: Step-by-step guide for new developers
- **Testing Strategy**: Documentation of testing approaches and requirements
- **Contribution Guidelines**: How to contribute to the project
- **Code Organization**: Explanation of project structure and conventions
- **State Management**: Documentation of data flow and state handling
- **Performance Optimization**: Guidelines for optimal notebook design
- **Plugin/Extension System**: If extensibility is planned

#### General Documentation Gaps
- **Conceptual Overview**: High-level explanation of core concepts (notebooks, records, synchronization)
- **Migration Guides**: Moving from FAIMS2 or other systems
- **Glossary Expansion**: More comprehensive terminology definitions
- **Use Case Studies**: Real-world implementation examples
- **Roadmap and Vision**: Future development plans

## Recommendations for Documentation Strategy

1. **Prioritize Missing Integrator Documentation**: This audience needs the most support for successful adoption
2. **Create Interactive Examples**: Provide sample notebooks with documentation
3. **Establish Documentation Standards**: Templates and guidelines for consistent documentation
4. **Version Documentation**: Align documentation versions with software releases
5. **Implement Feedback Mechanisms**: Allow users to report documentation issues
6. **Consider Documentation Tooling**: Evaluate tools for API documentation generation

This overview provides the foundation for developing a comprehensive documentation plan for FAIMS3, addressing the needs of users, integrators, and developers while building upon existing documentation assets.