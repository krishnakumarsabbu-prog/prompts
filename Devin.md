Build a production-grade VSCode extension called "Copilot Agent Studio".

The goal of this plugin is to transform GitHub Copilot into a Devin-like autonomous engineering assistant using:
- Repository intelligence
- Confluence-driven prompt libraries
- Dynamic AI agent generation
- GitHub Copilot instructions
- Playbooks
- Skills
- Execution workflows

IMPORTANT:
Do NOT modify any existing VSCode pages or functionality.
Create all new features in isolated folders/components/files.
Backend and frontend should be modular and separated cleanly.

--------------------------------------------------
CORE PRODUCT IDEA
--------------------------------------------------

This plugin acts as an AI Engineering Operating System for GitHub Copilot.

The plugin should help developers:
1. Analyze repositories
2. Generate engineering context automatically
3. Load enterprise prompts/playbooks from Confluence
4. Generate dynamic AI agents
5. Download agent packages
6. Use those agents with Copilot Chat / Copilot Coding Agent

The plugin does NOT replace Copilot.
It enhances Copilot using structured context and execution workflows.

--------------------------------------------------
FEATURE 1 — REPOSITORY ANALYZER
--------------------------------------------------

When the project/workspace loads:

Scan the repository automatically.

Detect:
- Programming languages
- Frameworks
- Backend/frontend stacks
- Build tools
- Test frameworks
- CI/CD tools
- Docker/Kubernetes
- Monorepo structure
- Dependency managers
- Architecture patterns
- Folder structure
- Common commands
- Existing documentation
- Existing workflows

Create an internal structured repository model.

--------------------------------------------------
FEATURE 2 — AI CONTEXT GENERATOR
--------------------------------------------------

Provide a sidebar button:

[ Generate AI Context ]

When clicked, generate:

1. Wiki.md
2. copilot-instructions.md
3. AGENTS.md
4. Project Architecture Summary
5. Engineering Standards
6. Execution Policies
7. Workflow Definitions
8. Suggested Prompt Templates
9. Suggested Skills
10. Suggested Agent Types

The generated files must be:
- clean
- enterprise-grade
- highly structured
- editable
- downloadable

--------------------------------------------------
FEATURE 3 — CONFLUENCE PROMPT LIBRARY
--------------------------------------------------

Integrate with Confluence API.

Allow users to:
- Connect Confluence workspace
- Browse prompt libraries
- Search prompts
- Filter prompts by category
- Preview prompts
- Select prompts

Prompt categories:
- Bug Fixing
- Refactoring
- Test Generation
- Security
- Migration
- Documentation
- Performance Optimization
- IBM MQ Migration
- API Governance
- PR Review
- Incident Resolution

Support:
- pagination
- caching
- prompt tagging
- versioning
- favorites
- team-specific prompts

Each prompt should contain:
- title
- description
- workflow
- expected outputs
- validation rules
- execution policies
- required skills

--------------------------------------------------
FEATURE 4 — SKILLS SYSTEM
--------------------------------------------------

Support GitHub Copilot Skills.

Allow users to:
- Select skills
- Attach skills to generated agents
- Preview skill definitions
- Import/export skills

Skill examples:
- Run Tests
- Debug Failures
- Create Pull Requests
- Kubernetes Deployment
- IBM MQ Migration
- Spring Boot Diagnostics
- React Refactoring
- Security Scanning

--------------------------------------------------
FEATURE 5 — DYNAMIC AGENT GENERATOR
--------------------------------------------------

Provide UI to generate dynamic agents.

User selects:
- Prompt/playbook
- Skills
- Workflow
- Execution policy
- Validation strategy
- Output style
- Coding standards
- Safety rules

Generate:

.github/
  agents/
    generated-agent/
      AGENT.md
      PLAYBOOK.md
      CONTEXT.md
      CHECKLIST.md
      EXECUTION_POLICY.md
      VALIDATION.md
      WORKFLOWS.md
      prompts/
      skills/

Generated agents must behave like Devin-style autonomous workflows.

--------------------------------------------------
FEATURE 6 — AGENT WORKFLOW SYSTEM
--------------------------------------------------

Generated agents should support:

1. Planning
2. Analysis
3. Implementation
4. Validation
5. Testing
6. Retry loops
7. PR preparation
8. Documentation updates
9. Checkpoints
10. Safe execution rules

--------------------------------------------------
FEATURE 7 — DOWNLOAD SYSTEM
--------------------------------------------------

Allow users to:
- Download generated agent package
- Export as ZIP
- Copy generated markdown
- Save into repository
- Share with team

--------------------------------------------------
FEATURE 8 — UI/UX
--------------------------------------------------

Create a modern AI-native UI.

Design inspiration:
- Devin
- Cursor
- Claude
- Linear
- Notion
- Vercel

Requirements:
- Beautiful sidebar
- Agent cards
- Prompt previews
- Workflow visualization
- Minimal dark theme
- Smooth animations
- Rich loading states
- Progress indicators
- Step-based generation
- Expandable sections

--------------------------------------------------
FEATURE 9 — ARCHITECTURE
--------------------------------------------------

Frontend:
- React
- TypeScript
- VSCode Webview API
- TailwindCSS
- Zustand or Redux

Backend:
- Node.js
- TypeScript

Structure:
- Fully modular
- Plugin architecture
- Service layer
- Repository analyzer engine
- Confluence service
- Prompt engine
- Agent generator engine

IMPORTANT:
Never modify existing code directly.
Create new isolated modules and folders.

--------------------------------------------------
FEATURE 10 — FUTURE READY
--------------------------------------------------

Architecture must support future:
- Multi-agent orchestration
- CI/CD integration
- Autonomous retries
- PR review agents
- Slack integration
- Jira integration
- Incident response agents
- Cloud execution
- Team memory
- Agent marketplace

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

The final product should feel like:

"Devin for GitHub Copilot"

but implemented as:
- a VSCode extension
- enterprise-ready
- Confluence-driven
- workflow-centric
- modular
- extensible
- production-grade
