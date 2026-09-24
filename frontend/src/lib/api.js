/**
 * AUREXA Client Service (Frontend Standalone)
 * Pure client-side service handling invitation verification, VIP requests, and inquiries.
 */

import { LOTS } from "../data/content.js";

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Known VIP Passes
const VIP_TIER_MAP = {
  "AUREXA": { tier: "Patron", holder: "Distinguished Guest" },
  "AUREXA2026": { tier: "Curator's Circle", holder: "Distinguished Guest" },
  "VIP-PALAZZO": { tier: "Honorary Patron", holder: "Palazzo Guest" },
  "CONNOISSEUR": { tier: "Grand Connoisseur", holder: "Private Collector" },
  "AUREXA-II-0000": { tier: "Founding Patron", holder: "House Benefactor" },
};

export const api = {
  /**
   * Submit an invitation request to the house (Client-side persisted)
   */
  async submitInvitationRequest(payload) {
    await delay(400);

    if (!payload.name || !payload.email) {
      throw new Error("Name and email are required to request an invitation.");
    }

    const newRequest = {
      id: "req_" + Date.now(),
      ...payload,
      status: "received",
      submittedAt: new Date().toISOString(),
    };

    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const existing = JSON.parse(localStorage.getItem("aurexa_invitation_requests") || "[]");
        existing.unshift(newRequest);
        localStorage.setItem("aurexa_invitation_requests", JSON.stringify(existing.slice(0, 50)));
      }
    } catch {
      // Ignore storage errors in restricted environments
    }

    return {
      success: true,
      message: "Invitation request received by the house. We will respond within seven days.",
      data: newRequest,
    };
  },

  /**
   * Verify an invitation code for private gallery admission
   */
  async verifyInvitationCode(code) {
    await delay(350);

    const clean = (code || "").trim().toUpperCase();

    if (!clean || clean.length < 4) {
      return {
        success: false,
        valid: false,
        message: "Invalid or expired invitation code. Please check your invitation card.",
      };
    }

    const matchedTier = VIP_TIER_MAP[clean] || {
      tier: "Patron",
      holder: "Distinguished Guest",
    };

    return {
      success: true,
      valid: true,
      tier: matchedTier.tier,
      holder: matchedTier.holder,
      message: "Welcome to the private rooms of AUREXA II.",
    };
  },

  /**
   * Get Auction Lots catalog
   */
  async getLots() {
    await delay(100);
    return {
      success: true,
      count: LOTS.length,
      data: LOTS,
    };
  },

  /**
   * Submit lot inquiry or absentee bid
   */
  async submitLotInquiry(lotId, inquiryData) {
    await delay(350);
    return {
      success: true,
      message: "Private inquiry lodged with the rostrum specialists.",
      data: {
        lotId,
        ...inquiryData,
        submittedAt: new Date().toISOString(),
      },
    };
  },

  /**
   * System status check
   */
  async getStatus() {
    return {
      status: "online",
      mode: "standalone-frontend",
      version: "2.0.0",
    };
  },
};
