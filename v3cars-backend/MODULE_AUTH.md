## Auth Module (User Authentication & Registration)

Base path: `/v1/auth` (example: `http://localhost:3121/v1/auth`)

### Overview
Handles user registration, login with OTP verification via email, and user management. Uses external email API for OTP delivery.

---

## Registration

**Register User** — `POST /v1/auth/register`
- Creates new user account and sends OTP to email for verification
- **Request Body:**
  ```json
  {
    "username": "string (required)",
    "displayName": "string (required)",
    "mobilenumber": "string (required)",
    "emailAddress": "string (required, valid email)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "userId": 123,
      "username": "testuser",
      "displayName": "Test User",
      "mobilenumber": "1234567890",
      "emailAddress": "test@example.com",
      "status": 1
    }
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "User already exists" // or other validation errors
  }
  ```

---

## Login Flow

### Step 1: Send OTP for Login
**Send OTP** — `POST /v1/auth/send-otp-for-login`
- Sends OTP to user's email for login verification
- **Request Body:**
  ```json
  {
    "emailAddress": "string (required, valid email)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "message": "OTP sent to your email"
    }
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "User not found"
  }
  ```

### Step 2: Verify Login
**Verify OTP & Login** — `POST /v1/auth/verify-login`
- Verifies OTP and returns user data if valid
- **Request Body:**
  ```json
  {
    "emailAddress": "string (required, valid email)",
    "otpvalue": "string (required, 6-digit OTP)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "userId": 123,
      "username": "testuser",
      "displayName": "Test User",
      "mobilenumber": "1234567890",
      "emailAddress": "test@example.com",
      "status": 1
    }
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "User not found" // or "Invalid OTP"
  }
  ```

---

## Data Structures

### User Response
```json
{
  "userId": "number",
  "username": "string | null",
  "displayName": "string | null",
  "mobilenumber": "string | null",
  "emailAddress": "string | null",
  "status": "number"
}
```

---

## Implementation Notes

- **OTP Generation:** 6-digit random number
- **OTP Storage:** Stored in `tblusers.otpvalue` field
- **Email Service:** Uses external API at `http://emailapi.phoenixads.net/json/send-email.php`
- **Email Template:** Simple OTP notification with subject "OTP for V3Cars Login/Register"
- **Validation:** Uses Zod schemas for request validation
- **Database:** Uses Prisma ORM with MySQL
- **Error Handling:** Returns structured JSON responses with success/error status

---

## Testing Examples

### Register New User
```bash
curl -X POST http://localhost:3121/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "displayName": "Test User",
    "mobilenumber": "1234567890",
    "emailAddress": "test@example.com"
  }'
```



### Send Login OTP
```bash
curl -X POST http://localhost:3121/v1/auth/send-otp-for-login \
  -H "Content-Type: application/json" \
  -d '{
    "emailAddress": "test@example.com"
  }'
```


### Verify Login
```bash
curl -X POST http://localhost:3121/v1/auth/verify-login \
  -H "Content-Type: application/json" \
  -d '{
    "emailAddress": "test@example.com",
    "otpvalue": "123456"
  }'
```

