/**
 * Inquiry Submission Service
 * Currently operates in DEMO MODE - no data is transmitted or stored.
 */

const DEMO_MODE = true;
const SUBMISSION_ENDPOINT = null;

export async function submitInquiry(formData) {
  if (DEMO_MODE || !SUBMISSION_ENDPOINT) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: false,
      demo: true,
      message: 'Demo Mode: Live submission is not yet connected. This form is functional for testing purposes. No inquiry has been transmitted or stored.',
    };
  }

  try {
    const response = await fetch(SUBMISSION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }),
    });

    if (!response.ok) throw new Error(`Submission failed: ${response.status}`);

    return {
      success: true,
      demo: false,
      message: 'Thank you for contacting Opsynera. Your inquiry has been received. Our team will review your requirements and contact you through your preferred communication method.',
    };
  } catch (error) {
    return {
      success: false,
      demo: false,
      message: 'There was an issue submitting your inquiry. Please try again or contact us directly.',
    };
  }
}
