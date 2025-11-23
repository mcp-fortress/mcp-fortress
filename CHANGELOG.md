# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Coming Soon
- Docker container scanning
- OCI image vulnerability detection
- SBOM (Software Bill of Materials) generation
- GitHub Actions integration
- VS Code extension
- Cloud sync (Pro tier)

## [0.4.0] - 2025-11-23

### Added
- **Claude Code Skill**: Official skill for Claude Code enabling automatic security scanning
  - Autonomous activation when users ask about MCP server safety
  - Three bundled security tools: scan_mcp_server, analyze_prompt_injection, detect_tool_poisoning
  - Plain language interpretation of scan results
  - Progressive disclosure of technical details
- **Claude Code Marketplace**: Plugin available via `/plugin marketplace add mcp-fortress/mcp-fortress`
- **Automatic MCP Server Installation**: Plugin bundles both remote and local MCP servers
  - Remote HTTP server via Smithery (instant, no dependencies)
  - Local stdio server via npx (auto-installs when needed)
- **GitHub Pages Website**: Modern landing page at https://mcp-fortress.github.io/mcp-fortress/
  - Feature showcase and use cases
  - Installation instructions for all platforms
  - Claude Code integration guide
  - Interactive demos and examples
- **MCP Registry Publication**: Published to official registry at registry.modelcontextprotocol.io
  - Remote server deployment via Smithery
  - Version 0.3.6 published and verified

### Fixed
- Plugin installation path resolution in marketplace.json
- Corrected source path for skill directory in marketplace configuration

### Changed
- Updated skill structure to use mcp-fortress branding (from generic mcp-security-scanner)
- Enhanced README with automatic installation documentation
- Improved Prerequisites section to clarify manual vs marketplace installation

## [0.1.0] - 2025-11-07

### Added
- Initial release of MCP Fortress
- CLI interface with `start`, `scan`, `monitor`, `quarantine` commands
- Web-based dashboard with React UI
- REST API server with Express
- WebSocket server for real-time updates
- npm package vulnerability scanning
- PyPI package vulnerability scanning
- SQLite database for local data storage
- Achievement system with 16 unlockable badges
- Streak tracking for daily scans
- Risk scoring system (0-100)
- Quarantine management
- API key authentication
- Server approval workflow
- Activity feed with live telemetry
- Beautiful glass-morphism UI design
- Humorous security tips and messages
- User metrics and gamification
- Local mode (unlimited scans, no account needed)

### Security
- CVE database integration for vulnerability detection
- Dependency analysis and risk assessment
- Malicious pattern detection
- License compliance checking

---

## Release Notes

### v0.1.0 - "Foundation"

**🎉 First Public Release**

MCP Fortress is now available on npm! This release includes everything you need to secure your MCP server deployments.

**Highlights:**
- ⚡ Quick start: `npx mcp-fortress start`
- 🔍 Automated vulnerability scanning
- 🎮 Gamification with achievements
- 🎨 Beautiful web UI
- 🆓 Completely free for local use

**Installation:**
```bash
npm install -g mcp-fortress
mcp-fortress start
```

**Known Limitations:**
- Production bundled distribution not yet available
- Cloud sync (Pro tier) coming soon
- Docker/OCI scanning coming in v0.2.0

---

[Unreleased]: https://github.com/mcp-fortress/mcp-fortress/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/mcp-fortress/mcp-fortress/compare/v0.1.0...v0.4.0
[0.1.0]: https://github.com/mcp-fortress/mcp-fortress/releases/tag/v0.1.0
