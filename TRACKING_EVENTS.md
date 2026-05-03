# Tracking Events Architecture

This document contains a comprehensive list of the tracking events implemented across the application for Google Analytics (GA4) and Meta Pixel, including custom server-side Conversions API (CAPI) events.

## 1. Google Analytics 4 (GA4) Events

Implemented via the `gtag()` function on the frontend.

* **`cta_click`**
  * **Description:** Fired when a user clicks on a compelling Call to Action (CTA) button, specifically for registrations.
  * **Type/Trigger:** Frontend interaction event.
  * **File Location:** `context/registration-modal-context.tsx`

* **`generate_lead`**
  * **Description:** Fired upon successful submission of the registration modal/lead generation form.
  * **Type/Trigger:** Frontend conversion event.
  * **File Location:** `components/registration-modal.tsx`

* **`view_item`**
  * **Description:** Fired when a user lands on and views the Cult Strategy workshop page.
  * **Type/Trigger:** Frontend page-view event. 
  * **File Location:** `components/cult-strategy/workshop-page-tracker.tsx`

* **`initiate_checkout`**
  * **Description:** Fired when a user clicks on one of the checkout CTAs on the workshop landing pages, indicating intent to buy.
  * **Type/Trigger:** Frontend intent event.
  * **File Locations:** 
    * `components/neuromarketing-workshop/hero-section.tsx`
    * `components/neuromarketing-workshop/cta-mid-section.tsx`
    * `components/neuromarketing-workshop/closing-cta-section.tsx`
    * `components/neuromarketing-workshop/mobile-floating-cta.tsx`

* **`purchase`**
  * **Description:** Fired on the thank-you page after a user successfully completes a workshop purchase.
  * **Type/Trigger:** Frontend conversion event.
  * **File Locations:** 
    * `app/workshop/thank-you/page.tsx`
    * `app/neuromarketing-workshop/thank-you/page.tsx`

---

## 2. Meta Pixel & Conversions API (CAPI) Events

Implemented via the frontend `fbq()` function, with corresponding server-side events sent concurrently via the `/api/meta-capi` endpoint for robust tracking resilience (preventing ad-blocker data loss).

* **`ViewContent`**
  * **Description:** Fired when the user lands on the primary workshop landing page. 
  * **Parameters Built-In:** `content_category` ("Workshop"), `content_name`, `currency` (INR), `value`.
  * **Implementation:** Both Frontend Pixel (`fbq`) **AND** Server-side CAPI (`/api/meta-capi`).
  * **File Location:** `components/cult-strategy/workshop-page-tracker.tsx`

* **`InitiateCheckout`**
  * **Description:** Fired when the user opens the workshop checkout form. Contains standard event IDs for CAPI deduplication.
  * **Parameters Built-In:** `content_category` ("Workshop"), `content_name`, `currency` (INR), `value`.
  * **Implementation:** Both Frontend Pixel (`fbq`) **AND** Server-side CAPI (`/api/meta-capi`).
  * **File Location:** `context/workshop-checkout-context.tsx`

* **`Lead`**
  * **Description:** Fired when a user successfully submits their initial details (Name, Email, etc.) in the workshop checkout form, but before processing the payment.
  * **Parameters Built-In:** `content_category` ("Workshop"), `content_name`, `currency` (INR), `value`.
  * **Implementation:** Both Frontend Pixel (`fbq`) **AND** Server-side CAPI (`/api/meta-capi`).
  * **File Location:** `context/workshop-checkout-context.tsx`

* **`Purchase`**
  * **Description:** Fired upon successful workshop purchase redirection to the thank-you page. 
  * **Parameters Built-In:** `currency`, `value`, `content_name`. Event IDs are synced using `paymentReferenceId` to deduplicate against server events.
  * **Implementation:** Both Frontend Pixel (`fbq`) **AND** Server-side CAPI (`/api/meta-capi`).
  * **File Locations:** 
    * `app/workshop/thank-you/page.tsx`
    * `app/neuromarketing-workshop/thank-you/page.tsx`

---

## 3. Webhooks & Internal Pre-Purchase Tracking

These events use the internal `trackWorkshopEvent()` wrapper to handle granular telemetry of the state of the checkout flow, usually sent to an internal database, and Webhooks for order confirmation triggers.

* **`workshop_page_view`**: Fired when the workshop page is viewed (`components/cult-strategy/workshop-page-tracker.tsx`).
* **`workshop_initiate_checkout`**: Fired concurrently with the checkout modal opening. It specifically tracks *which* CTA the user clicked (`context/workshop-checkout-context.tsx`).
* **`workshop_checkout_started`**: Fired when a lead object is securely created in the database and the actual payment gateway initializes.
* **`workshop_payment_dismissed`**: Fired if the user manually closes or backs out of the payment gateway interface (abandoned cart).
* **`workshop_thank_you_view`**: Fired when the thank you page renders properly.
* **Order Confirmation Webhook**: An automated POST request is made to handle the actual event scheduling logic (Slack alerts, Email mapping, etc.).
  * **Locations:**
    * `fetch("/api/workshop-confirmation")` in `app/workshop/thank-you/page.tsx`
    * `fetch("https://n8n.alcovia.life/webhook/workshop-confirmation")` in `app/neuromarketing-workshop/thank-you/page.tsx`
