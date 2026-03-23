# Addendum: Using the OneNote MCP Server with a Corporate Microsoft Account

> **This addendum is a companion to the main setup guide.** If you have a personal Microsoft account (Outlook.com, Hotmail, Live.com), you don't need this — follow the [main guide](https://sujitg.com/guides/onenote-mcp) instead. This document only covers what's **different** for corporate or organizational accounts (work or school accounts managed by your company's IT department).

---

## How Do I Know If I Have a Corporate Account?

You have a corporate account if:
- Your Microsoft account email ends in your company's domain (e.g., `yourname@vystarcu.org`, `yourname@company.com`)
- You sign into Microsoft 365 through your company's login page
- Your IT department manages your Microsoft account

---

## What's Different for Corporate Accounts

### The Good News First

The 501 error described in the main article — where Microsoft blocks the `copyToSection` API on personal accounts — **does not affect corporate accounts**. That limitation is specific to personal Microsoft accounts. On a corporate account, all eight tools in the server work as expected.

### The Key Differences

| | Personal Account | Corporate Account |
|--|--|--|
| TENANT_ID setting | `common` | Your company's Tenant ID |
| Azure App Registration | You create it yourself | IT admin must create or approve it |
| Admin consent | Self-granted | Required from IT admin |
| Authentication | Standard Microsoft login | May include MFA / SSO |
| The 501 error | Affects you | Does not affect you |

---

## Step 1 — Get Your Company's Tenant ID

Instead of using `TENANT_ID=common`, you need your company's specific Tenant ID.

**How to find it:**
1. Go to **portal.azure.com** and sign in with your corporate account
2. In the top-right corner, click your name or profile picture
3. Click **"Switch directory"** if needed to select your company's directory
4. In the search bar, type **"Azure Active Directory"** and click it
5. On the overview page, look for **"Tenant ID"** — it looks like:
   ```
   a1b2c3d4-1234-abcd-5678-efgh12345678
   ```
6. Copy this value — you'll use it in your `.env` file:
   ```
   CLIENT_ID=your-client-id-here
   TENANT_ID=a1b2c3d4-1234-abcd-5678-efgh12345678
   ```

---

## Step 2 — The IT Admin Conversation

This is the most important difference. In most corporate environments, **you cannot register an Azure App or grant admin consent yourself** — your IT or Azure administrator must do this, or explicitly approve it.

Here's what to ask your IT admin:

> *"I'd like to register an Azure App Registration in our tenant to allow a local MCP server to access my OneNote notebooks through Microsoft Graph. I need the app to have delegated permissions for Notes.Read, Notes.ReadWrite, and Notes.ReadWrite.All — and I need admin consent granted for those permissions. The app will only run locally on my machine and will not be deployed to any server."*

**What the IT admin needs to do:**
1. Register a new App Registration in your company's Azure tenant
2. Set Supported account types to **"Accounts in this organizational directory only"**
3. Add delegated permissions: `Notes.Read`, `Notes.ReadWrite`, `Notes.ReadWrite.All`
4. Click **"Grant admin consent"** for those permissions
5. Share the **Application (client) ID** with you

> ✅ Emphasize to your IT admin that this server runs **entirely on your local machine**. No data is sent to any external server — all API calls go directly between your machine and Microsoft's cloud. This is an important point for corporate data security reviews.

---

## Step 3 — Authentication Expects MFA

When you run the server for the first time and Claude triggers the browser login, expect your company's standard authentication flow — which likely includes Multi-Factor Authentication (MFA). This is normal.

After the first successful login, the token is cached locally and MFA won't be required again unless the token expires or is revoked by your IT policy.

> ⚠️ If your company uses **Conditional Access Policies** (restrictions on which apps or devices can access Microsoft 365), the IT admin may need to add an exemption for this app registration. If authentication fails after the browser login, this is the likely cause — flag it to your IT admin.

---

## Step 4 — Everything Else Is the Same

Once the App Registration is in place and your `.env` file has the correct `CLIENT_ID` and your company's `TENANT_ID`, the rest of the setup is identical to the main guide:

- Python installation → same
- Virtual environment → same
- Claude Desktop configuration → same
- All prompts and usage → same

Follow the main guide from **Step 3 onward**, substituting your corporate `TENANT_ID` wherever `common` is shown.

---

## Quick Reference: Corporate vs. Personal `.env` File

**Personal account:**
```
CLIENT_ID=your-client-id
TENANT_ID=common
```

**Corporate account:**
```
CLIENT_ID=your-client-id
TENANT_ID=your-company-tenant-id
```

---

## Summary Checklist for Corporate Setup

- [ ] Obtained company Tenant ID from Azure Portal
- [ ] IT admin has registered the App Registration in the company tenant
- [ ] IT admin has granted admin consent for Notes permissions
- [ ] Received the Application (client) ID from IT admin
- [ ] Updated `.env` file with correct `CLIENT_ID` and company `TENANT_ID`
- [ ] Completed the rest of setup per the main guide
- [ ] Authenticated successfully (including MFA if required)
- [ ] Tested with `List my OneNote notebooks` in Claude

---

*Part of the OneNote MCP Server project by [Sujit G](https://sujitg.com). Main guide and full documentation at [github.com/jisujit/onenote-mcp-server](https://github.com/jisujit/onenote-mcp-server).*
