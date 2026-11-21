/**
 * src/services/inquirySubmission.js
 * Cloud Firestore Submission Service for Opsynera Strategic Intelligence
 *
 * Saves client inquiries to the 'inquiries' collection in Cloud Firestore.
 * Conforms strictly to firestore.rules (isValidInquiry validator):
 *  - Strips UI-only flags (e.g. privacyAck)
 *  - Attaches status = 'New'
 *  - Attaches submittedAt = serverTimestamp()
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function submitInquiry(formData) {
  try {
    // Destructure to remove UI-only flags before writing to Firestore
    const { privacyAck, ...inquiryData } = formData;

    // Sanitize and trim all permitted fields
    const payload = {
      fullName: inquiryData.fullName?.trim() || '',
      company: inquiryData.company?.trim() || '',
      email: inquiryData.email?.trim() || '',
      phone: inquiryData.phone?.trim() || '',
      industry: inquiryData.industry?.trim() || '',
      service: inquiryData.service?.trim() || '',
      description: inquiryData.description?.trim() || '',
      contactMethod: inquiryData.contactMethod?.trim() || '',
      status: 'New',
      submittedAt: serverTimestamp(),
    };

    // Client-side quick check on critical constraints
    if (!payload.fullName || !payload.company || !payload.email || !payload.phone || !payload.description) {
      throw new Error('Please ensure all required fields are filled.');
    }

    // Write document to 'inquiries' collection in Firestore
    const docRef = await addDoc(collection(db, 'inquiries'), payload);

    return {
      success: true,
      demo: false,
      id: docRef.id,
      message: 'Thank you for contacting Opsynera. Your inquiry has been securely received. Our strategic advisory desk will review your requirements and reach out via your preferred communication method.',
    };
  } catch (error) {
    console.error('Error submitting inquiry to Firestore:', error);
    return {
      success: false,
      demo: false,
      error: error.message,
      message: error.message || 'There was an issue submitting your inquiry. Please try again or contact us directly.',
    };
  }
}
