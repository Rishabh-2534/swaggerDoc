# Authentication: Auth Code and Access Token

This guide describes how to obtain an **authorization code** and **access token** for Simpplr APIs (User API and B2B API).

---

## B2B API: Client credentials (access token only)

The B2B API uses **OAuth 2.0 client credentials** flow. There is no authorization code; you exchange `client_id` and `client_secret` directly for an access token.

### Step 1: Obtain client credentials

- **Client ID** and **Client Secret** are provided when you register your application (e.g. via partner onboarding or admin).
- Keep the secret secure and never expose it in front-end code or public repos.

### Step 2: Request an access token

Send a `POST` request to the token endpoint:

**Endpoint:** `POST /v1/identity/oauth/token`  
**Base URL (dev):** `https://platform.dev.simpplr.xyz`  
**Content-Type:** `application/x-www-form-urlencoded`

**Body (form):**

| Parameter       | Value                | Required |
|----------------|----------------------|----------|
| `grant_type`   | `client_credentials` | Yes      |
| `client_id`    | Your client ID       | Yes      |
| `client_secret`| Your client secret   | Yes      |

**Example (curl):**

```bash
curl -X POST 'https://platform.dev.simpplr.xyz/v1/identity/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET'
```

**Example response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Step 3: Call B2B APIs

Use the access token in the `Authorization` header for all B2B API requests:

```
Authorization: Bearer <access_token>
```

---

## User API: Authorization code flow (auth code + access token)

The User API can use **OAuth 2.0 authorization code** flow when an end-user signs in and your app needs to act on their behalf.

### Step 1: Redirect user to authorize

Send the user to the authorization URL so they can log in and consent. Your app receives an **authorization code** in the callback (query parameter).

**Authorization URL (pattern):**  
`https://platform.{env}.simpplr.xyz/v1/identity/oauth/authorize`

**Query parameters:**

| Parameter         | Description                          | Required |
|------------------|--------------------------------------|----------|
| `response_type` | `code`                               | Yes      |
| `client_id`     | Your application client ID           | Yes      |
| `redirect_uri`  | Callback URL (must be pre-registered)| Yes      |
| `scope`         | Requested scopes (space-separated)   | Optional |
| `state`         | Value to mitigate CSRF               | Recommended |

**Example authorization URL:**

```
https://platform.dev.simpplr.xyz/v1/identity/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://yourapp.com/callback&state=random_state_string
```

After the user signs in and approves, the browser is redirected to your `redirect_uri` with a **code** (and usually **state**):

```
https://yourapp.com/callback?code=AUTH_CODE_HERE&state=random_state_string
```

### Step 2: Exchange authorization code for access token

Use the one-time **authorization code** from the callback to get an access token (and optionally refresh token).

**Endpoint:** `POST /v1/identity/oauth/token`  
**Content-Type:** `application/x-www-form-urlencoded`

**Body (form):**

| Parameter       | Value          | Required |
|----------------|----------------|----------|
| `grant_type`   | `authorization_code` | Yes |
| `code`         | The auth code from the callback | Yes |
| `client_id`    | Your client ID | Yes |
| `client_secret`| Your client secret | Yes |
| `redirect_uri` | Same value used in the authorize step | Yes |

**Example (curl):**

```bash
curl -X POST 'https://platform.dev.simpplr.xyz/v1/identity/oauth/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&code=AUTH_CODE_FROM_CALLBACK&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=https://yourapp.com/callback'
```

**Example response:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Step 3: Call User APIs

Use the access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

### Step 4 (optional): Refresh the access token

When the access token expires, use the refresh token to get a new access token without asking the user to log in again.

**Body (form):**

| Parameter       | Value        | Required |
|----------------|--------------|----------|
| `grant_type`   | `refresh_token` | Yes   |
| `refresh_token`| The refresh token from the token response | Yes |
| `client_id`    | Your client ID | Yes |
| `client_secret`| Your client secret | Yes |

---

## Summary

| API    | Flow                 | Auth code? | How you get access token |
|--------|----------------------|-----------|---------------------------|
| B2B API| Client credentials   | No        | POST token with `client_id` + `client_secret` |
| User API | Authorization code | Yes (from redirect) | 1) Get `code` from callback 2) POST token with `code` + `client_id` + `client_secret` + `redirect_uri` |

Use the **Try it** sections below to call the token endpoints and other APIs once you have credentials.
